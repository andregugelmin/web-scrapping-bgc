'use strict';
const Dynamo = require('DynamoDB');

module.exports.getAllProducts = async (event) => {
	let response = {};
	const headers = {
		'Access-Control-Allow-Headers': 'Content-Type',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET',
	};

	try {
		const products = await Dynamo.scan();

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
