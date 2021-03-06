//loops
//======================================================================================
//While Loops
/*
To execute a while statement, the interpreter first evaluates`expression`. 
If the value of the expression is falsy, then theinterpreter skips over the `statement` 
that serves as the loop bodyand moves on to the next statement in the program. 
If, on the otherhand, the `expression` is truthy, the interpreter executes 
the`statement` and repeats, jumping back to the top of the loop andevaluating 
`expression` again. 
*/

let count = 0;
while(count < 10) {    
   console.log("While loop count: " + count);    
   count++;
   }


//======================================================================================
//do/while, 
let len=10;
count =0;
 do {  
    console.log("do/while loop count: " + count);       
 } while(++count < len);
//======================================================================================
//for, 
/*

Most loops have a counter variableof some kind. 
This variable is initialized before the loop starts andis tested before each iteration of the loop. 
Finally, the countervariable is incremented or otherwise updated at the end of the loopbody, 
just before the variable is tested again.

*/

for(let count = 0; count < 10; count++) {    
   console.log("for loop count: " + count);
}

// for with several variables
let i, j, sum = 0;
for(i = 0, j = 10 ; i < 10 ; i++, j--) {    
   sum += i * j;
}

/*
If you omit the `test` expression, the looprepeats forever, 
and for(;;) is another way of writing an infiniteloop, 
like while(true).
*/
//======================================================================================
//  ES6 Loops
//for/of, 
//The for/of loop works with iterable objects.
//arrays, strings, Sets and Maps are iterable: 
//the loop body runs once for each element of thedata array. 
//Before each execution of the loop body, the next elementof the array 
//is assigned to the element variable. 

let data = [1, 2, 3, 4, 5, 6, 7, 8, 9], sum2 = 0;

for(let element of data) {
       sum2 += element;
}
console.log("For/of loop - The sum is: " + sum2);
//FOR OF WITH objects
//objects are not iterable
//
let o = { x: 1, y: 2, z: 3 };
try {

   for(let element of o) { 
      // Throws TypeError because o is not iterable    
      console.log("For/of with objects element is: " + element);
   }
} catch(error) {

      console.log("The error in the loop is: " + error);
}

/*
If you want to iterate through the properties of an object, 
you canuse the for/in loop (introduced below), or use for/ofwith the Object.keys() method:
*/



let keys = "";
for(let k of Object.keys(o)) {    
   keys += k;
}
console.log("The keys are: " + keys ); // => "xyz"

//you can also iterate through their corresponding values like this:
let values = "";
for(let v of Object.values(o)) {    
   values += v;
}
console.log("The values are: " + values); // => "123"

/*And if you are interested in both the keys and the values of anobject’s properties, 
you can use for/of with Object.entries() and destructuring assignment:
Object.entries() returns an array of arrays, where each inner array represents 
a key/value pair for one property of the object. 
*/

let pairs = "";
for(let [k, v] of Object.entries(o)) {
    pairs += k + v;
}
console.log("The key/values pairs are: " + pairs  ); // => "x1y2z3"

//For of with strings
//strings are iterable character by character

let frequency = {};
for(let letter of "mississippi") {
    if (frequency[letter]) {
        frequency[letter]++;
    } else {
        frequency[letter] = 1;
    }
}
console.log("The frequency of letters in the word are: " + JSON.stringify(frequency));


//======================================================================================
//for/in. 
/*
While a for/of loop requires an iterableobject after the of, a for/in loop works with any object after the in.
To execute a for/in statement, the JavaScript interpreter firstevaluates the `object` expression. 
If it evaluates to null orundefined, the interpreter skips the loop and moves on to the nextstatement.3 
If the expression evaluates to a primitivevalue, that value is converted to its equivalent wrapper object
*/



//======================================================================================
//foreach

//for await

//======================================================================================
//conditionals
//======================================================================================
/*
Conditional statements execute or skip other statements depending onthe value of a specified expression. 
*/
//if 

//else if

//switch
let n = 3;

switch(n) {
case 1:                        // Start here if n === 1
    console.log("Block of code 1 executed");
    break;                     // Stop here
case 2:                        // Start here if n === 2
    console.log("Block of code 2 executed");
    break;                     // Stop here
case 3:                        // Start here if n === 3
    console.log("Block of code 3 executed");
    break;                     // Stop here
default:                       // If all else fails...
    console.log("Block of code 4 executed");
    break;                     // stop here
}

let switchVar = 100;

switch(typeof switchVar) {
    case "number":            // Convert the number to a hexadecimal integer
        console.log("Switch statement evaluated to Number: " + switchVar.toString(16));
    case "string":            // Return the string enclosed in quotes
        console.log("Switch statement evaluated to a String: " + switchVar );
    default:                  // Convert any other type in the usual way
        console.log("Switch statement default to a String: " + String(switchVar));
    }