/**
 * Database Classes
 */


function generateId() {
	return Math.floor(Math.random() * 1000);
 }


var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;


/**
 * Class to control the data in the storage
 */
class DataControl {

	
	constructor (){
		
	}

	static addUserID(pID){
		this.myUsers.add(pID);
	}
	static addRoutineID(pID){
		this.myRoutines.add(pID);
	}
	static addExerciseID(pID){
		this.myExercises.add(pID);
	}
	static addPersonalRoutineID(pID){
		this.myPersonalRoutines.add(pID);
	}
	static addRoutineExerciseID(pID){
		this.myRoutineExercises.add(pID);
	}
	static addPersonalRoutineExerciseID(pID) {
		this.myPersonalRoutineExercises.add(pID);
	}

	/**
	 * Store this object in the Local Database
	 */
	static store(){
		//todo: create an object before store it
		let localUsers = (DataControl.myUsers ? Array.from(DataControl.myUsers) : null);
		let localExercises = (DataControl.myExercises ? Array.from(DataControl.myExercises) : null);
		let localRoutines = (DataControl.myRoutines ? Array.from(DataControl.myRoutines) : null);
		let localRoutineExercises = (DataControl.myRoutineExercises ? Array.from(DataControl.myRoutineExercises) : null);
		let localPersonalRoutineExercises = (DataControl.myPersonalRoutineExercises ? Array.from(DataControl.myPersonalRoutineExercises) : null);
		let localPersonalRoutines = (DataControl.myPersonalRoutines ? Array.from(DataControl.myPersonalRoutines) : null);

		let myLocalObj = {
			users:  localUsers,
			exercises: localExercises,
			routines: localRoutines,
			personalRoutines: localPersonalRoutines,
			routineExercises: localRoutineExercises,
			personalRoutineExercises: localPersonalRoutineExercises
		};
		myStorage.localStoreObj('dataControl',myLocalObj);
		return this;
	}

	/**
	 * Retrieve this object from the Local Storage
	 * @param {*} pID the id of the Object in the Storage 
	 */
	static retrieve(pID) {
		let localObj =  myStorage.localGetObj(pID);
		/*
		get values from localObj
		*/
		
	}

	/**
	 * Retrieve this object from the local Storage and return it
	 * Does not change this object
	 */
	static retrieveThis() {
		let localObj =  myStorage.localGetObj('dataControl');
		return localObj;
	}

}

DataControl.myUsers = new Set();
DataControl.myRoutines = new Set();
DataControl.myExercises =new Set();
DataControl.myPersonalRoutines =new Set();
DataControl.myRoutineExercises = new Set();
DataControl.myPersonalRoutineExercises = new Set();


class User{

     
     constructor (username,password,firstName,Lastname, pGenID=false) {
		if (pGenID)  { 
			this.myID= generateId(); 
			DataControl.addUserID(this.ID);
		}

		else this.myID = 0;
		this.myUsername = username;
		this.myPassword = password;
		this.myFirstName = firstName;
		this.myLastName = Lastname;
		return this;
	}
	get ID(){
		return this.myID;
	}
	get username(){
		return this.myUsername;
	}
	get password() {
		return this.myPassword;
	}
	get firstName() {
		return this.myFirstName;
	}
	get lastName() {
		return this.myLastName;
	}

	set ID(id) {
		this.ID = id;
		DataControl.addUserID(this.ID);
	}
	set username(val) {
		this.username = val;
	}
	set password(val) {
		this.password = val;
	}
	set firstName(val) {
		this.firstName = val;
	}
	set lastName(val) {
		this.lastName = val;
	}

	/**
	 * Store this object in the Local Database
	 */
	store(){
		myStorage.localStoreObj(this.ID,this);
		return this;
	}

	/**
	 * Retrieve this object from the Local Storage
	 * @param {*} pID the id of the Object in the Storage 
	 */
	retrieve(pID) {
		let localObj =  myStorage.localGetObj(pID);
		this.myID = localObj.myID;
		this.myUsername = localObj.myUsername;
		this.myPassword = localObj.myPassword;
		this.myFirstName = localObj.myFirstName;
		this.myLastName = localObj.myLastName;
		return this;
	}

	/**
	 * Retrieve this object from the local Storage and return it
	 * Does not change this object
	 */
	retrieveThis() {
		let localObj =  myStorage.localGetObj(this.ID);
		return localObj;
	}
}

class Routine  {
	constructor(pName, pDescription, pGenID = false) {
		if (pGenID)  { 
			this.myID= generateId(); 
			DataControl.addRoutineID(this.ID);
		}

		else this.myID = 0;
		this.myRoutineName= pName;
		this.myDescription = pDescription;
		return this;
	}
	get ID(){
		return this.myID;
	}
	get name(){
		return this.myRoutineName;
	}
	get description(){
		return this.myDescription;
	}
	set ID(id) {
		this.ID = id;
		DataControl.addRoutinesID(this.ID);
	}
	set name(val) {
		this.myRoutineName = val;
	}
	set description(val) {
		this.myDescription = val;
	}
	/**
	 * Store this object in the Local Database
	 */
	store(){
		myStorage.localStoreObj(this.ID,this);
		return this;
	}

	/**
	 * Retrieve this object from the Local Storage
	 * @param {*} pID the id of the Object in the Storage 
	 */
	retrieve(pID) {
		let localObj =  myStorage.localGetObj(pID);
		this.myID = localObj.myID;
		this.myRoutineName= localObj.myRoutineName;
		this.myDescription = localObj.myDescription;
		return this;
	}

	/**
	 * Retrieve this object from the local Storage and return it
	 * Does not change this object
	 */
	retrieveThis() {
		let localObj =  myStorage.localGetObj(this.ID);
		return localObj;
	}

}

class Exercise {
	constructor(pName, pDescription,pGenID=false, pReps=10,pSets=3) {
		if (pGenID)  { 
			this.myID= generateId(); 
			DataControl.addExerciseID(this.ID);
		}

		else this.myID = 0;
		this.myExerciseName = pName;
		this.myDescription = pDescription;
		this.myDefaultReps = pReps;
		this.myDefaultSets = pSets;
		return this;
	}
	get ID(){
		return this.myID;
	}
	get name(){
		return this.myExerciseName;
	}
	get description(){
		return this.myDescription;
	}
	get reps(){
		return this.myDefaultReps;
	}
	get sets(){
		return this.myDefaultSets;
	}

	set ID(id) {
		this.ID = id;
		DataControl.addExerciseID(this.ID);
	}
	set name(val) {
		this.myExerciseName = val;
	}
	set description(val) {
		this.myDescription = val;
	}
	set reps(val) {
		this.myDefaultReps = val;
	}
	set sets(val) {
		this.myDefaultSets = val;
	}

	/**
	 * Store this object in the Local Database
	 */
	store(){
		myStorage.localStoreObj(this.ID,this);
		return this;
	}

	/**
	 * Retrieve this object from the Local Storage
	 * @param {*} pID the id of the Object in the Storage 
	 */
	retrieve(pID) {
		let localObj =  myStorage.localGetObj(pID);
		this.myID = localObj.myID;
		this.myExerciseName = localObj.myExerciseName;
		this.myDescription = localObj.myDescription;
		this.myDefaultReps = localObj.myDefaultReps;
		this.myDefaultSets = localObj.myDefaultSets;
		return this;
	}

	/**
	 * Retrieve this object from the local Storage and return it
	 * Does not change this object
	 */
	retrieveThis() {
		let localObj =  myStorage.localGetObj(this.ID);
		return localObj;
	}
}



class PersonalRoutine {

	/**
	 * 
	 * @param {*} pPersonID 
	 * @param {*} pRoutineID 
	 * @param {*} pGenID false, do not generate an ID because it will be retireved from the local storage
	 * @param {*} pRoutDate 
	 * @param {*} pTimeTaken 
	 * @param {*} pCompleted 
	 */
	constructor(pPersonID = 0 , pRoutineID = 0,pGenID = false, pRoutDate =today ,pTimeTaken= 0,pCompleted = false) {
		if (pGenID)  { 
			this.myID= generateId(); 
			DataControl.addPersonalRoutineID(this.ID);
		}

		else this.myID = 0;
		this.myPersonID = pPersonID;
		this.myRoutineID = pRoutineID;
		this.myRoutineDate = pRoutDate;
		this.myTimetaken = pTimeTaken;
		this.myCompleted = pCompleted	;
		return this;
	}
	get ID(){
		return this.myID;
	}
	get personID(){
		return this.myPersonID;
	}
	get routineID(){
		return this.myRoutineID;
	}
	get date(){
		return this.myRoutineDate;
	}
	get time(){
		return this.myTimetaken;
	}
	get completed(){
		return this.myCompleted;
	}
	set ID(id) {
		this.ID = id;
		DataControl.addPersonalRoutineID(this.ID);
	}
	set personID(val) {
		this.mmyPersonID = val;
	}
	set routineID(val) {
		this.myRoutineID = val;
	}
	set date(val) {
		this.myRoutineDate = val;
	}
	set time(val) {
		this.myTimetaken = val;
	}
	set completed(val) {
		this.myCompleted = val;
	}

	/**
	 * Store this object in the Local Database
	 */
	store(){
		myStorage.localStoreObj(this.ID,this);
		return this;
	}
	/**
	 * Retrieve this object from the Local Storage
	 * @param {*} pID the id of the Object in the Storage 
	 */
	retrieve(pID) {
		let localObj =  myStorage.localGetObj(pID);
		this.myID = localObj.myID;
		this.myPersonID = localObj.myPersonID;
		this.myRoutineID = localObj.myRoutineID;
		this.myRoutineDate = localObj.myRoutineDate;
		this.myTimetaken  = localObj.myTimetaken;
		this.myCompleted = localObj.myCompleted;
		return this;

	}
	/**
	 * Retrieve this object from the local Storage and return it
	 * Does not change this object
	 */
	retrieveThis() {
		let localObj =  myStorage.localGetObj(this.ID);
		return localObj;
	}
}

class RoutineExercise {
	constructor(pRoutineID,pExerciseID,pGenID = false, pReps = 10,pSets = 3) {

		if (pGenID)  { 
			this.myID= generateId(); 
			DataControl.addRoutineExerciseID(this.ID);
		}

		else this.myID = 0;
		this.myRoutineID = pRoutineID;
		this.myExerciseID = pExerciseID;
		this.myDefaultReps = pReps;
		this.myDefaultSets = pSets;
		return this;
	}

	get ID(){
		return this.myID;
	}
	get routineID(){
		return this.myRoutineID;
	}
	get exerciseID(){
		return this.myExerciseID;
	}
	get reps(){
		return this.myDefaultReps;
	}
	get sets(){
		return this.myDefaultSets;
	}
	set ID(id) {
		this.ID = id;
		DataControl.addRoutineExerciseID(this.ID);
	}
	set routineID(val) {
		this.myRoutineID = val;
	}
	set exerciseID(val) {
		this.myExerciseID = val;
	}
	set reps(val) {
		this.myDefaultReps = val;
	}
	set sets(val) {
		this.myDefaultSets = val;
	}
	/**
	 * Store this object in the Local Database
	 */
	store(){
		myStorage.localStoreObj(this.ID,this);
		return this;
	}

	/**
	 * Retrieve this object from the Local Storage
	 * @param {*} pID the id of the Object in the Storage 
	 */
	retrieve(pID) {
		let localObj =  myStorage.localGetObj(pID);
		this.myID = localObj.myID;
		this.myRoutineID = localObj.myRoutineID;
		this.myExerciseID = localObj.myExerciseID;
		this.myDefaultReps = localObj.myDefaultReps;
		this.myDefaultSets = localObj.myDefaultSets;
		return this;
	}

	/**
	 * Retrieve this object from the local Storage and return it
	 * Does not change this object
	 */
	retrieveThis() {
		let localObj =  myStorage.localGetObj(this.ID);
		return localObj;
	}
}

class PersonalRoutineExercise {
	constructor(pRoutineID = 0,pExerciseID=0,pGenID = false, pReps = 10,pSets = 3) {
		if (pGenID)  { 
			this.myID= generateId(); 
			DataControl.addPersonalRoutineExerciseID(this.ID);
		}

		else this.myID = 0;
		this.myRoutineID = pRoutineID;
		this.myExerciseID = pExerciseID;
		this.myNumberOfReps = pReps;
		this.myNumberOfSets = pSets;
		return this;
	}

	get ID(){
		return this.myID;
	}
	get routineID(){
		return this.myRoutineID;
	}
	get exerciseID(){
		return this.myExerciseID;
	}
	get reps(){
		return this.myNumberOfReps;
	}
	get sets(){
		return this.myNumberOfSets;
	}
	set ID(id) {
		this.ID = id;
		super.addPersonalRoutineExerciseID(this.ID);
	}
	set routineID(val) {
		this.myRoutineID = val;
	}
	set exerciseID(val) {
		this.myExerciseID = val;
	}
	set reps(val) {
		this.myNumberOfReps = val;
	}
	set sets(val) {
		this.myNumberOfSets = val;
	}

	/**
	 * Store this object in the Local Database
	 */
	store() {
		myStorage.localStoreObj(this.ID,this);
		return this;
	}

	/**
	 * Retrieve this object from the Local Storage
	 * @param {*} pID the id of the Object in the Storage 
	 */
	retrieve(pID) {
		let localObj =  myStorage.localGetObj(pID);
		this.myID = localObj.myID;
		this.myRoutineID = localObj.myRoutineID;
		this.myExerciseID = localObj.myExerciseID;
		this.myNumberOfReps = localObj.myNumberOfReps;
		this.myNumberOfSets = localObj.myNumberOfSets;
		return this;
	}

	/**
	 * Retrieve this object from the local Storage and return it
	 * Does not change this object
	 */
	retrieveThis() {
		let localObj =  myStorage.localGetObj(this.ID);
		return localObj;
	}
}

/**
 * Class to control the local storage system
 */
class myStorage {
	
	constructor() {

	}


	static isStorageEnabled(){
	    if (typeof(Storage) !== 'undefined') {
		   return true;
		 } else {
		   return false;
		 }
	
	 }
	
	
	
	 /**
	  * The localStorage Object
	  * The localStorage object stores the data with no expiration date. 
	  * The data will not be deleted when the browser is closed, and will be available the next day, week, or year.
	  * 
	  * 
	  */
	
	  // Local Store
	
	  /**
	   * Store a key,value pair in the Local Storage
	   * @param {*} pKey the key 
	   * @param {*} pValue the value
	   */
	  static localStorePair(pKey,pValue){
	    if (this.isStorageEnabled()) {
		   localStorage.setItem(pKey,pValue);
		    
	    }else{
		   throw new Error('localStorage not enabled in this browser');
	
	    }
	}

	/**
	 * Get Value from Local Storage
	 * @param {*} key the key
	 */
	static localGetValue(key){
		// Retrieve
		let value = '';
		if (this.isStorageEnabled()) {
		value = localStorage.getItem(key);
		}else{
		throw new Error('localStorage not enabled in this browser');
		}
		return value;
	
	}
	
	/**
	 * Clear Local Storage
	 */
	
	static localStorageClear(){
	    if (this.isStorageEnabled()) {
		   localStorage.clear();
		   
	    }else{
		   throw new Error('localStorage not enabled in this browser');
	    }
	 }

	

	/**
	 * Get Array from the localStorage
	 * @param {*} pKey the key to get
	 */
	static localGetArray(pKey){
	
		if (this.isStorageEnabled()) {

			let value = this.localGetValue(pKey);
			return JSON.parse(value);

	 	}else{
		 	throw new Error('localStorage not enabled in this browser');
	 	}
	  
	}

	static localGetObj(pKey) {
		return this.localGetArray(pKey);
	}

	/**
	  * Store Array in the local Storage
	  * @param {*} pKey the key of the object to store
	  * @param {*} pArray the arrray to store
	  */ 
	 static localStoreArray(pKey, pArray){
		if (this.isStorageEnabled()) {
 
			 let value = JSON.stringify(pArray);
				
		    localStorage.setItem(pKey,value);
		   
		}else{
		    throw new Error('sessionStorage not enabled in this browser');
	 
		}
	 }
 
	 /**
	   * Store an Object in the local Storage
	   * @param {*} pKey the key of the object to store
	   * @param {*} pObj the arrray to store
	   */ 
	  static localStoreObj(pKey, pObj){
		 if (this.isStorageEnabled()) {
  
			  let value = JSON.stringify(pObj);
				 
			localStorage.setItem(pKey,value);
		    
		 }else{
			throw new Error('sessionStorage not enabled in this browser');
	  
		 }
	  }
	
	/**
	 * The sessionStorage Object
	 * The sessionStorage object is equal to the localStorage object, 
	 * except that it stores the data for only one session. 
	 * The data is deleted when the user closes the specific browser tab.
	 */
	
	/**
	  * The sessionStorage Object
	  * The sessionStorage object stores the data with no expiration date. 
	  * The data will not be deleted when the browser is closed, and will be available the next day, week, or year.
	  * 
	  */
	
	  // Store
	
	  /**
	   * Store a key, value pair in the session storage
	   * @param {*} pKey 
	   * @param {*} pValue 
	   */
	  static sessionStorePair(pKey,pValue){
	    if (this.isStorageEnabled()) {
		   sessionStorage.setItem(pKey,pValue);
		   
	    }else{
		   throw new Error('sessionStorage not enabled in this browser');
	
	    }
	}
	
	/**
	 * Get Value from the sessionStorage
	 * @param {*} pKey the key of the value to get
	 */
	static sessionGetValue(key){
	// Retrieve
	let value = '';
	if (this.isStorageEnabled()) {
	    value = sessionStorage.getItem(key);
	}else{
	    throw new Error('sessionStorage not enabled in this browser');
	}
	return value;
	
	}
	
	
	
	/**
	 * Clear Local Storage
	 */
	static sessionStorageClear(){
	    if (this.isStorageEnabled()) {
		   sessionStorage.clear();
		   
	    }else{
		    
		throw new Error('sessionStorage not enabled in this browser');

	    }sessionStorage.clear();
	 }

	
	
	/**
	 * Get Value from the sessionStorage
	 * @param {*} pKey the key of the object to get
	 */
	static sessionGetObject(pKey){
	  if (this.isStorageEnabled()) {
		 
		 let value = this.sessionGetValue(pKey);
		 return JSON.parse(value);
	  }else{
		 throw new Error('sessionStorage not enabled in this browser');
	  }
	  
	}

	/**
	 * Get Array from the Local Storage
	 * @param {*} pKey the key of the array to get
	 */
	static sessionGetArray(pKey) {
		return this.sessionGetObject(pKey);
	}
	

	

	 /**
	  * Store Object in the session Storage
	  * @param {*} pKey the key of the object to store
	  * @param {*} pObj the object to store
	  */ 
	 static sessionStoreObject(pKey, pObj){
	    if (this.isStorageEnabled()) {
		  
		   let value = JSON.stringify(pObj);	 
		   sessionStorage.setItem(pKey,value);

	   	}else{
		   throw new Error('sessionStorage not enabled in this browser');
	    }
	}
	

	 
}


myFunction1 = function test1(){
	throw new Error("Function Test1");
 };
 
 const myArray1 = ['Array of numbers',1,2,3,4,5,6,7,8];
 const myArray2 = ['Array of strings','string 1','string 2', 'string 3'];
 
 myStorage.localStoreArray('arr1', myArray1);
 let theArray = myStorage.localGetArray('arr1');
 
 /**
  * Test Objects to use in the advanced page
  */
 
 let obj1 = {
	objName: "This is the Object number 1",
	function1: "I have One function called myFunction1",
	array1: myArray1
  };
 
  let obj2 = {
	objName: "This is the Object number 2",
	array1: myArray2
  };
 
  const myArray3 = ['Array of objects',obj1,obj2];
 
  let obj3 = {
	objName: "This is the Object number 3",
	array1: myArray3
  };
 
myStorage.sessionStoreObject('obj', obj3);
let theObje = myStorage.sessionGetObject('obj');
 

let myuser = new User('teste','123456','Nome','Sobrenome');

let Nome = myuser.firstName;
let ID = myuser.ID;

let myRout = new PersonalRoutine(139,1,true);

myRout.store();
let myID = myRout.ID;

let myStoredRout = new PersonalRoutine();
myStoredRout.retrieve(myID);

//generate some routines and save the to data store
let a =  new Routine('Shoulder Workout', 'workout to strengthen the sholder muscles', true);
a.store();
let b = new Routine('Leg Workout', 'workout to strengthen the Leg muscles', true).store();
let c = new Routine('Triceps Workout', 'workout to strengthen the Triceps muscles', true).store();
let d = new Routine('Back Workot', 'workout to strengthen the back muscles', true).store();

//generate some exercises and save the to the database
let ex1 = new Exercise('Exercise 1','Test Exercise 1',true, 15,3).store();
let ex2 = new Exercise('Exercise 2','Test Exercise 2',true, 15,3).store();
let ex3 = new Exercise('Exercise 3','Test Exercise 3',true, 15,3).store();
let ex4 = new Exercise('Exercise 4','Test Exercise 4',true, 15,3).store();
let ex5 = new Exercise('Exercise 5','Test Exercise 5',true, 15,3).store();
let ex6 = new Exercise('Exercise 6','Test Exercise 6',true, 15,3).store();

let ex7 = new Exercise('Exercise 7','Test Exercise 7',true, 15,3).store();
let ex8 = new Exercise('Exercise 8','Test Exercise 8',true, 15,3).store();
let ex9 = new Exercise('Exercise 9','Test Exercise 9',true, 15,3).store();


let Rex1a = new RoutineExercise(a.ID,ex1.ID,true,10,3).store();
let Rex1b = new RoutineExercise(a.ID,ex2.ID,true,12,3).store();
let Rex1c = new RoutineExercise(a.ID,ex3.ID,true,14,3).store();

let Rex2a = new RoutineExercise(b.ID,ex4.ID,true,8,3).store();
let Rex2b = new RoutineExercise(b.ID,ex5.ID,true,10,3).store();
let Rex2c = new RoutineExercise(b.ID,ex6.ID,true,12,3).store();

let Rex3a = new RoutineExercise(c.ID,ex7.ID,true,8,3).store();
let Rex3b = new RoutineExercise(c.ID,ex8.ID,true,6,3).store();
let Rex4a = new RoutineExercise(d.ID,ex9.ID,true,10,3).store();
let Rex4b = new RoutineExercise(d.ID,ex2.ID,true,10,3).store();


DataControl.store();

class Exercises {

constructor(pDataControl)	{
	this.exercises =[];
	this.theDataControl = pDataControl;

	const endpoint = 'http://gymeasy.herokuapp.com/exercises';
	const myToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJsZXZlbCI6ImV4cGVydCIsInVzZXJuYW1lIjoiYWRtaW4iLCJpZCI6IjUzYjBlYzY0LTUwNGItMTFlYS1iOWM5LTIyMDAwYWVmNGUwYiIsImlhdCI6MTU4MjMwMDg5MCwiZXhwIjoxNTgyMzA0NDkwfQ.HQGPNm_YSqpVUmJTrs2gulD2e5PYZSuye4-4qMh0Fk8';

	const myHeaders = new Headers({
		'Authorization': myToken,
		'Content-Type': 'application/x-www-form-urlencoded'
	});
	fetch(endpoint, {
		headers: myHeaders,
		method: 'GET'
	}).then(response => {
		return response.json();
	})
	.then((blob)=> {
		this.exercises = blob.data;
		this.exercises.forEach( (item) => {
			//(pName, pDescription,pReps=10,pSets=3)
			let myExercise = new Exercise(item.name,item.description);
			pDataControl.addExerciseID(myExercise.ID);
			myExercise.store();

		});
		pDataControl.store();
		 console.log(blob);
	});
 }
}


let teste;

function supportsImports() {
	return 'import' in document.createElement('link');
   }
 /*
   if (supportsImports()) {
	// Good to go!
   } else {
	// Use other libraries/require systems to load files.
   }
 
let importSupported = supportsImports();


var link = document.querySelector('link[rel="import"]');
var content = link.import;

// Grab DOM from warning.html's document.
var el = content.querySelector('.warning');

document.body.appendChild(el.cloneNode(true));
*/

define(['salvaQuery'], function ($) {
	//var $ = require('./js/salvaQuery.js');
	function personalRoutineFactory() {
		return new PersonalRoutine();
	   }
	function routineFactory() {
		return new Routine();
	}

	function exerciseFactory() {
		return new Exercise();
	}

	function userFactory() {
		return new User();
	}
	function routineExerciseFactory() {
		return new RoutineExercise();
	}
	function personalRoutineExerciseFactory() {
		return new PersonalRoutineExercise();
	}

	return {
	    	dataControl: DataControl,
	    	exercises: new Exercises(DataControl),
	    	personalRoutine: personalRoutineFactory,
	    	routine: routineFactory,
	    	exercise: exerciseFactory,
		user: userFactory,
		routineExercise: routineExerciseFactory,
		personalRoutineExercise: personalRoutineExerciseFactory

	};
 });