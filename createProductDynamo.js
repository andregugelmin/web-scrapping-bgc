'use strict';
const Dynamo = require('DynamoDB');
const { v4: uuidv4 } = require('uuid');

module.exports.createProductDynamo = async ({ category, products }) => {
	const date = new Date().toLocaleDateString();

	for (let i in products) {
		const data = {
			id: uuidv4(),
			date: date,
			category: category,
			title: products[i].title,
			image: products[i].image,
			productLink: products[i].productLink,
			price: products[i].price,
		};

		await Dynamo.write(data);
	}
};
