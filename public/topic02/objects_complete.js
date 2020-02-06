//let sessionConsole;// = 
let sessionConsole =  "";
sessionConsole +='<p>/**';
sessionConsole +='<p> * TOPIC 02 - Working with Javascript Objects';
sessionConsole +='<p> */';

sessionConsole +="<p>==================================================================";
sessionConsole +="<p>Object Creation";

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

sessionConsole +="<p>The object created by its literal operator {}: " + JSON.stringify(book);

//(2) Creatih with new
let emptyObject2 = new Object();  // Create an empty object: same as {}.
let emptyArray = new Array();   // Create an empty array: same as [].
let emptyDate= new Date();    // Create a Date object representing the current time
let emptyMap = new Map();     // Create a Map object for key/value mapping

//(3) Creating with Object.create()
let object1 = Object.create({x: 1, y: 2});     // object1 inherits properties x and y.
sessionConsole +="<p>Object created by the Object.create method. The sum of its properties is:  " + (object1.x + object1.y) ; // => 3

/*
TOPIC 02 Object Inheritance

*/
sessionConsole +='<p>/**';
sessionConsole +='<p> * TOPIC 02 - Working with Object Inheritance';
sessionConsole +='<p> */';

//Basic: All Objects inherit a set of properties from their prototype object

//(1) understand prototypes

//using the prototype property
//Every function includes prototype object by default.
//The prototype object is special type of enumerable object to which additional 
//properties can be attached to it which will be shared across all the instances
// of it's constructor function. 
// (1) Adding new properties to the object constructor

function User(first, last, age, eyecolor) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.eyeColor = eyecolor;
  }
  
  User.prototype.email = "myname@gmail.com";

  //(2) adding new methods to the object constructor

  User.prototype.realName = function() {
    return this.firstName + " " + this.lastName;
  };
  sessionConsole +="<p>====================================";    
  sessionConsole +="<br>Using the prototype to create a new property";
  var admin = new User("Peter", "Rasputtim", 50, "blue");
  
  var student = new User("Omar", "Shariff", 70, "green");

  student.address = "Primcipal Stree, 43";

  sessionConsole +="<br>Property created for student: " + student.address;
  sessionConsole +="<br>Same property is not added to admin: " + admin.address;
  sessionConsole +="<br><b>To add property for both we add it using prototype</b>";
  sessionConsole +="<br>Property created for admin: " + admin.email;
  sessionConsole +="<br>Property created for student: " + student.email;
  sessionConsole +="<br>Using the pototype to create a new method";
  sessionConsole +="<br>Method created for object admin: " + admin.realName();   
  sessionConsole +="<br>Method created for object student: " + student.realName();      
  sessionConsole +="<p>====================================";   


  /*
    Every object which is created using literal syntax or constructor syntax with the new keyword, 
    includes __proto__ property that points to prototype object of a function that created this object. 

  */

 var testeObj = new User("John", "Smith", 20, "green");
 sessionConsole +="<br>This is the prototype object of the function Constructor: ";
 sessionConsole +=JSON.stringify(User.prototype);
 sessionConsole +="<br>This is the __proto__ of the object created: ";
 sessionConsole +=JSON.stringify(testeObj.__proto__);
 sessionConsole +="<br>This is the type of the prototype object: ";
 sessionConsole +=typeof User.prototype; 
 sessionConsole +="<br>This is the type of __proto__: ";
 sessionConsole +=typeof testeObj.__proto__; 
 sessionConsole +="<br>Is The Object Prototype the same object pointed by __proto__? => ";
 sessionConsole +=User.prototype === testeObj.__proto__ ;

 sessionConsole +="<p>====================================";   
 sessionConsole +="<br>The prototype object of an object is undefined: ";
 sessionConsole +=JSON.stringify(testeObj.prototype);
 sessionConsole +="<br>to get the prototype of an object we use Object.getPrototypeOf(obj): ";
 var proto = Object.getPrototypeOf(testeObj);  // returns prototype object
 sessionConsole +=JSON.stringify(proto);


 //"Prototypal Inheriatance" or "Behaviour Delegation". 
 //The prototype object is being used by JavaScript engine in two things, 
 //1) to find properties and methods of an object 
 //2) to implement inheritance in JavaScript. 

//create a Pupil object (function) that inherits from User
function Pupil(firstName, lastName, schoolName, grade)
{
    User.call(this, firstName, lastName);

    this.SchoolName = schoolName || "unknown";
    this.Grade = grade || 0;
}

//Pupil.prototype = User.prototype;
Pupil.prototype = new User();
Pupil.prototype.constructor = Pupil;

//create an object Pupil that uses properties and methods of the User 

var std = new Pupil("James","Bond", "XYZ", 10);
sessionConsole +="<p>====================================";   
sessionConsole +="<br>Using a method inherited from User Class";   
sessionConsole +="<br>The Name of the pupil is: ";        
sessionConsole +=std.realName(); // James Bond
sessionConsole +="<br>Is the object instance of Pupil? => "; 
sessionConsole +=std instanceof Pupil; // true
sessionConsole +="<br>Is Pupil instance of User? => "; 
sessionConsole +=std instanceof User; // true

/*
Topic 02 - Object instantiation
https://medium.com/dailyjs/instantiation-patterns-in-javascript-8fdcf69e8f9b
*/

//(1) Functional
//Inside the function:
 //1.1 we create an empty object 
 //1.2 add properties and methods to it. 
 //1.3 We then return this object.
/*
Pros:

    (a) Easy on eyes. This pattern is very straightforward and easy for beginners to learn.
    (b) Easy to understand because all the functions are contained within the object.
    (c) Offers truly private and protected members since they are contained within the closure scope..
    (d) Protects against common javascript pitfalls, specifically if you forget to specify "new" keyword during class creation or if you are using "this" keyword inside functions.
 
Cons:

    (a) Requires more memory than Pseudoclassical inheritance pattern. 
        Since all the methods are contained within the function, if you create a second instance of that object, you will have duplicated all the properties and methods in memory.
    (b) Types cannot be tested using "instanceof" keyword.
    (c) Javascript minimizers might not perform as good as with Pseudoclassical pattern as there is no way for minimizer to safely rename members of parent class.
    (d) If you create a new object using this method, then change any of the methods and create a new instance, the two objects will be referencing different methods.

*/
 
var Animal = function(species, name){
    var obj = {};

    obj.species = species;
    obj.makeSound = function(sound) {
        return "This animal makes a " + sound + " sound";
    };

    obj.eat = function(food) {
        return "this animal eats: "+ food;
    };


    return obj;
};

var bear = Animal('mammo', 'bear');
var myEat = bear.eat("Anything");
var mySound = bear.makeSound("Roar");
sessionConsole +="<p>====================================";   
sessionConsole +="<br>Using Functional Inheritance";   
sessionConsole +="<br>The Bear inherited eat from Animal: " + myEat;
sessionConsole +="<br>The Bear inherited sound from Animal: " +mySound;    

//(2) Functional-shared
//Every object created by functional shared instantiation will have a pointer to the same methods without duplication. 
//2.1 start with a function with an empty object inside 
//2.2 define properties within the function
//2.3 Methods are defined in another object
//2.4 Extend our object with these methods
//2.5 Return the object.
/*
Pros:
Removes the duplication of methods that was found in functional instantiation which improves memory management.

Cons:
The pointers to the shared methods are created when the object is instantiated. 
If you modify the methods and then create new objects, they original object and 
the new object will refer to different methods.
*/

var objMethods = {
    makeSound: function(sound) {
        return "This animal makes a " + sound + " sound";
    },

    eat:  function(food) {
        return "this animal eats: "+ food;
    }
};



var AnimalShared = function(species, name){
    var obj = {};

    obj.species = species;
    
    extend(obj, objMethods);

    return obj;
};


var extend = function(obj,methods) {

    for (var key in methods){
        obj[key] = methods[key]
    }

};

var tiger = AnimalShared("tiger","tiger");
var tigerEat = tiger.eat("Meat");
var tigerSound = tiger.makeSound("Roar");
sessionConsole +="<p>====================================";   
sessionConsole +="<br>Using Functional Shared Inheritance";   
sessionConsole +="<br>The Tiger inherited eat from AnimalShared: " + tigerEat;
sessionConsole +="<br>The Tiger inherited sound from AnimalShared: " +tigerSound;  


//(3) Prototypal
//utilizes the prototype chain to create objects. 
//3.1 Create all the methods on a separate object. Using the Object.create
//3.2 Define any properties
//3.3 Inside the function you use the Object.create method to attach the methods
//3.4 Return the object
/*
Pros:
Methods are attached to the object’s prototype instead of being returned within the object. 
Every method is available to every object created without duplicating methods in memory.

Cons:
To use this method, you have to create an object, decorate it and then return it from the constructor function.
*/
sessionConsole +="<p>====================================";   
sessionConsole +="<br>Using Prototipal Inheritance";   


var AnimalProt = function(species, name) {
    var obj = Object.create(objMethods);

    obj.species = species;
    obj.name = name;

    return obj;
};



// implementation of prototypal instantiation
var cat = AnimalProt('cat', 'cat');
var catEat = cat.eat("Mouses");
var catSound= cat.makeSound("Meaw");

sessionConsole +="<br>The Cat inherited eat from AnimalProt: " + catEat;
sessionConsole +="<br>The Cat inherited sound from AnimalProt: " +catSound;  

//(4)Pseudoclassical
//uses the prototype chain.
// less typing. Uses the keyword new
/*
Pros:
By utilizing functionality built into JavaScript, Pseudoclassical instantiation 
is the most optimized method of object creation.

Cons:
It is a little more complex in its design when compared to the other three methods.
*/
sessionConsole +="<p>====================================";   
sessionConsole +="<br>Using PseudoClassical Inheritance";   

var AnimalPseudo = function(species, name) {

    this.species = species;
    this.name = name;

};

AnimalPseudo.prototype.makeSound = function(sound) {
    return "This animal makes a " + sound + " sound";
};

AnimalPseudo.prototype.eat = function(food) {
    return "this animal eats: "+ food;
};


// implementation of pseudoclassical instantiation
var whales = new Animal('whales', 'whales');
var whaleEat = whales.eat();
var whaleSound = whales.makeSound();
sessionConsole +="<br>The Whale inherited eat from AnimalPseudo: " + whaleEat;
sessionConsole +="<br>The Whale inherited sound from AnimalPseudo: " + whaleSound;  


/*
TOPIC 02 - Object methods
*/
sessionConsole +='<p>/**';
sessionConsole +='<p> * TOPIC 02 - Working with Object Methods';
sessionConsole +='<p> */';

//Methods are properties of objects that are functions
//Prior to ES6, you would define amethod in object literal 
//using a function definition expression justas you would 
//define any other property of an object:

var person = {
    firstName: "Salvatore",
    lastName : "Giannotta Filho",
    id     : 5566,
    fullName : function() {
      return this.firstName + " " + this.lastName;
    }
  };
  
  // Display data from the object:
sessionConsole +="<p>========================================"; 


sessionConsole +="<br>handling Methods";
sessionConsole +="<p>========================================"; 
sessionConsole +="<br>Using prior ES6 definition of a method\n";
sessionConsole +="<br>Getting object properties without using a method";
sessionConsole +="<br>The name is: ";
sessionConsole +=person.firstName + " " + person.lastName;
sessionConsole +="<br>Getting object property by using a method";
sessionConsole +="<br>The name is: ";
//document.getElementById("demo").innerHTML = person.fullName();
sessionConsole +=person.fullName();
sessionConsole +="<br>========================================"; 
//ES6 sintax:
//allowa shortcut where the function keyword and the colon are omitted

let square = {    area() { return this.side * this.side; },    
                  side: 10
             };

sessionConsole +="<br>Using ES6 definition of a method";       
sessionConsole +="<br>The area of the Square with side= 10 is: ";        
sessionConsole +=square.area() ;
// => 100

const METHOD_NAME = "m";
const symbol = Symbol();

let weirdMethods = {    
    "method With Spaces"(x) { return x + 1; },
    [METHOD_NAME](x) { return x + 2; },    
    [symbol](x) { return x + 3; }
};
let firstway = weirdMethods["method With Spaces"](1);  // => 2
let secondWay = weirdMethods[METHOD_NAME](1);           // => 3
let thirdWay = weirdMethods[symbol](1);               

sessionConsole +="<br>Creating methods with other sintaxes";    
sessionConsole +="<br>Using a method created with spaces  - the result is: " + firstway;   
sessionConsole +="<br>Using a method created with []  - the result is: " + secondWay;  
sessionConsole +="<br>Using a method created with symbols  - the result is: " +thirdWay;  

/*
TOPIC 02 -  Object Properties
*/
sessionConsole +='<p>/**';
sessionConsole +='<p> * TOPIC 02 - Working with Object Properties';
sessionConsole +='<p> */';

//a program can create any number of properties in any object. 
//Create pproperty with the "." operator

let book2 = {};

book2.owner = "Salvatore Giannotta Filho";
book2 = {"main title": "JavaScript" }; 
book2.release = "January 2010";
book2.chapter1 = "Javascript Data Types";
book2.chapter2 = "Javascript Arrays";
book2.chapter3 = "Javascript Objects";
book2.chapter4 = "Objects Inheritance";
book2.author =  {                             // The value of this property is        
    firstname: "David",               // itself an object.       
    surname: "Flanagan"    
};


sessionConsole +="<p>The object: "+ JSON.stringify(book2);
var getKeys = function(obj){
    var keys = [];
    for(var key in obj){
       keys.push(key);
    }
    return keys;
 };

 let properties = getKeys(book);
 sessionConsole +="<p>The Properties of the object are: " + properties;

 sessionConsole +="<p>==================================================================";
 sessionConsole +="<p>Querying and setting keys, or properties";

//Quering: To obtain the value of a property, use the dot (.) or square bracket([]) operators
//(1) using the "." or "[]" operators
let author = book.author;       // Get the "author" property of the book.
let surname = author.surname;      // Get the "surname" property of the author.
let title = book["main title"]; // Get the "main title" property of the book.

sessionConsole +="<p>Quering author with \".\" operator: "+ JSON.stringify(author);
sessionConsole +="<p>Quering surname with \".\" operator: "+ surname;
sessionConsole +="<p>Quering title with \"[]\" operator: "+ title;


//Whe we acces properties using the [] operator, the keys are strings. So, thet is possible to 
//mount the key name programaticaly 

let chapter = "";

for(let i = 1; i < 5; i++) {    
    chap = book["chapter" + i];
    sessionConsole +="<p>Chapter "+ i + " name: " + chap;
}

//  
sessionConsole +="<p>==================================================================";
sessionConsole +="<p>Errors while Querying and setting keys, or properties";

//(1) Quering property that do not exist is not an error
     //the property evaluates to undefined. 

sessionConsole +="<p>Acessing non existent proterty: " + book.editor; //undefined

//(2) Quering an object that do not exist is an error

try{
    let obj = bookt.editor.length;
}catch(error){

    sessionConsole +="<p>Trying to acces non existent object error: " + error;
}

try{
let len = book.subtitle.length; // !TypeError: undefined doesn't have length
}catch(error){

    sessionConsole +="<p>Trying to acces non existent object error: " + error;
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
sessionConsole +="<p>==================================================================";
sessionConsole +="<p>Deleting properties";
//The delete operator (§3.13.3) removes a property from anobject.  Its single operand should be a property accessexpression. 
//Delete does not operate on the value ofthe property but on the property itself:

properties = getKeys(book);
sessionConsole +="<p>The Properties before delete: " + properties;

sessionConsole +="<p>Deleting book.author and main title";

delete book.author;          // The book object now has no author property.
delete book["main title"];   // Now it doesn't have "main title", either.

properties = getKeys(book);
sessionConsole +="<p>The Properties after delete: " + properties;
//====================================================

//==================================================
sessionConsole +="<p>==================================================================";
sessionConsole +="<p>Testing properties";

let o = { x: 1 };

sessionConsole +="<p>Testing if ojbect has an own property x: " + o.hasOwnProperty("x") ;       // => true: o has an own property x
sessionConsole +="<p>Testing if ojbect has an own property y: " + o.hasOwnProperty("y") ;       // => false: o doesn't have a property y
sessionConsole +="<p>Testing if ojbect has an own property toString: " + o.hasOwnProperty("toString"); // => false: toString is an inherited property

//The propertyIsEnumerable() refines the hasOwnProperty() test. 
//It returns true only if the named property is an own property and its`enumerable` attribute is true.

o = { x: 1 };
sessionConsole +="<p>Testing if ojbect has an own property x: " + o.propertyIsEnumerable("x");  // => true: o has an own enumerable property x
sessionConsole +="<p>Testing if ojbect has an own property toString: " + o.propertyIsEnumerable("toString");  // => false: not an own property
sessionConsole +="<p>Testing if ojbect has an own property toString: " + Object.prototype.propertyIsEnumerable("toString"); // => false: not enumerable

//the in property
//The in operator returns true if the specified property is in the specified object or its prototype chain.

const car = {make: 'Honda', model: 'Accord', year: 1998};

sessionConsole +="<p>Check if Car has make property: " + ('make' in car); // expected output: true


if ('type' in car === false) {
  sessionConsole +="<p>car has no type property: " + ('type' in car); // expected output: false
  car.type = 'Accord';
  sessionConsole +="<p>Creating type property for object car";
}

sessionConsole +="<p>The type property value after creation: " + car.type;
// expected output: "Accord"

//==================================================
sessionConsole +="<p>==================================================================";
sessionConsole +="<p>Enumerating properties";
//There are four functions you can use toget an array of property names:
//(1) Object.keys() returns an array of the names of the enumerable ownproperties of an object. It does not include non-enumerableproperties, inherited properties, or properties whose name is a Symbol.
const object_1 = {
    a: 'somestring',
    b: 42,
    c: false
  };
  
 sessionConsole +="<p>List Properties Using Object.keys: " + (Object.keys(object_1));
  // expected output: Array ["a", "b", "c"]

//(2) Object.getOwnPropertyNames() works like Object.keys() butreturns an array of the names of non-enumerable own properties aswell, as long as their names are strings.
sessionConsole +="<p>List Properties Using Object.getOwnPropertyNames: " + Object.getOwnPropertyNames(object_1);
// expected output: Array ["a", "b", "c"]

//(3) Object.getOwnPropertySymbols() returns own properties whose namesare Symbols, whether or not they are enumerable.
const object_2 = {};
const a = Symbol('a');
const b = Symbol.for('b');

object_2[a] = 'localSymbol';
object_2[b] = 'globalSymbol';

const objectSymbols = Object.getOwnPropertySymbols(object_2);

sessionConsole +="<p>Getting Properties Using Object.getOwnPropertySymbols: " + objectSymbols.length;
// expected output: 2

//(4) Reflect.ownKeys() returns all own property names, both enumerable and non-enumerable, and both string and Symbol.
const object_3 = {
    property1: 42,
    property2: 13
  };
  
  const array3 = [];
  
  sessionConsole +="<p>Getting Properties Using Reflect.ownKeys: " + Reflect.ownKeys(object_3);
  // expected output: Array ["property1", "property2"]
  
  

//(2) Proterties getter and setter

function showConsole(){
   
let myConsole = document.getElementById('consoleResult');
myConsole.innerHTML = sessionConsole;

}

function clearConsole(){
   
    let myConsole = document.getElementById('consoleResult');
    myConsole.innerHTML = "";
    
}

function createObject(){
    let myKey1 = document.getElementById('sessionkey').value;
    let myValue1 = document.getElementById('sessionvalue').value;
    let myKey2 = document.getElementById('sessionkey2').value;
    let myValue2 = document.getElementById('sessionvalue2').value;
    let mydiv = document.getElementById('showObject');
    let myObject = {};
    myObject[myKey1] = myValue1;
    myObject[myKey2] = myValue2;
    mydiv.innerHTML = JSON.stringify(myObject);
    sessionStore(myObject);
}

function clearObject(){
    let mydiv = document.getElementById('showObject');
    sessionStorageClear()
    mydiv.innerHTML = "";
}

function isStorageEnabled(){
    if (typeof(Storage) !== "undefined") {
        return true;
      } else {
        return false;
      }

 }

 /**
  * function to store the object in the session storage
  */
 function sessionStore(obj){
    if (isStorageEnabled()) {
        var key = 'obj1';
        var value = JSON.stringify(obj);
        sessionStorage.setItem(key,value);
        
    }else{
        alert("sessionStorage not enabled in this browser");

    }
}
 /**
  * Sessions functios to store and get objects
  * @param {*} key the key to get from session storage
  */

 function sessionGetValueFromStorage(key){
    // Retrieve
    let value = '';
    if (isStorageEnabled()) {
        value = sessionStorage.getItem(key);
    }else{
        alert("sessionStorage not enabled in this browser");
    }
    return value;
    
    }

/**
 * Get Value from the sessionStorage
 */
function sessionGetValue(){
    if (isStorageEnabled()) {
        let key = document.getElementById('sessionkeyget').value;

        let object = JSON.parse(sessionGetValueFromStorage('obj1'));
        
        let myValue = object[key];

        document.getElementById('sessionkeyvalue').value = myValue;
    }else{
        alert("sessionStorage not enabled in this browser");
    }
    
}

/**
 * Clear Local Storage
 */

function sessionStorageClear(){
    if (isStorageEnabled()) {
        sessionStorage.clear();
       
    }else{
        alert("sessionStorage not enabled in this browser");
    }sessionStorage.clear();
 }