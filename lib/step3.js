'use strict'
const CompanyUrl = require('./db').CompanyUrl;
const CompanyIndex = require('./db').CompanyIndex;

const url     = require('url')
const http    = require('http');
const async   = require('async')
const cheerio = require('cheerio');

const fs = require('fs');


console.log("start...")

CompanyIndex.find({},function(err, res){
	console.log(err, res);
	fs.writeFileSync('./companies.json',JSON.stringify(res));
})