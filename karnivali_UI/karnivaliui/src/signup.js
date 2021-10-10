import React, { Component, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axiosInstance from './axios';
import { Container, Alert, Row, Col } from 'react-bootstrap';

export default function SignUp () {


	const history = useHistory();

	const initialFormData = Object.freeze({
		email: '',
		username: '',
		password: '',
	});

	const[formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);

		axiosInstance
			.post(`user/create/`, {
				email: formData.email,
				username: formData.username,
				password: formData.password,
			})
			.then((res) => {
				history.push('/sign-in');
				console.log(res);
				console.log(res.data);
			});
	};

	const guest_signup = (e) => {
		e.preventDefault();

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
		<div className="signup">
			<br /> <br />
			<Container>
				<Row>
					<Col md={{ span: 4, offset: 4 }}>
			<Alert variant='dark'>
            <form>
                <h3>Register</h3>

                <div className="form-group">
                    <label>User name</label>
					<input type="text" className="form-control" placeholder="Enter username" onChange={handleChange} autoComplete="username" name="username" />
                </div>

                <div className="form-group">
                    <label>Email</label>
					<input type="email" className="form-control" placeholder="Enter email" onChange={handleChange} autoComplete="email" name="email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
					<input type="password" className="form-control" placeholder="Enter password" onChange={handleChange} autoComplete="password" name="password" />
                </div>

								<button type="submit" className="btn btn-dark btn-lg btn-block" onClick={handleSubmit}>Register</button>
								<button type="submit" className="btn btn-dark btn-lg btn-block" onClick={guest_signup}>Enter as a guest</button>
                <p className="forgot-password text-right">
                    Already registered <Link to={"/sign-in"}>Sign in</Link>
                </p>
					</form>
				
						</Alert>
						</Col>
					</Row>
			</Container>
				
			</div>
        );
    
}