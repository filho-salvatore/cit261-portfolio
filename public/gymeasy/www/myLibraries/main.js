define(function (require) {
   var $ = require('./salvaQuery')
   var myImgList = require('./imglist'); 
   var myteam = require("./team");
   var mylogger = require("./player");
   alert("Player Name : " + myteam.player);
   mylogger.myfunc();
});