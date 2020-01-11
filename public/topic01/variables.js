 //declaring primitive Variables
//string 
var myName = "Salvatore Giannotta Filho";
//number
let myNumber = 100;
//bool
let myBool = true;

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

//declaring a constant
const PI = 3.1416;

//Variable Scopes

/*
Although var and let have the same syntax, there are important differences in the way they work:

(1) Variables declared with var do not have block scope. Instead, they are scoped to the body of the containing function no matter how deeply nested they are inside that function.

(2) If you use var outside of a function body, it declares a global variable. But global variables declared with var differ from globals declared with let in an important way. Globals declared with var are implemented as properties of the global object. The global object can be referenced as window in client-side JavaScript and as global in Node. So if you write var x = 2; outside of a function, it is like you wrote global.x = 2; or window.x = 2;. (The analogy is not perfect, however: the properties created with global var declarations cannot be deleted with the delete operator.)

(3) Unlike variables declared with let, it is legal to declare the same variable multiple times with var. And because var variables have function scope instead of block scope, it is actually common to do this kind of redeclaration. The variable i is frequently used for integer values, and especially as the index variable of for loops. In a function with multiple for loops, it is typical for each one to begin for(var i = 0; .... Because var does not scope these variables to the loop body, each of these loops is (harmlessly) re-declaring and re-initializing the same variable.

(4) One of the most unusual features of var declarations is known as “hoisting”. When a variable is declared with var, the declaration is lifted up (or “hoisted”) to the top of the enclosing function. The initialization of the variable remains where you wrote it, but the definition of the variable moves to the top of the function. So variables declared with var can be used, without error, anywhere in the enclosing function. If the initialization code has not run yet, then the value of the variable may be undefined but you won’t get an error if you use the variable before it is initialized. (This can be a source of bugs and is one of the important misfeatures that let corrects: if you declare a variable with let but attempt to use it before the let statement runs, you will get an actual error instead of just seeing an undefined value.)

*/

//Undeclared Variables

//In strict mode it is not possible to use undeclared variables.
//We get an error if we try
//Outsideof strict mode, however, if you assign a value to a name that has not been declared with let, const or var, you’ll end up creating a new global variable.


//Destruction asignments
let [x,y] = [1,2];  // Same as let x=1, y=2
[x,y] = [x+1,y+1];  // Same as x = x + 1, y = y+1
[x,y] = [y,x];      // Swap the value of the two variables
[x,y]               // => [3,2]: the incremented and swapped values
