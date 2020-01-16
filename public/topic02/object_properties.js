/*
TOPIC 02 -  Object Properties
*/

//a program can create any number of properties in any object. 
//Create pproperty with the "." operator

let book = {};

book.owner = "Salvatore Giannotta Filho";
book = {"main title": "JavaScript" }; 
book.release = "January 2010";
book.chapter1 = "Javascript Data Types";
book.chapter2 = "Javascript Arrays";
book.chapter3 = "Javascript Objects";
book.chapter4 = "Objects Inheritance";
book.author =  {                             // The value of this property is        
    firstname: "David",               // itself an object.       
    surname: "Flanagan"    
};

console.log("The object: "+ JSON.stringify(book));

var getKeys = function(obj){
    var keys = [];
    for(var key in obj){
       keys.push(key);
    }
    return keys;
 };

 let properties = getKeys(book);
 console.log("The Properties of the object are: " + properties);

console.log("==================================================================");
console.log("Querying and setting keys, or properties");

//Quering: To obtain the value of a property, use the dot (.) or square bracket([]) operators
//(1) using the "." or "[]" operators
let author = book.author;       // Get the "author" property of the book.
let surname = author.surname;      // Get the "surname" property of the author.
let title = book["main title"]; // Get the "main title" property of the book.

console.log("Quering author with \".\" operator: "+ JSON.stringify(author));
console.log("Quering surname with \".\" operator: "+ surname);
console.log("Quering title with \"[]\" operator: "+ title);


//Whe we acces properties using the [] operator, the keys are strings. So, thet is possible to 
//mount the key name programaticaly 

let chapter = "";

for(let i = 1; i < 5; i++) {    
    chap = book["chapter" + i];
    console.log("Chapter "+ i + " name: " + chap);
}

//  
console.log("==================================================================");
console.log("Errors while Querying and setting keys, or properties");

//(1) Quering property that do not exist is not an error
     //the property evaluates to undefined. 

console.log("Acessing non existent proterty: " + book.editor); //undefined

//(2) Quering an object that do not exist is an error

try{
    let obj = bookt.editor.length;
}catch(error){

    console.log("Trying to acces non existent object error: " + error);
}

try{
let len = book.subtitle.length; // !TypeError: undefined doesn't have length
}catch(error){

    console.log("Trying to acces non existent object error: " + error);
}

//(3) Property access expressions will fail if the left-hand-side of the .is null or undefined. 

// A verbose and explicit technique
/*
let owner = undefined;

try {
    if (car) {    
        if (car.type) {        
            owner = car.type.owner;    
        }
    }

}catch(error){

    // A concise and idiomatic alternative to get surname or null or undefineds
    owner = car && cark.type && car.type.owner;
}
*/

/*
Th e rules:
An attempt to set a property p of an object o fails in these circumstances:
(1) o has an own property p that is read-only: it is not possible toset read-only properties.
(2) o has an inherited property p that is read-only: it is notpossible to hide an inherited 
    read-only property with an own property of the same name.
(3) o does not have an own property p; o does not inherit aproperty p with a setter method, 
    and o’s `extensible` attribute(see [Link to Come]) is false. If p does not already exist 
    on o, and if there is no setter method to call, then p must be addedto o. 
    But if o is not extensible, then no new properties can bedefined on it.
*/

//==================================================
console.log("==================================================================");
console.log("Deleting properties");
//The delete operator (§3.13.3) removes a property from anobject.  Its single operand should be a property accessexpression. 
//Delete does not operate on the value ofthe property but on the property itself:

properties = getKeys(book);
console.log("The Properties before delete: " + properties);

console.log("Deleting book.author and main title");

delete book.author;          // The book object now has no author property.
delete book["main title"];   // Now it doesn't have "main title", either.

properties = getKeys(book);
console.log("The Properties after delete: " + properties);
//====================================================

//==================================================
console.log("==================================================================");
console.log("Testing properties");

let o = { x: 1 };

console.log("Testing if ojbect has an own property x: " + o.hasOwnProperty("x") );       // => true: o has an own property x
console.log("Testing if ojbect has an own property y: " + o.hasOwnProperty("y") );       // => false: o doesn't have a property y
console.log("Testing if ojbect has an own property toString: " + o.hasOwnProperty("toString")); // => false: toString is an inherited property

//The propertyIsEnumerable() refines the hasOwnProperty() test. 
//It returns true only if the named property is an own property and its`enumerable` attribute is true.

o = { x: 1 };
console.log("Testing if ojbect has an own property x: " + o.propertyIsEnumerable("x"));  // => true: o has an own enumerable property x
console.log("Testing if ojbect has an own property toString: " + o.propertyIsEnumerable("toString"));  // => false: not an own property
console.log("Testing if ojbect has an own property toString: " + Object.prototype.propertyIsEnumerable("toString")); // => false: not enumerable

//the in property
//The in operator returns true if the specified property is in the specified object or its prototype chain.

const car = {make: 'Honda', model: 'Accord', year: 1998};

console.log("Check if Car has make property: " + ('make' in car)); // expected output: true


if ('type' in car === false) {
  console.log("car has no type property: " + ('type' in car)); // expected output: false
  car.type = 'Accord';
  console.log("Creating type property for object car");
}

console.log("The type property value after creation: " + car.type);
// expected output: "Accord"

//==================================================
console.log("==================================================================");
console.log("Enumerating properties");
//There are four functions you can use toget an array of property names:
//(1) Object.keys() returns an array of the names of the enumerable ownproperties of an object. It does not include non-enumerableproperties, inherited properties, or properties whose name is a Symbol.
const object1 = {
    a: 'somestring',
    b: 42,
    c: false
  };
  
 console.log("List Properties Using Object.keys: " + (Object.keys(object1)));
  // expected output: Array ["a", "b", "c"]

//(2) Object.getOwnPropertyNames() works like Object.keys() butreturns an array of the names of non-enumerable own properties aswell, as long as their names are strings.
console.log("List Properties Using Object.getOwnPropertyNames: " + Object.getOwnPropertyNames(object1));
// expected output: Array ["a", "b", "c"]

//(3) Object.getOwnPropertySymbols() returns own properties whose namesare Symbols, whether or not they are enumerable.
const object2 = {};
const a = Symbol('a');
const b = Symbol.for('b');

object2[a] = 'localSymbol';
object2[b] = 'globalSymbol';

const objectSymbols = Object.getOwnPropertySymbols(object2);

console.log("Getting Properties Using Object.getOwnPropertySymbols: " + objectSymbols.length);
// expected output: 2

//(4) Reflect.ownKeys() returns all own property names, both enumerable and non-enumerable, and both string and Symbol.
const object3 = {
    property1: 42,
    property2: 13
  };
  
  const array3 = [];
  
  console.log("Getting Properties Using Reflect.ownKeys: " + Reflect.ownKeys(object3));
  // expected output: Array ["property1", "property2"]
  
  

//(2) Proterties getter and setter


