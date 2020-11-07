var express = require('express');
var router = express.Router();
var controlle = require('../controller/sanpham');

module.exports = router;

router.get('/sanpham', controlle.getAllSanPham);

router.get('/sanpham/add', controlle.getAddSanPham);
router.get("/sanpham/delete/:id",controlle.delete);
router.post('/sanpham/add', function(){
    controlle.createSanPham
});


router.get('/api/sanpham', controlle.ApigetAllSanPham);
router.get("/api/sanpham/delete/:id",controlle.ApiDelete);