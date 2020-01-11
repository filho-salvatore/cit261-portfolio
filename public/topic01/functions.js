//defining functions with the function keyword

// Compute the distance between Cartesian points (x1,y1) and (x2,y2).
function distance(x1, y1, x2, y2) {   
    let dx = x2 - x1;    
    let dy = y2 - y1;    
    return Math.sqrt(dx*dx + dy*dy);
}

// A recursive function (one that calls itself) that computes factorials
// Recall that x! is the product of x and all positive integers less than it.
function factorial(x) {    
    if (x <= 1) return 1;    
    return x * factorial(x-1);
}
//ES6
//defining functions with the arrows 
let myDistance = (x1, y1, x2, y2)=>{
 let dx = x2 - x1;    
    let dy = y2 - y1;    
    return Math.sqrt(dx*dx + dy*dy);
}

let myFactorial = (x) => {    
    if (x <= 1) return 1;    
    return x * myFactorial(x-1);
}
//defining functions with the Function() constructor,

/*
The Function() constructor expects any number of stringarguments. 
The last argument is the text of the function body; i
*/

let functionbody = 'let dx = x2 - x1;'    
functionbody += 'let dy = y2 - y1;'    
functionbody += 'return Math.sqrt(dx*dx + dy*dy);'

const fdistance = new Function("x1", "y1", "x2", "y2",functionbody);

let factorialBody = 'if (x <= 1) return 1;';
factorialBody += 'return x * myFactorial(x-1);';

const ffactorial = new Function("x",factorialBody);
//Testing the functions to Console

let x1, y1, x2, y2;
x1 = 100;
x2 = 200;
y1 = 80;
y2 = 90;
let distTest1 = distance(x1, y1, x2, y2);
console.log("Function distance called. The distance is: " + distTest1);

let distTest2 = myDistance(x1, y1, x2, y2);
console.log("Arrow Function distance called. The distance is: " + distTest2);

let distTest3 = fdistance(x1, y1, x2, y2);
console.log("Function() Function distance called. The distance is: " + distTest3);

let number = 12;

let facttTest1 = factorial(number);
console.log("Function factotial called. The factotial of " + number +" is: " + facttTest1);

let facttTest2 = myFactorial(number);
console.log("Arrow Function factotial called. The factotial  of " + number +" is: " + facttTest2);

let facttTest3 = ffactorial(number);
console.log("Function() Function factotial called. The factotial  of " + number +" is: " + facttTest3);

//===================================================
// Parameters

/*
When a function is invoked with fewer arguments than declaredparameters,
the additional parameters are set to their default value,which is normally undefined. 
*/
// Append the names of the enumerable properties of object o to the
// array a, and return a.  If a is omitted, create and return a new array.
function getPropertyNames(o, a) {    
    a = a || [];  // If undefined, use a new array    
    for(let property in o) a.push(property);    
    return a;
}

//default parameters
function getPropertyNamesDefault(o, a = []) {    
    //a = a || [];  //not necessary anymore    
    for(let property in o) a.push(property);    
    return a;
}
// more arguments than parameters.
//(1) use Arguments object
//within the body of any function, 
//the identifier arguments refers to the Arguments object for that invocation.

function max(x) {    
    let maxValue = -Infinity;    // Loop through the arguments, looking for, and remembering, the biggest.    
    for(let i = 0; i < arguments.length; i++)        
    if (arguments[i] > maxValue) maxValue = arguments[i];    
    // Return the biggest    
    return maxValue;
}

// more arguments than parameters.
//ES6
//(2) use rest parameters
/*
Rest parameters allow us to write functions that can be invoked with arbitrarily 
more arguments than parameters.
A rest parameter is preceded by three periods and it must be the lastparameter 
in a function declaration.
*/

function max_with_rest(first=-Infinity, ...rest) {    
let maxValue = first; // Start by assuming the first arg is biggest    
// Then loop through the rest of the arguments, looking for bigger    
    for (let n of rest) {        
        if (n > maxValue) {            
            maxValue = n;        
        }    
    }    // Return the biggest   
  return maxValue;
}

//declaring and calling a function in the same statement
(function(x1, y1, x2, y2) {  // mymodule function rewritten as an unnamed expression  
// Module code goes here.
let dx = x2 - x1;    
let dy = y2 - y1;    
let result =  Math.sqrt(dx*dx + dy*dy);
console.log("Testing declaring and calling a function in the same statement. The distance is: " +result)
}(x1, y1, x2, y2));  


//=====================================================
//testing arguments passing
//(1) less arguments than parameters
// getPropertyNames() can be invoked with one or two arguments:
let o = {x:1}, p = {y:2, z:3}; // Two objects for testing
let a = getPropertyNames(o);   // a == ['x']; get o's properties in a new array
console.log("Passing few arguments=> the properties of object are: "+ JSON.stringify(a));
a = getPropertyNames(p, a);        // a == ['x','y','z']; add p's properties to it
console.log("Passing all arguments=> the properties of object are: "+ JSON.stringify(a));

//testing with default parameters
a = getPropertyNamesDefault(o);   // a == ['x']; get o's properties in a new array
console.log("Passing few arguments with default=> the properties of object are: "+ JSON.stringify(a));
a = getPropertyNamesDefault(p, a);        // a == ['x','y','z']; add p's properties to it
console.log("Passing all arguments with default=> the properties of object are: "+ JSON.stringify(a));


//testing rest parameters and arguments

let theMax1 = max(10, 101, 1004, 29, 13, 11000, 94, 995, 46)  // => 11000
let theMax2 = max_with_rest(10, 101, 1004, 29, 13, 11000, 94, 995, 46)  // => 11000
console.log("calling function with Argument object - the max is: "+ theMax1);
console.log("calling function with rest parametes - the max is: "+ theMax2);