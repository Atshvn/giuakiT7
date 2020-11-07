var AWS = require("aws-sdk");
var _ = require('lodash');
var formidable = require('formidable');
var secret = require('../secret/AWS');

//cai dat dyamodb
let awsConfig = {
    "region": "us-east-1",
    "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
    "accessKeyId": secret.aws.AWSAccessKeyId,
    "secretAccessKey": secret.aws.AWSSecretKey,
};
AWS.config.update(awsConfig);
let docClient = new AWS.DynamoDB.DocumentClient();
//get toan bo san pham
module.exports.getAllSanPham = function (req, res) {
    let params = {
        TableName: "SanPham"
    };
    docClient.scan(params, (err, data) => {
        if (err) {
            res.end(JSON.stringify({ error: 'Lỗi không thể truy xuất dữ liệu' }));
        } else {
            res.render('index', { data: data });
        }
    });
};

// get page them sinh vien
module.exports.getAddSanPham = function (req, res) {
    res.render('add');
}
// them sinh vien
module.exports.createLinhKien = function (req, res, next) {
    const { maSp, tenSp, soLuong } = req.body;
    //const id = (Math.floor(Math.random() * 1000)).toString();
    let params = {
        TableName: 'SanPham',
        Item:
        {
            maSp: maSp,
            tenSp: tenSp,
            soLuong: soLuong,
        }
    };
    docClient.put(params, function (err, data) {
        if (err) {
            res.send({
                success: false,
                message: err
            });
        } else {
            const { Items } = data;
            res.redirect('/sanpham');
        }
    });
};
module.exports.delete = function(req, res, next) {
    var idSP = [];
    idSP = req.params.id.split(",");
    function sleep(millis) {
        return new Promise(resolve => setTimeout(resolve, millis));
      };
    for( var x of idSP){
        var params = {
            TableName: 'SanPham',
            Key: {
                "maSp": x
            }
        };
        docClient.delete(params, function (err, data) {
            if (err) {
                console.log('Batch delete unsuccessful ...');
                res.send("users::delete::error - " + JSON.stringify(err, null, 2));
            } 
        });       
    };
    sleep(3000).then(() => {
        return  res.redirect('/sanpham'); 
    });
    
}

module.exports.ApigetAllSanPham = function (req, res) {
    let params = {
        TableName: "SanPham"
    };
    docClient.scan(params, (err, data) => {
        if (err) {
            res.end(JSON.stringify({ error: 'Lỗi không thể truy xuất dữ liệu' }));
        } else {
            res.send({ data: data });
        }
    });
};
module.exports.ApiDelete = function(req, res, next) {
    var idSP = [];
    idSP = req.params.id.split(",");
    function sleep(millis) {
        return new Promise(resolve => setTimeout(resolve, millis));
      };
    for( var x of idSP){
        var params = {
            TableName: 'SanPham',
            Key: {
                "maSp": x
            }
        };
        docClient.delete(params, function (err, data) {
            if (err) {
                console.log('Batch delete unsuccessful ...');
                res.send("users::delete::error - " + JSON.stringify(err, null, 2));
            }
        });       
    };
    sleep(3000).then(() => { 
        return  res.send(('xoa thanh cong'));
    });
    
}
