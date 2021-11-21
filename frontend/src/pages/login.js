import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axiosInstance from '../axios';
import { Alert, Button } from 'react-bootstrap';
import { Container } from "../styles/Login.styles";

export default function Login() {

	const history = useHistory();
	const initialFormData_login = Object.freeze({
		username: '',
		password: '',
	});

	const [formData_login, updateFormData_login] = useState(initialFormData_login);

	const handleChange_login = (e) => {
		updateFormData_login({
			...formData_login,
			[e.target.name]: e.target.value.trim(),
		});
		console.log(formData_login);
	};

	const handleSubmit_login = (e) => {
		e.preventDefault();
		console.log(formData_login);

		if (!formData_login.password || formData_login.password.length < 8) {
			alert("Please enter a valid password. Password length should be atleast 8 characters.");
			return;
		}

		if (!formData_login.username) {
			alert("Please enter your username.");
			return;
		}

		axiosInstance
			.post(`token/`, {
				username: formData_login.username,
				password: formData_login.password,
			})
			.then((res) => {
				localStorage.setItem('access_token', res.data.access);
				localStorage.setItem('refresh_token', res.data.refresh);
				axiosInstance.defaults.headers['Authorization'] =
					'JWT ' + localStorage.getItem('access_token');

				history.push({
					pathname: '/welcome',
					state: {
						username: formData_login.username,
						password: formData_login.password,
						isGuest: false
					}
				});
			});
	};

	const guest_login = (e) => {
		e.preventDefault();
		console.log(formData_login);

		history.push({
			pathname: '/welcome',
			state: {
				username: 'guest',
				password: '',
				isGuest: true
			}
		});
	};


	return (
		<Container>
			<Alert variant='light' style={{ width: '600px' }}>
				<form>
					<h3>Log in</h3>

					<div className="form-group">
						<label>User name</label>
						<input type="text" className="form-control" placeholder="User name" onChange={handleChange_login} autoComplete="username" name="username" />
					</div>

					<div className="form-group">
						<label>Password</label>
						<input type="password" className="form-control" placeholder="Enter password" onChange={handleChange_login} autoComplete="password" name="password" />
					</div>

					<div className="form-group">
						<div className="custom-control custom-checkbox">
							<input type="checkbox" className="custom-control-input" id="customCheck1" />
							<label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
						</div>
					</div>

					<Button variant="outline-success" type="submit" onClick={handleSubmit_login}>Sign in</Button>
					<Button variant="outline-success" onClick={guest_login}>Enter as a guest</Button>
					<p className="forgot-password text-right">
						<Link to={"/sign-up"}>Sign up</Link>
					</p>
				</form>
			</Alert>
		</Container>
	);

}