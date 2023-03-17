'use strict';
const puppeteer = require('puppeteer');

module.exports.getProducts = async (event, context, callback) => {
	const browser = await puppeteer.launch({
		headless: false,
	});

	const page = await browser.newPage();
	await page.setViewport({ width: 1920, height: 1080 });
	await page.goto('https://www.amazon.com.br/gp/bestsellers/kitchen');
	const links = await page.$$eval('#zg a img', (images) => {
		return images.map((img) => {
			const link = img.closest('a');
			return link.href;
		});
	});

	console.log(links);

	//await browser.close();
};
