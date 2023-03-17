'use strict';

const puppeteer = require('puppeteer');

module.exports.getProducts = async (event, context, callback) => {
	const browser = await puppeteer.launch({
		headless: false,
	});
	const page = await browser.newPage();
	await page.setViewport({ width: 1920, height: 1080 });
	await page.goto('https://www.amazon.com.br');
	await page.screenshot({ path: 'amazon.png' });

	await browser.close();
};
