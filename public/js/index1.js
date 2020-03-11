import { Carrousell } from './imglist.js';

let myCar = new Carrousell(
     200,
     100
 );
 //alt="" current-image-list
 let imageList = [
     "./../img/photo_1.png",
     "./../img/photo_2.png",
     "./../img/photo_3.png",
     "./../img/photo_4.png",
     "./../img/photo_5.png",
     "./../img/photo_6.png",
     "./../img/photo_7.png",
     "./../img/photo_8.png",
     "./../img/photo_9.png",
     "./../img/photo_10.png",
     "./../img/photo_11.png",
     "./../img/photo_12.png",
     "./../img/photo_13.png"
 ];
 
 
 myCar.addElements(imageList);