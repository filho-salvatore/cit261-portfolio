/*
TOPIC 02 - Object Creation


*/

console.log("==================================================================");
console.log("Object Creation");

//Creating objects
//Objects can be created with object literals, with the new keyword, and with the Object.create() function. 
//(1) Using object literal "{}"

let emptyObject = {};                           // An object with no properties
let pointObject = { x: 0, y: 0 };               // Two properties
let p2 = { x: pointObject.x, y: pointObject.y+1 };    // More complex values
let book = {    "main title": "JavaScript",           // Property names include spaces,    
                "sub-title": "The Definitive Guide",  // and hyphens, so use string literals    
                for: "all audiences",                 // for is reserved, but no quotes    
                author: {                             // The value of this property is        
                firstname: "David",               // itself an object.       
                 surname: "Flanagan"    }
};

console.log("The object created by its literal operator {}: " + JSON.stringify(book));

//(2) Creatih with new
let emptyObject2 = new Object();  // Create an empty object: same as {}.
let emptyArray = new Array();   // Create an empty array: same as [].
let emptyDate= new Date();    // Create a Date object representing the current time
let emptyMap = new Map();     // Create a Map object for key/value mapping

//(3) Creating with Object.create()
let object1 = Object.create({x: 1, y: 2});     // object1 inherits properties x and y.
console.log("Object created by the Object.create method. The sum of its properties is:  " + (object1.x + object1.y) ); // => 3

