
/*
TOPIC 02 - Object methods
*/

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
document.write("<p>========================================"); 

document.write();
document.write("<br>handling Methods");
document.write("<p>========================================"); 
document.write("<br>Using prior ES6 definition of a method\n");
document.write("<br>Getting object properties without using a method");
document.write("<br>The name is: " );
document.write(person.firstName + " " + person.lastName);
document.write("<br>Getting object property by using a method");
document.write("<br>The name is: " );
//document.getElementById("demo").innerHTML = person.fullName();
document.write(person.fullName());
document.write("<br>========================================"); 
//ES6 sintax:
//allowa shortcut where the function keyword and the colon are omitted

let square = {    area() { return this.side * this.side; },    
                  side: 10
             };

document.write("<br>Using ES6 definition of a method");       
document.write("<br>The area of the Square with side= 10 is: ");        
document.write(square.area() );
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

document.write("<br>Creating methods with other sintaxes");    
document.write("<br>Using a method created with spaces  - the result is: " + firstway);   
document.write("<br>Using a method created with []  - the result is: " + secondWay);  
document.write("<br>Using a method created with symbols  - the result is: " +thirdWay);  

