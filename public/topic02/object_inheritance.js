/*
TOPIC 02 Object Inheritance

*/

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
  document.write("<p>====================================");    
  document.write("<br>Using the prototype to create a new property");
  var admin = new User("Peter", "Rasputtim", 50, "blue");
  
  var student = new User("Omar", "Shariff", 70, "green");

  student.address = "Primcipal Stree, 43";

  document.write("<br>Property created for student: " + student.address);
  document.write("<br>Same property is not added to admin: " + admin.address);
  document.write("<br><b>To add property for both we add it using prototype</b>");
  document.write("<br>Property created for admin: " + admin.email);
  document.write("<br>Property created for student: " + student.email);
  document.write("<br>Using the pototype to create a new method");
  document.write("<br>Method created for object admin: " + admin.realName());   
  document.write("<br>Method created for object student: " + student.realName());      
  document.write("<p>====================================");   


  /*
    Every object which is created using literal syntax or constructor syntax with the new keyword, 
    includes __proto__ property that points to prototype object of a function that created this object. 

  */

 var testeObj = new User("John", "Smith", 20, "green");
 document.write("<br>This is the prototype object of the function Constructor: ");
 document.write(JSON.stringify(User.prototype));
 document.write("<br>This is the __proto__ of the object created: ");
 document.write(JSON.stringify(testeObj.__proto__));
 document.write("<br>This is the type of the prototype object: ");
 document.write(typeof User.prototype); 
 document.write("<br>This is the type of __proto__: ");
 document.write(typeof testeObj.__proto__); 
 document.write("<br>Is The Object Prototype the same object pointed by __proto__? => ");
 document.write(User.prototype === testeObj.__proto__ );

 document.write("<p>====================================");   
 document.write("<br>The prototype object of an object is undefined: ");
 document.write(JSON.stringify(testeObj.prototype));
 document.write("<br>to get the prototype of an object we use Object.getPrototypeOf(obj): ");
 var proto = Object.getPrototypeOf(testeObj);  // returns prototype object
 document.write(JSON.stringify(proto));


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
document.write("<p>====================================");   
document.write("<br>Using a method inherited from User Class");   
document.write("<br>The Name of the pupil is: ");        
document.write(std.realName()); // James Bond
document.write("<br>Is the object instance of Pupil? => "); 
document.write(std instanceof Pupil); // true
document.write("<br>Is Pupil instance of User? => "); 
document.write(std instanceof User); // true