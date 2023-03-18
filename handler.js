'use strict';
const puppeteer = require('puppeteer');
const { getChrome } = require('./chrome-script');

module.exports.getProducts = async (event, context, callback) => {
	const { url } = event.queryStringParameters;
	const amazonItens = await getAmazonItens(url);
	return {
		statusCode: 200,
		body: JSON.stringify({ itens: amazonItens }),
	};
};

async function getAmazonItens(url) {
	const chrome = await getChrome();
	const browser = await puppeteer.connect({
		browserWSEndpoint: chrome.endpoint,
	});
	console.log(url);
	const page = await browser.newPage();
	await page.goto(`https://www.amazon.com.br/gp/bestsellers/${url}`, { waitUntil: 'networkidle0' });
	await page.setViewport({ width: 1920, height: 1080 });

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
		} catch (error) {
			console.log(error);
		}
	}

	await browser.close();
	return productsArray;
}
