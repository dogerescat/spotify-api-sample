import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from './template/Login';
import Home from './template/Home';

const Router: React.FC = () => {
	return (
		<>
		<Routes>
			//Homeにはトークンがないとアクセスできない
			<Route path="/" element={<Home/>}/>
			<Route path="/login" element={<Login/>}/>
		</Routes>
		</>
	)
}

export default Router;
