import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/api/';

const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 5000,
	headers: {
		Authorization: localStorage.getItem('access_token')
			? 'JWT ' + localStorage.getItem('access_token')
			: null,
		'Content-Type': 'application/json',
		accept: 'application/json',
	},
});

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		console.log("Start Case");
		console.log(error.response.statusText);
		const originalRequest = error.config;

		if (error.response.status === 401 && error.response.data === 'Exists') {
			console.log("CASE 10");
			alert("User already exists. Please change your username.");
			return Promise.reject(error);
		}

		if (typeof error.response === 'undefined') {
			alert(
				'A server/network error occurred. ' +
				'Looks like CORS might be the problem. ' +
				'Sorry about this - we will get it fixed shortly.'
			);
			return Promise.reject(error);
		}

		if (
			error.response.status === 401 &&
			originalRequest.url === baseURL + 'token/refresh/'
		) {
			console.log("case 1");
			alert("Please sign in again.");
			window.location.href = '/';
			return Promise.reject(error);
		}

		if (
			error.response.data.code === 'token_not_valid' &&
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
			console.log("case 2");
			const refreshToken = localStorage.getItem('refresh_token');

			if (refreshToken) {
				console.log("case 3");
				const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

				// exp date in token is expressed in seconds, while now() returns milliseconds:
				const now = Math.ceil(Date.now() / 1000);
				console.log(tokenParts.exp);

				if (tokenParts.exp > now) {
					console.log("case 4");
					return axiosInstance
						.post('/token/refresh/', { refresh: refreshToken })
						.then((response) => {
							localStorage.setItem('access_token', response.data.access);
							localStorage.setItem('refresh_token', response.data.refresh);

							axiosInstance.defaults.headers['Authorization'] =
								'JWT ' + response.data.access;
							originalRequest.headers['Authorization'] =
								'JWT ' + response.data.access;

							return axiosInstance(originalRequest);
						})
						.catch((err) => {
							console.log("case 5");
							console.log(err);
						});
				} else {
					console.log("case 6");
					console.log('Refresh token is expired', tokenParts.exp, now);
					alert("Session Expired. Please sign in again.");
					window.location.href = '/';
					
				}
			} else {
				console.log("case 7");
				console.log('Refresh token not available.');
				alert("Please sign in again.");
				window.location.href = '/';
			}
		}
		if (
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
			console.log("case 8");
			alert("Wrong username or password. Please sign again.");
			window.location.href = '/';
		}

		// specific error handling done elsewhere
		console.log("case 9");
		return Promise.reject(error);
	}
);

export default axiosInstance;