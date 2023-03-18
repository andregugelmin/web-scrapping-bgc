'use strict';
const puppeteer = require('puppeteer');

module.exports.getProducts = async (event, context, callback) => {
	const amazonItens = await getAmazonItens();
	return {
		statusCode: 200,
		body: JSON.stringify({ itens: amazonItens }),
	};
};

async function getAmazonItens() {
	const browser = await puppeteer.launch({
		headless: false,
	});

	const page = await browser.newPage();
	await page.setViewport({ width: 1920, height: 1080 });
	await page.goto('https://www.amazon.com.br/gp/bestsellers/home/');

	const productsArray = [];
	for (let i = 0; i < 3; i++) {
		const productObj = {};
		try {
			const image = await page.$eval(`#p13n-asin-index-${i} img`, ({ src }) => src);
			const link = await page.$eval(`#p13n-asin-index-${i} a`, ({ href }) => href);
			const title = await page.$eval(
				`#p13n-asin-index-${i} a:nth-child(2) > span > div`,
				({ textContent }) => textContent
			);
			const price = await page.$eval(`#p13n-asin-index-${i} .a-color-price span`, ({ textContent }) => textContent);
			productObj.title = title.trim();
			productObj.image = image.trim();
			productObj.link = link.trim();
			productObj.price = price.trim();
			productsArray.push(productObj);
		} catch (error) {}
	}

	await browser.close();
	return productsArray;
}
