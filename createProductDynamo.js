'use strict';
const AWS = require('aws-sdk');
const DynamoDB = require('aws-sdk/clients/dynamodb');
const DocumentClient = new DynamoDB.DocumentClient({ region: 'sa-east-1' });
const { v4: uuidv4 } = require('uuid');

module.exports.createProductDynamo = async ({ category, products }) => {
	const date = new Date().toLocaleDateString();
	const results = [];
	for (let i in products) {
		try {
			const params = {
				TableName: 'Bestsellers',
				Item: {
					productId: uuidv4(),
					date: date,
					category: category,
					title: products[i].title,
					image: products[i].image,
					productLink: products[i].productLink,
					price: products[i].price,
				},
			};

			const result = await DocumentClient.put(params).promise();
			results.push(result);
		} catch (e) {
			let CreateProductError = new Error(e);
			CreateProductError.name = 'CreateProductError';
			throw CreateProductError;
		}
	}
	return results;
};
