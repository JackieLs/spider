'use strict'
const fs         = require('fs');
const https         = require('https');
const http         = require('http');
const urlData    = require('./urlData.json');
const Crawler    = require('crawler');
const CompanyUrl = require('./db').CompanyUrl;

var t = 1;
var n = ~~urlData[0].uri.match(/\d+/)[0];

var c = new Crawler({
    callback : function (error, result, $) {
        console.log(error);
        console.log('已爬至第%s页',n);
        n++;
        var liArr = $('ul.list-main-icnset')[1].children;
        var aTagArr= [];

        for(let i=0; i<liArr.length; i++){
        	if(liArr[i]&&liArr[i].children){
        		var iWrap = liArr[i].children;
        		for(let j=0; j<iWrap.length; j++){
        			if(iWrap[j].type == 'tag'&&iWrap[j].attribs.class == 'cell pic'){
        				var m = iWrap[j].children[1]
        				// console.log(m.attribs.href);
                        CompanyUrl.save({
                            url:m.attribs.href
                        },function(){
                            console.log("第%s条记录",t);
                            t++;
                        })
        			}
        		}
        	}
        }
    },
    rateLimits:5000,
});

c.queue(urlData);
console.log("Spider starting....")
