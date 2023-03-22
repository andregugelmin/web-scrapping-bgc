'use strict';
const chromium = require('chrome-aws-lambda');

async function webScrap(category) {
	const browser = await chromium.puppeteer.launch({
		args: chromium.args,
		defaultViewport: chromium.defaultViewport,
		executablePath: await chromium.executablePath,
		headless: chromium.headless,
		ignoreHTTPSErrors: true,
	});

	const page = await browser.newPage();
	await page.goto(`https://www.amazon.com.br/gp/bestsellers/${category}`, { waitUntil: 'networkidle0' });

	const products = [];
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
			productObj.productLink = link.trim();
			productObj.price = price.trim();
			products.push(productObj);
		} catch (error) {
			console.log(error);
		}
	}

	await browser.close();

	return products;
}

module.exports = webScrap;
