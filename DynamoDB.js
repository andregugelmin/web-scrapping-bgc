const AWS = require('aws-sdk');
const DynamoDB = require('aws-sdk/clients/dynamodb');
const DocumentClient = new DynamoDB.DocumentClient({ region: 'sa-east-1' });

const Dynamo = {
	scan: async () => {
		const params = {
			TableName: 'Bestsellers',
		};
		const data = await DocumentClient.scan(params).promise();
		const items = data.Items;
		return items;
	},

	write: async (data) => {
		const params = {
			TableName: 'Bestsellers',
			Item: data,
		};

		try {
			await DocumentClient.put(params).promise();
		} catch (e) {
			let CreateProductError = new Error(e);
			CreateProductError.name = 'CreateProductError';
			throw CreateProductError;
		}
	},

	query: async (category) => {
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

		return item;
	},
};
module.exports = Dynamo;
