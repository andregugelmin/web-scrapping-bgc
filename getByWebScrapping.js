'use strict';
const webScrap = require('webScrap');

module.exports.getByWebScrapping = async (event) => {
	if (!event.pathParameters.category) {
		return {
			statusCode: 500,
			headers: headers,
			body: JSON.stringify({ message: 'missing the category from the path' }),
		};
	}
	const category = event.pathParameters.category;

	let response = {};
	const headers = {
		'Access-Control-Allow-Headers': 'Content-Type',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET',
	};

	try {
		const products = await webScrap(category);

		response = {
			statusCode: 200,
			headers: headers,
			body: JSON.stringify(products),
		};
	} catch (error) {
		response = {
			statusCode: 500,
			headers: headers,
			body: JSON.stringify({ message: error.message }),
		};
	}

	return response;
};
