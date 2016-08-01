'use strict'
const CompanyJoinUs = require('./db').CompanyJoinUs;
const CompanyIndex  = require('./db').CompanyIndex;

const url     = require('url')
const http    = require('http');
const async   = require('async')
const cheerio = require('cheerio');

const fs = require('fs');


console.log("start...")

var t = 1;
CompanyIndex.find({},function(err, res){
	// console.log(err, res);
	// fs.writeFileSync('./companies.json',JSON.stringify(res));
	async.mapSeries(res,function(item, next){
        var item = item.url;
        console.log(item);
        var urlObj = url.parse(item);
        var option = {
                host:urlObj.host,
                path:urlObj.path,
                headers:{
                    'user-agent':"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36",

                }
            }
        var request = http.request(option,function(reponse){
                var buffer = [];
                reponse.on('data',function(chunk){
                    buffer.push(chunk);
                })
                reponse.on('error',function(e){
                    console.log('reponse Error', e)
                    next();
                })
                reponse.on('end',function(){
                    var data = Buffer.concat(buffer).toString();
                    cheerioTheResult(data, function(res){
                    	console.log('第%s条',t);
                    	t++;
                    	var joinUrl = res;
                    	if(!!joinUrl){
                    		CompanyJoinUs.save({
	                    		index:item,
	                    		advertise:joinUrl
	                    	},function(){
	                    		console.log("save over");
	                            next();
	                    	})
                    	}else{
                    		next();
                    	}
                    })
                });
            });
        request.on('error',function(e){
            request.abort();
            console.log("request Error", e);
            next();
        })
        request.on('timeout',function(e){
        	request.abort();
            console.log("reques Timeout", e);
            next()
        })
        request.end();

    },function(err, res){
        console.log(err)
        console.log('done')
    })
})


function cheerioTheResult(html, callback){
	var  $  = cheerio.load(html);
	var reg = /<a.href=\"(.+?)\".*>加入我们<\/a>/
	var res = $.html().match(reg);
	var url = '';

    if(res){
    	url = res[1];
    }
    console.log(url)

    if(!!url){
    	callback(url)
    }else{
    	callback();
    }
}



