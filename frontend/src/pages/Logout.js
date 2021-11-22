import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { useHistory } from 'react-router-dom';

export default function LogOut() {
	const history = useHistory();

	useEffect(() => {
		console.log(localStorage.getItem('refresh_token'));
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		localStorage.removeItem('username');
		localStorage.removeItem('isGuest');

		axiosInstance.defaults.headers['Authorization'] = null;
		history.push('/');
	});
	return <div>Logout</div>;
}