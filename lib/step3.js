'use strict'
const CompanyUrl = require('./db').CompanyUrl;
const CompanyIndex = require('./db').CompanyIndex;

const url     = require('url')
const http    = require('http');
const async   = require('async')
const cheerio = require('cheerio');


