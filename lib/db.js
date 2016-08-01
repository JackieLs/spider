var mongoose = require('mongoose');
var dbURl = 'mongodb://127.0.0.1:27017/test';

var db = mongoose.createConnection(dbURl);

var companySchema = mongoose.Schema({
		url:String
	});

var companyUrl   = db.model('companyUrl', companySchema);

var companyIndex = db.model('companyIndex', companySchema);


function CompanyUrl(){
}
function CompanyIndex(){
}


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
	companyIndex.find(param, callback);
}
exports.CompanyUrl = new CompanyUrl();
exports.CompanyIndex = new CompanyIndex();

if(!module.parent){
	var a = new CompanyUrl();
	a.find({},function(err, res){
		console.log(err, res);
	})
}