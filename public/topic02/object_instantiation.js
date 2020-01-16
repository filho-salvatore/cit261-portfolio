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
document.write("<p>====================================");   
document.write("<br>Using Functional Inheritance");   
document.write("<br>The Bear inherited eat from Animal: " + myEat);
document.write("<br>The Bear inherited sound from Animal: " +mySound);    

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
document.write("<p>====================================");   
document.write("<br>Using Functional Shared Inheritance");   
document.write("<br>The Tiger inherited eat from AnimalShared: " + tigerEat);
document.write("<br>The Tiger inherited sound from AnimalShared: " +tigerSound);  


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
document.write("<p>====================================");   
document.write("<br>Using Prototipal Inheritance");   


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

document.write("<br>The Cat inherited eat from AnimalProt: " + catEat);
document.write("<br>The Cat inherited sound from AnimalProt: " +catSound);  

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
document.write("<p>====================================");   
document.write("<br>Using PseudoClassical Inheritance");   

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
document.write("<br>The Whale inherited eat from AnimalPseudo: " + whaleEat);
document.write("<br>The Whale inherited sound from AnimalPseudo: " + whaleSound);  
