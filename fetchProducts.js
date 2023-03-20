'use strict';

module.exports.fetchProducts = async (products) => {
	console.log(products);
	return JSON.stringify({ itens: products });
};
