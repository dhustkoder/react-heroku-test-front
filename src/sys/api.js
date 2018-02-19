import React from "react";

export default class Api {
	static doFetch(method, path, json, callback)
	{
		const url = 'https://shielded-retreat-49907.herokuapp.com/api/' + path;
		var args = {};

		if (method == 'POST') { 
			args = {
				method: method,
				headers: {
				  Accept: 'application/json',
				  'Content-Type': 'application/json',
				},
				body: json,
			}
		} else if (method == 'GET') {
			args = { 
				method: 'GET',
				headers: {
				  Accept: 'application/json',
				  'Content-Type': 'application/json',
				},
			}
		}

		fetch(url, args)
		.then((response) => response.json())
		.then((responseJson) => {
			const data = responseJson.original;
			callback(data);
		})
		.catch((error) => {
			callback(JSON.stringify({error: error}))
		});
	}

	static get(path, callback)
	{
		this.doFetch('GET', path, '', callback);
	}

	static post(path, json, callback)
	{
		this.doFetch('POST', path, json, callback);
	}

};








