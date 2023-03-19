'use strict';
const chromium = require('chrome-aws-lambda');

module.exports.getProducts = async (event) => {
	const { url } = event.queryStringParameters;
	const browser = await chromium.puppeteer.launch({
		args: chromium.args,
		defaultViewport: chromium.defaultViewport,
		executablePath: await chromium.executablePath,
		headless: chromium.headless,
		ignoreHTTPSErrors: true,
	});

	const page = await browser.newPage();
	await page.goto(`https://www.amazon.com.br/gp/bestsellers/${url}`, { waitUntil: 'networkidle0' });

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

	return {
		statusCode: 200,
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Methods': '*',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify({ itens: productsArray }),
	};
};
