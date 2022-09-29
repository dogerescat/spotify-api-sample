import React, { useState, createContext } from 'react';
import Router from './Router';

export const UserTokenContext = createContext({} as {
	token: string;
	setToken: React.Dispatch<React.SetStateAction<string>>;
});

function App() {
	const [token, setToken] = useState('');
  return (
		<UserTokenContext.Provider value={{token, setToken}}>
    <div className="App">
			<Router/>
    </div>
		</UserTokenContext.Provider>
  )
}

export default App
