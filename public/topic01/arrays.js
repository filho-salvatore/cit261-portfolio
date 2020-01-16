


//creating Arrays
//(1) Array literals 
// comma-separated list of array elements within squarebrackets.

let empty = [];                 // An array with no elements
let primes = [2, 3, 5, 7, 11];  // An array with 5 numeric elementslet 
let misc = [ 1.1, true, "a", ]; // 3 elements of various types + trailing comma
let base = 1024;
let table = [base, base+1, base+2, base+3];
//Array elements for whichvalues are omitted do not exist, but appear to be undefined if you query them:
let count = [1,,3]; // Elements at indexes 0 and 2. No element at index 1
let undefs = [,,];  // An array with no elements but a length of 2

//(2) Creating with the spread operator (...)
// the ... operator includes elements from one array into other
let a = [1, 2, 3];
let b = [0, ...a, 4];  // b == [0, 1, 2, 3, 4]


//(3) Creating with the Array() constructor
let aa = new Array(); //emty array with no elements
let aaa = new Array(10);  //preallocates the array with 10 elements
let aaaa = new Array(1,2,3,4,5,"this is my array"); // add elements into array with the constructor

console.log("===============================");
console.log("The created arrays are:");
console.log("empty" + empty);
console.log("primes: " + primes);
console.log("misc: "+ misc);
console.log("table: "+ table);
console.log("count: "+ count);
console.log("undefs: "+ undefs);
console.log("a: "+ a);
console.log("b: " + b);
console.log("aa: "+ aa);
console.log("aaa: " + aaa);
console.log("aaaa: " + aaaa);
// (4) Creating with the Array.of
console.log("==================================================================");
console.log("Creating with the Array.of");

let bb = Array.of(10);      // create arrays with a single numeric argument. 10 here is not the size of the array, it is the first element.
console.log("bb: " + bb);

// ES6 (4) Creating with the Array.from
//creates an array is the elements of the passed object
function getFruits() {
    var results = [];
    for (var i = 0; i < arguments.length; i++) {
        results.push(arguments[i]);
    }
    return results;
}

var fruits = getFruits('Apple', 'Banana', 'Orange',"GrapeFruit");
console.log("Array created with Array.of: " + fruits);

//===============================================================
console.log("==================================================================");
console.log("Acessing and adding array elements");
// using the [] operator

let x = ["this is"];     // Start with a one-element array
let value = x[0];      // Read element 0
console.log("element 0 of the array is: " + value);
x[1] = 3.14;           // Write element 1

i = 2;
x[i] = 3;              // Write element 2
x[i + 1] = "my Array";    // Write element 3
x[x[i]] = x[0];        // Read elements 0 and 2, write element 3

console.log("The complete Array now: " + x); //this is,3.14,3,this is

//JavaScript arrays have no notion of an “out of bounds” error. 
//When you try to query a nonexistent property of any object, you don’t get an error,you simply get undefined.
let z = [true, false]; // This array has elements at indexes 0 and 1
console.log("acessing an out of bounds element of the array: "+ z[2]);  // => undefined; no element at this index.
console.log("acessing an out of bounds element of the array: "+ z[-1]); // => undefined; no property with this name.

console.log("==================================================================");
console.log("Adding elements to the end of the array with push()");

fa = [];              // Start with an empty array
      // Add a value at the end.  fa = ["zero"]
fa.push("one", "two"); // Add two more values.  fa = [ "one", "two"]

console.log("Array after pushing element: " + fa);

console.log("==================================================================");
console.log("Adding elements to the beggining of the array with unshift()");

fa.unshift("zero");//fa = ["zero", "one", "two"]
console.log("Array after unshifting  element: " + fa);


console.log("==================================================================");
console.log("Removing elements from the end of the array with pop()");

 //The pop()method is the opposite of push(): it removes the last element of thearray and returns it, reducing the length of an array by 1.

let poped = fa.pop();
console.log("the poped element  element: " + poped);
console.log("Array after poping  element: " + fa);

console.log("==================================================================");
console.log("Removing elements from the beggining of the array with shift()");

poped = fa.shift();
console.log("the shifted element  element: " + poped);
console.log("Array after shifting element: " + fa);
//shift() method removes and returns the first element of thearray, reducing the length by 1 and shifting all elements down to anindex one lower than their current index. 

console.log("==================================================================");
console.log("Deleting elements from the array with delete()");
/*
using delete on an array element does not alter the length property and does not shift 
elements with higher indexes down to fill in the gap that is left by the deleted property
*/
m = [1,2,3];
console.log("The length of the array before deleting: " + m.length);  
delete m[2];   // a now has no element at index 2
2 in m;         // => false: no array index 2 is defined
console.log("The value odf the deleted element: "+ m[2]);
console.log("The length of the array after deleting: " + m.length);       // => 3: delete does not affect array length

console.log("==================================================================");
console.log("Interacting Arrays with for/of");

let textFromYoda = 'When you look at the dark side, careful you must be. For the dark side looks back.';

let letters = [...textFromYoda];
//copying the string
let string = "";
for(let letter of letters) {
       string += letter;
   }
   console.log("The copied string with for/of loop is: " + string);

//using entries()
let everyother = "";
for(let [index, letter] of letters.entries()) {   
    if (index % 2 == 0) everyother += letter;  // letters at even indexes
    }
 console.log("The copied string with even indexes using entried(): " + everyother ); // => 

//using forEach()
//foreach is not a loop. it is an array method;

let uppercase = "";
letters.forEach(letter => {  
    uppercase += letter.toUpperCase();
});
console.log("The array looped with foreach: " +  uppercase);


//using the for loop

let vowels = "";
for(let i = 0; i < letters.length; i++) { // For each index in the array
    let letter = letters[i];              // Get the element at that index
    if (/[aeiou]/.test(letter)) {         // Use a regular expression test
        vowels += letter;                 // If it is a vowel, remember it
    }
}
console.log("The vowels extracted with the for loop: " +  vowels  );// => "eoo"

console.log("==================================================================");
console.log("Associative Arrays");
//has several other names: “hash,” “hashtable,” “dictionary,”
//An object is an unordered collection of properties, each of which has a name and a value.  
//Property names are strings, so we can say that objects map strings to values.
//objects are mutable and aremanipulated by reference rather than by value.
//Creating objects
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

console.log("==================================================================");
console.log("Querying and setting keys, or properties");

//(1) using the "." or "[]" operators
let author = book.author;       // Get the "author" property of the book.
let surname = author.surname;      // Get the "surname" property of the author.
let title = book["main title"]; // Get the "main title" property of the book.
console.log("Quering author with \".\" operator: "+ JSON.stringify(author));
console.log("Quering surname with \".\" operator: "+ surname);
console.log("Quering title with \"[]\" operator: "+ title);

//To interact with Objects see the loops.html page

