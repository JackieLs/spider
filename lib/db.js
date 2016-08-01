var mongoose = require('mongoose');
var dbURl = 'mongodb://127.0.0.1:27017/test';

var db = mongoose.createConnection(dbURl);

var companySchema = mongoose.Schema({
		url:String
	});

var companyJoinUsSchema = mongoose.Schema({
	index:String,
	advertise:String
})


var companyUrl   = db.model('companyUrl', companySchema);

var companyIndex = db.model('companyIndex', companySchema);

var companyJoinUs = db.model('companyJoinUs', companyJoinUsSchema);


function CompanyUrl(){
}
function CompanyIndex(){
}
function CompanyJoinUs(){}

CompanyUrl.prototype.save = function(param, callback){
	var _urlData  = new companyUrl(param);
	_urlData.save(callback);
}
CompanyUrl.prototype.findUnique = function(param, callback){
	companyUrl.find(param).distinct('url').exec(callback);
}
CompanyUrl.prototype.remove = function(param, callback){
	companyUrl.remove(param, callback);
}


CompanyIndex.prototype.save = function(param, callback){
	var _IndexData  = new companyIndex(param);
	_IndexData.save(callback);
}

CompanyIndex.prototype.find = function(param, callback){
	console.log(param);
	companyIndex.find(param, callback);
}
CompanyJoinUs.prototype.save = function(param, callback){
	var _joinUsData  = new companyJoinUs(param);
	_joinUsData.save(callback);
}
exports.CompanyUrl = new CompanyUrl();
exports.CompanyIndex = new CompanyIndex();
exports.CompanyJoinUs = new CompanyJoinUs();

if(!module.parent){
	var a = new CompanyUrl();
	a.find({},function(err, res){
		console.log(err, res);
	})
}