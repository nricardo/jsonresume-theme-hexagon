'use strict';
var fs = require("fs");
var path = require('path');
const moment = require('moment');
const { marked } = require('marked');
var Handlebars = require("handlebars");

const Mapper = require('./mapper.json');

Handlebars.registerHelper("md", (markdown = '') => {
	const html = marked.parse(markdown);
	return new Handlebars.SafeString(html);
});

Handlebars.registerHelper("lowercase", (text = '') => {
	return new Handlebars.SafeString(text.toLowerCase());
});

Handlebars.registerHelper("date", (date = '1970-01-01') => {
	return moment(date).format('MMM YYYY');
});

Handlebars.registerHelper("names", (text = '') => {
	var names = [];
	const [first, last] = text.split(" ");
	names.push(`<span class="firstName">${Handlebars.escapeExpression(first)}</span>`);
	names.push(`<span class="lastName">${Handlebars.escapeExpression(last)}</span>`);
	return new Handlebars.SafeString(names.join(' '));
});

Handlebars.registerHelper('levels', (level, options) => {
	let skills = '';
	for (let i = 1; i <= 5; ++i) skills += options.fn(i <= level ? 'active' : '');
	return skills;
});

Handlebars.registerHelper('skills', (skills, options) => {
	const mapper = {};
	Object.entries(Mapper.skills).forEach(([k, v = []]) => {
		v.forEach(s => { mapper[s] = k; });
	});

	const sks = {};
	skills.forEach(sk => {
		if (mapper[sk.name] === undefined) return;
		const grp = mapper[sk.name];
		let values = sks[grp] || '';
		values += options.fn(sk);
		sks[grp] = values;
	});

	let ret = '';
	Object.entries(sks).forEach(([key, val]) => ret += `<div class="skill-group"><h5>${key}</h5> ${val}</div>`);

	return ret;
});

Handlebars.registerHelper("tiny", (url = '', ...params) => {
	const [options, ...args] = params.reverse();
	const [numPaths = 1] = args;
	const [host, ...paths] = url.replace(/(http|https):\/\//i, '').split('/');
	return new Handlebars.SafeString([host, ...paths.slice(0, numPaths)].join('/'));
});

function render(resume) {
	var css = fs.readFileSync(__dirname + "/style.css", "utf-8");
	var tpl = fs.readFileSync(__dirname + "/resume.hbs", "utf-8");

	return Handlebars.compile(tpl)({ ...resume, _: { styles: css } });
}

module.exports = {
	render: render
};
