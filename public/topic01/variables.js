 //declaring primitive Variables
//string 
console.log("=======================================");
console.log("Creating variables")
var myName = "Salvatore Giannotta Filho";
console.log("Variable created. Value is: " + myName);
console.log("Type of the variable: " + typeof(myName));
//number
let myNumber = 100;
console.log("Variable created. Value is: " + myNumber);
console.log("Type of the variable: " + typeof(myNumber));
//bool
let myBool = true;
console.log("Variable created. Value is: " + myBool);
console.log("Type of the variable: " + typeof(myBool));
//declaring relative Variables

let myObject = {};
let myArray = [];

//You can also declare multiple variables in a single let statement:
let i, sum;
//It is a good programming practice to assign an initial value to yourvariables when you first declare them:
let message = "hello";
let ii = 0, j = 0, k = 0;
// Initializers can use previously declared variables
let xx = 2, yy = xx*xx; 

//If you don’t specify an initial value for a variable with the let statement,the variable is declared, 
//but its value is undefined until your code stores avalue into it.
let myNotAssignedVariable;
console.log("Value of a variable created without initialization: " + myNotAssignedVariable);
console.log("Type of the variable created without initialization: " + typeof(myNotAssignedVariable));

//declaring a constant
const PI = 3.1416;

console.log("=======================================");
console.log("Variable scope")
//Variable Scopes

/*
Although var and let have the same syntax, there are important differences in the way they work:

(1) Variables declared with var do not have block scope. Instead, they are scoped to the body of the containing 
function no matter how deeply nested they are inside that function.
*/
var name = "Richard";
// the blocks in this if statement do not create a local context for the name variable
if (name) {
    name = "Jack"; // this name is the global name variable and it is being changed to "Jack" here
    console.log ("Variable inside the block:" +name); // Jack: still the global variable
}
console.log ("Variable outside the block:"+ name); // Jack: still the global variable

let name2 = "Richard";
// the blocks in this if statement do not create a local context for the name variable
if (name2) {
    let name2 = "Jack"; //declaring a block variable with the same name
    console.log ("Variable inside the block:" +name2); // Jack:the local variable
}
console.log ("Variable outside the block:"+ name2); // Richard: still the global variable
/*

(2) If you use var outside of a function body, it declares a global variable. 
But global variables declared with var differ from globals declared with let in an important way. 
Globals declared with var are implemented as properties of the global object. 
The global object can be referenced as window in client-side JavaScript and as global in Node. 
So if you write var x = 2; outside of a function, it is like you wrote global.x = 2; or window.x = 2;.
(The analogy is not perfect, however: the properties created with global var declarations cannot be deleted with the delete operator.)
*/

var globalVariable = "This is a global Variable";

function getGlobal() {
console.log("Using global.X to get a variable in the global scope: "+ globalVariable);
}

getGlobal();


/*
(3) Unlike variables declared with let, it is legal to declare the same variable multiple times with var. 
And because var variables have function scope instead of block scope, it is actually common to do this kind of redeclaration. 
The variable i is frequently used for integer values, and especially as the index variable of for loops. 
In a function with multiple for loops, it is typical for each one to begin for(var i = 0; .... 
    Because var does not scope these variables to the loop body, each of these loops is (harmlessly) re-declaring and
     re-initializing the same variable.

(4) One of the most unusual features of var declarations is known as “hoisting”. 
When a variable is declared with var, the declaration is lifted up (or “hoisted”) 
to the top of the enclosing function. The initialization of the variable remains where you wrote it, 
but the definition of the variable moves to the top of the function. So variables declared with var can be used, 
without error, anywhere in the enclosing function. If the initialization code has not run yet, then the value of 
the variable may be undefined but you won’t get an error if you use the variable before it is initialized. 
(This can be a source of bugs and is one of the important misfeatures that let corrects: 
if you declare a variable with let but attempt to use it before the let statement runs, you will get an actual error 
instead of just seeing an undefined value.)

*/

function showName () {
    console.log ("First Name: " + name);
    var name = "Ford";
    console.log ("Last Name: " + name);
}
    
showName (); 
    // First Name: undefined
    // Last Name: Ford
    
    // The reason undefined prints first is because the local variable name was hoisted to the top of the function
    // Which means it is this local variable that get calls the first time.
    // This is how the code is actually processed by the JavaScript engine:
    
function showName () {
    var name; // name is hoisted (note that is undefined at this point, since the assignment happens below)
    console.log ("First Name: " + name); // First Name: undefined
    
    name = "Ford"; // name is assigned a value
    
    // now name is Ford
    console.log ("Last Name: " + name); // Last Name: Ford
}

//Undeclared Variables

//In strict mode it is not possible to use undeclared variables.
//We get an error if we try
//Outsideof strict mode, however, if you assign a value to a name that has not been declared with let, const or var, you’ll end up creating a new global variable.


//Destruction asignments
let [x,y] = [1,2];  // Same as let x=1, y=2
[x,y] = [x+1,y+1];  // Same as x = x + 1, y = y+1
[x,y] = [y,x];      // Swap the value of the two variables
console.log("the ncremented and swapped values: " + [x,y]);               // => [3,2]: the incremented and swapped values
