import {Buffer} from 'buffer';
import axios, {AxiosResponse} from 'axios';
export const  authEndpoint = import.meta.env.VITE_AUTHENDPOINT as string;
const redirectUri = import.meta.env.VITE_REDIRECT_URI;
const clientId = import.meta.env.VITE_CLIENT_ID as string;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET as string;
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

export type SpotifyAuthApiResponse = {
    access_token: string,
    token_type: string,
    scope: string,
    expires_in: number,
    refresh_token: string
}

type GetSpotifyAuthApiResponse = () => Promise<AxiosResponse<SpotifyAuthApiResponse> | undefined>;

export const useGetSpotifyAuthApiResponse = (code: string) => {
	const getSpotifyAuthApiResponse: GetSpotifyAuthApiResponse = async () => {
		const params = new URLSearchParams();
  	params.append('code', code);
  	params.append('redirect_uri', redirectUri);	
  	params.append('grant_type', 'authorization_code');
		try {
			const response: AxiosResponse<SpotifyAuthApiResponse> = await axios.post<SpotifyAuthApiResponse>(
				'https://accounts.spotify.com/api/token',
				params,
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`, 'utf-8').toString('base64')}`
					}
				}
			)
			return response;
		} catch(e) {
			console.log(e);
		}
		
	}
	return { getSpotifyAuthApiResponse };
}

export const getCodeAndStateFromUrl = () => {
	const url: string = window.location.search;
	const searchParams = new URLSearchParams(url);
	const code = searchParams.get('code') as string;
	const state = searchParams.get('state');
	return {code, state};
}

const searchParams = new URLSearchParams({
	client_id: clientId,
	response_type: 'code',
	redirect_uri: redirectUri,
	scope: scopes.join(' '),
	state: 'state',
});

export const accessUrl = 'https://accounts.spotify.com/authorize?' + searchParams.toString();
