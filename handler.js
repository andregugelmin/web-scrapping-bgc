'use strict';
const puppeteer = require('puppeteer');

module.exports.getProducts = async (event, context, callback) => {
	const browser = await puppeteer.launch({});

	const page = await browser.newPage();
	await page.setViewport({ width: 1920, height: 1080 });
	await page.goto('https://www.amazon.com.br/gp/bestsellers/kitchen/');

	// const productsHandle = await page.$$('div.a-cardui');
	// const objArray = [];

	// for (const product of productsHandle) {
	// 	const itemObj = {};
	// 	try {
	// 		const title = await page.evaluate(
	// 			(elem) => elem.querySelector('a:nth-child(2) > span > div ').textContent,
	// 			product
	// 		);
	// 		itemObj.title = title;
	// 	} catch (error) {}
	// }
	const allLinks = await page.$$eval('#zg a img', (images) => {
		return images.map((img) => {
			const link = img.closest('a');
			return link.href;
		});
	});

	const links = allLinks.slice(0, 3);
	const productsArray = [];

	for (const link of links) {
		const productObj = { link };
		try {
			await page.goto(link);
			const title = await page.$eval('#ppd h1 span', ({ textContent }) => textContent);
			const price = await page.$eval('#corePrice_feature_div .a-price .a-offscreen', ({ textContent }) => textContent);
			productObj.title = title.trim();
			productObj.price = price.trim();
			productsArray.push(productObj);
			//console.log(title.trim(), price.trim());
		} catch (error) {}
	}
	console.log(productsArray);
	await browser.close();
};
