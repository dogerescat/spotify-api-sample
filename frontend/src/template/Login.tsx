import React from 'react';
import { accessUrl } from '../spotify'

const Login: React.FC = () => {
	return (
		<>
			<a href={accessUrl}>login</a>
		</>
	)
};

export default Login;
