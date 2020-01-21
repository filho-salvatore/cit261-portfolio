/*
TOPIC 03 - JSON

*/

// JSON is about serializing objects.
//Object serialization is the process of converting an object’s state 
//to a string from which it can later be restored. 

//(1) Objects, arrays, strings, finite numbers, true, false, and null are supported and can beserialized and restored. 
document.write("<p>=============================");
document.write("<br>Using stringify to serialize  Objects, arrays, strings, finite numbers, true, false, and null ");  


let obj = {null: null, object: {name: "my object", purpose: "show stringify()"},string: "myString", number: 0, array: [true, false, null], boolean: true};
let s = JSON.stringify(obj); 
document.write("<br>The serialized object is: " + s);  
console.log("The serialized object is: " + s);
document.write("<br>Deserializin the object");
let copy = JSON.parse(s); 
//parsing does not change the object
document.write("<br>The object after parsing is: " + JSON.stringify(copy));    

//(2) NaN, Infinity, and -Infinity areserialized to null. 
//(3) Function, RegExp, and Error objects and the undefined value cannot be serialized or restored.
//(4) JSON.stringify() serializes only the enumerable own properties of an object.
//    If a property value cannot be serialized, that property is simply omitted from the stringified output.

//(5) Both JSON.stringify() and JSON.parse() accept optionalsecond arguments that can be used
//   to customize the serialization and/or restoration process by specifying a list of properties to be serialized.
let human_read = JSON.stringify(obj, null, 5); 
document.write("<br>The result of this code shall be seen in the console - please open it ");

console.log("The json formatted with spaces between values (human read format) is: ");
console.log(human_read); 

//(5.1) Date objects are serialized to ISO-formatteddate strings (see the Date.toJSON() function), 
//   but JSON.parse()leaves these in string form and does not restore the original Dateobject. 

//encoding a date
console.log("=====================================")
console.log("Unencoded a Date: ");

var date = new Date();
console.log(date); 
console.log("Encoded a Date: ");
var json = JSON.stringify(date);
console.log(json);
console.log("The decoded date is not the same as the original")  
var dateStr = JSON.parse(json);  
console.log(dateStr);
console.log("SO dates can be easily converted into JavaScript dates by use of the flexible JavaScript Date constructor.");
var date = new Date(dateStr);
console.log(date); 
console.log("to decode a date previously encoded in large JSON schemas it is necessary to add a function to parse");

var ISO_dates_regex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;

JSON.dateParser = function (key, value) {
    if (typeof value === 'string') {
        var a = ISO_dates_regex.exec(value);
        if (a) return new Date(value);
        
    }
    return value;
};

var date = JSON.parse(json,JSON.dateParser);
console.log("Date parser with helper function");  
console.log(date);
//complex JSON Object

let complex = {   
    "id": "75880024",    
    "name": "Salvatore Giannotta Filho",
    "created_at": "2019-04-01T22:15:00.782Z",
    "updated_at": "2020-01-01T23:10:22.782Z"
};

console.log("Encoded objcte: ");
var json2 = JSON.stringify(complex);
console.log("The decoded object without helper function. See the dates");
var dateStr2 = JSON.parse(json);  
console.log(JSON.stringify(dateStr2));
console.log("Decoded Object with helper function. see the dates parsed correctly");  
var date2 = JSON.parse(json2,JSON.dateParser);
console.log(date2);

