'use strict';
const AWS = require('aws-sdk');
const DynamoDB = require('aws-sdk/clients/dynamodb');
const DocumentClient = new DynamoDB.DocumentClient({ region: 'sa-east-1' });
const Dynamo = require('DynamoDB');

module.exports.getProducts = async (event) => {
	if (!event.pathParameters.category) {
		return {
			statusCode: 500,
			headers: headers,
			body: JSON.stringify({ message: 'missing the category from the path' }),
		};
	}
	const category = event.pathParameters.category;
	console.log(category);
	let response = {};
	const headers = {
		'Access-Control-Allow-Headers': 'Content-Type',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET',
	};

	try {
		const products = await Dynamo.query(category);

		response = {
			statusCode: 200,
			headers: headers,
			body: JSON.stringify(products),
		};
	} catch (error) {
		response = {
			statusCode: 500,
			headers: headers,
			body: JSON.stringify({ message: `${error.message}, ${category}` }),
		};
	}

	return response;
};
