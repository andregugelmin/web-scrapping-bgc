'use strict';
const AWS = require('aws-sdk');
const DynamoDB = require('aws-sdk/clients/dynamodb');
const DocumentClient = new DynamoDB.DocumentClient({ region: 'sa-east-1' });

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
		const params = {
			TableName: 'Bestsellers',
			IndexName: 'category-index',
			KeyConditionExpression: '#DYNOBASE_category = :categoryValue',
			ExpressionAttributeValues: {
				':categoryValue': `${category}`,
			},
			ExpressionAttributeNames: {
				'#DYNOBASE_category': 'category',
			},
			ScanIndexForward: true,
		};
		const data = await DocumentClient.query(params).promise();
		const item = data.Items;

		response = {
			statusCode: 200,
			headers: headers,
			body: JSON.stringify(item),
		};
	} catch (error) {
		response = {
			statusCode: 500,
			headers: headers,
			body: JSON.stringify({ message: `${error.message}, ${category}` }),
		};
	}

	console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
	return response;
};
