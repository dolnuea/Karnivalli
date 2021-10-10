import React, { Component, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axiosInstance from './axios';
import { Container, Alert, Row, Col } from 'react-bootstrap';

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
			
				//console.log(res);
				//console.log(res.data);
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
		<div className="login">
			<br /> <br />
			<Container>
				<Row>
					<Col md={{ span: 4, offset: 4 }}>
						<Alert variant='dark'>
            <form>

                <h3>Log in</h3>

                <div className="form-group">
                    <label>User name</label>
					<input type="text" className="form-control" placeholder="User name" onChange={handleChange_login} autoComplete="username" name="username"/>
                </div>

                <div className="form-group">
                    <label>Password</label>
					<input type="password" className="form-control" placeholder="Enter password" onChange={handleChange_login} autoComplete="password" name="password"/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

				<button type="submit" className="btn btn-dark btn-lg btn-block" onClick={handleSubmit_login}>Sign in</button>
				<button type="submit" className="btn btn-dark btn-lg btn-block" onClick={guest_login}>Enter as a guest</button>
                <p className="forgot-password text-right">
                    <a href="#"> Forgot password?</a> &nbsp; &nbsp;
                    <Link to={"/"}>Sign up</Link>
                </p>
                

							</form>

						</Alert>
					</Col>
				</Row>
			</Container>
		</div>
        );
    
}