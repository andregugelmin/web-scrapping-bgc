'use strict';
const webScrap = require('webScrap');

module.exports.webScraper = async ({ category }) => {
	const products = await webScrap(category);

	return products;
};
