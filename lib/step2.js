'use strict'
const CompanyUrl = require('./db').CompanyUrl;
const CompanyIndex = require('./db').CompanyIndex;

const url     = require('url')
const http    = require('http');
const async   = require('async')
const cheerio = require('cheerio');

console.log("Spider starting....")

//从mongo中找出数据，然后爬取之后把地址存下来

CompanyUrl.findUnique({},function(err, res){
    // console.log(res.length);
    // var test = [];
    // test.push(res[0])
    async.mapSeries(res,function(item, next){
        console.log(item);
        var urlObj = url.parse(item);
        var item = item;
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
                    next(e);
                })
                reponse.on('end',function(){
                    var data = Buffer.concat(buffer).toString();
                    cheerioTheResult(data, function(){
                        setTimeout(function(){
                            CompanyUrl.remove({url:item},function(){
                                console.log("delete over");
                                next();
                            })
                        }, 1000)
                    });
                });
            });
        request.on('error',function(e){
            request.abort();
            console.log("request Error", e);
            next(e);
        })
        request.on('timeout',function(e){
            console.log("reques Timeout", e);
            next(e)
        })
        request.end();

    },function(err, res){
        console.log(err)
        console.log('done')
    })
})

function cheerioTheResult(html, callback){
    var  $ = cheerio.load(html);
    var href = $('div.link-line')[0].children[5].attribs.href;
    if(!!href){
        CompanyIndex.save({url:href}, function(){
            callback()
        })
    }else{
        callback();
    }
    
}



