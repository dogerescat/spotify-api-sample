import React, {useEffect, useContext} from 'react';
import axios from 'axios';
import {UserTokenContext} from '../App';
import { getCodeAndStateFromUrl, useGetSpotifyAuthApiResponse } from '../spotify';

const baseUri = 'https://api.spotify.com/v1';

const Home: React.FC = () => {
	const {token, setToken} = useContext(UserTokenContext);
	
	const sampleEvent = async () => {
		const res = await axios.get(`${baseUri}/users/${import.meta.env.VITE_USER_ID}/playlists`, {
			headers: { 
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
		});	
		console.log(res.data);
		const response = await axios.get(`${baseUri}/playlists/${res.data.items[0].id}`, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			}
		});
		console.log(response.data.tracks.items[0].track.preview_url);
	}
	useEffect(() => {
			const {code, state} = getCodeAndStateFromUrl();
			const {getSpotifyAuthApiResponse} = useGetSpotifyAuthApiResponse(code);

		if(state === null) {
			console.log('state=null'); 
		} else {
			(async () => {
				const res = await getSpotifyAuthApiResponse();
				if(res != undefined) {
					setToken(res.data.access_token);
				}
			})();
		}
	}, []);
	return (
		<>
			<h2>Home</h2>
			<div onClick={sampleEvent}> push </div>
		</>
	)
}

export default Home;
