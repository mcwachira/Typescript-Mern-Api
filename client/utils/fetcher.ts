import React from 'react';
import axios from 'axios';

//generic function
const fetcher = <T>(url: string, headers = {}): Promise<T> =>
	axios
		.get<T>(url, {
			headers,
			withCredentials: true,
		})
		.then((res) => res.data);

export default fetcher;
