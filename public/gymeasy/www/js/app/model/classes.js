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
	
	static addPersonalRoutineID(pID){
		this.myPersonalRoutines.add(pID);
	}
	static addRoutineExerciseID(pID){
		this.myRoutineExercises.add(pID);
	}
	static addPersonalRoutineExerciseID(pID) {
		this.myPersonalRoutineExercises.add(pID);
	}
	static addExerciseID (pID){
		DataControl.myExercises.add(pID);
	}


	static init () {
		let myDatabaseCreated = myStorage.getFlagElementsSreated();
		if(myDatabaseCreated != 'true') {
		//myStorage.localStorageClear();
		
		//generate some routines and save the to data store
		let a =  new Routine('Shoulder Workout', 'workout to strengthen the sholder muscles', true).store();
		let b = new Routine('Leg Workout', 'workout to strengthen the Leg muscles', true).store();
		let c = new Routine('Triceps Workout', 'workout to strengthen the Triceps muscles', true).store();
		let d = new Routine('Back Workout', 'workout to strengthen the back muscles', true).store();

		DataControl.store();
		myStorage.setFlagElementsSreated();
		}else {
			
			DataControl.retrieveThis();
		}

	}	
	/**
	 * Store this object in the Local Database
	 */
	static store(){
		if(this.myRoutines.size >0) {
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
	}
		return this;
	}


	/**
	 * Retrieve this object from the local Storage and return it
	 * Does not change this object
	 * @pPreserve true to preserve the actualData ansd only add new data
	 */
	static retrieveThis() {
		let localObj =  myStorage.localGetObj('dataControl');
		if(localObj) {
			
		localObj.routines.forEach((routine)=> {
			this.myRoutines.add(routine);
		});
		localObj.routineExercises.forEach((routine)=> {
			this.myRoutineExercises.add(routine);
		});
		
		//this.myRoutineExercises =  new Set(localObj.routineExercises);
		localObj.exercises.forEach((routine)=> {
			this.myExercises.add(routine);
		});
		//this.myExercises =  new Set(localObj.exercises);
		localObj.personalRoutines.forEach((routine)=> {
			this.myPersonalRoutines.add(routine);
		});
		//this.myPersonalRoutines =  new Set(localObj.personalRoutines);
		localObj.personalRoutineExercises.forEach((routine)=> {
			this.myPersonalRoutineExercises.add(routine);
		});
		//this.myPersonalRoutineExercises =  new Set(localObj.personalRoutineExercises);
		}
		return localObj | null;
	}

	static getExercises() {
		const theExercises = [];
		if (this.myExercises && this.myExercises.size > 0)
		this.myExercises.forEach((exer) => {
			const exercise = new Exercise();
			exercise.retrieve(exer);
			theExercises.push(exercise);
		});
		return theExercises;
	}

	static setFlagElementsSreated() {
		return myStorage.setFlagElementsSreated();
	}
	static getFlagElementsSreated() {
		return  myStorage.getFlagElementsSreated();
	}

	/**
	 * Get the selected routine from database
	 * @Return the selected routine, if found or null otherwise
	 */
	static getSelectedRoutine(){
		let theRoutine= myStorage.localGetObj('selectedWorkout');
		let myPersonal = null;
		if(theRoutine ) {
			myPersonal = new Routine().retrieve(theRoutine.myID);
		}
		//load object from Storage local
		return myPersonal;
	
	}

	/**
	 * Save the selected routine to database
	 * @param {*} pRoutine  the routine to save as selected
	 */
	static saveSelectedRoutine(pRoutine){
		return myStorage.localStoreObj('selectedWorkout',pRoutine);
	}

	/**
	 * clear the selected routine in the database
	 */
	static clearSelectedRoutine() {
		myStorage.localRemoveItem('selectedWorkout');
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
		if (localObj) {
			this.myID = localObj.myID;
			this.myUsername = localObj.myUsername;
			this.myPassword = localObj.myPassword;
			this.myFirstName = localObj.myFirstName;
			this.myLastName = localObj.myLastName;
		}
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
		if (localObj) {
		this.myID = localObj.myID;
		this.myRoutineName= localObj.myRoutineName;
		this.myDescription = localObj.myDescription;
		}
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
	constructor(pName, pDescription,pID,pGenID=false, pReps=10,pSets=3) {
		if(pID) {
			this.myID = pID;
		}
		if (pGenID)  { 
			this.myID= generateId(); 
			DataControl.addExerciseID(this.ID);
		}

		if(!this.myID)  {
			this.myID = 0;
		}
		this.myExerciseName = pName;
		this.myDescription = pDescription;
		this.myDefaultReps = pReps;
		this.myDefaultSets = pSets;
		this.myImage = '';
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

	get image () {
		return this.myImage;
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

	set image(val) {
		this.myImage = val;
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
		if (localObj) {
			this.myID = localObj.myID;
			this.myExerciseName = localObj.myExerciseName;
			this.myDescription = localObj.myDescription;
			this.myDefaultReps = localObj.myDefaultReps;
			this.myDefaultSets = localObj.myDefaultSets;
		}
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

	getImage() {
		const endpoint = `https://gymeasy.herokuapp.com/medias?filter[id_exercise]=${this.ID}&filter[type]=record_image`               ;
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
		 //console.log(blob);
		 if(blob.data && Array.isArray(blob.data) && blob.data.length > 0) {
		  this.myImage = blob.data[0].link;
		  this.store();
		 }
	});
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
		if (localObj) {
			this.myID = localObj.myID;
			this.myPersonID = localObj.myPersonID;
			this.myRoutineID = localObj.myRoutineID;
			this.myRoutineDate = localObj.myRoutineDate;
			this.myTimetaken  = localObj.myTimetaken;
			this.myCompleted = localObj.myCompleted;
		}
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
		if (localObj) {
			this.myID = localObj.myID;
			this.myRoutineID = localObj.myRoutineID;
			this.myExerciseID = localObj.myExerciseID;
			this.myDefaultReps = localObj.myDefaultReps;
			this.myDefaultSets = localObj.myDefaultSets;
		}
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
		if (localObj) {
			this.myID = localObj.myID;
			this.myRoutineID = localObj.myRoutineID;
			this.myExerciseID = localObj.myExerciseID;
			this.myNumberOfReps = localObj.myNumberOfReps;
			this.myNumberOfSets = localObj.myNumberOfSets;
		}
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
	 * remove a item (key,value pair) from the local Storage
	 * @param {*} pItem the key of the item to remove
	 */ 
	static localRemoveItem(pItem) {
		
		if (this.isStorageEnabled()) {
			localStorage.removeItem(pItem);
			
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
		let myObj =  this.localGetArray(pKey);
		return myObj;
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
	
	static setFlagElementsSreated() {
		localStorage.setItem('DatabaseCreated', 'true');
	}
	static getFlagElementsSreated() {
		return localStorage.getItem('DatabaseCreated');
	}
	 
}



 /*
let myRout = new PersonalRoutine(139,1,true);

myRout.store();
let myID = myRout.ID;


let myStoredRout = new PersonalRoutine();
myStoredRout.retrieve(myID);
*/
// after tested, remove this line.
//only clear storage if the elements are not there;


class Exercises {

constructor(pDataControl)	{
	this.exercises =[];
	this.theDataControl = pDataControl;
	/* get the actual state of the DataControl, before changing it */
	//pDataControl.retrieveThis();
	const endpoint = new URL('https://gymeasy.herokuapp.com/exercises');
	const myToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJsZXZlbCI6ImV4cGVydCIsInVzZXJuYW1lIjoiYWRtaW4iLCJpZCI6IjUzYjBlYzY0LTUwNGItMTFlYS1iOWM5LTIyMDAwYWVmNGUwYiIsImlhdCI6MTU4MjMwMDg5MCwiZXhwIjoxNTgyMzA0NDkwfQ.HQGPNm_YSqpVUmJTrs2gulD2e5PYZSuye4-4qMh0Fk8';

	const myHeaders = new Headers({
		'Authorization': myToken,
		'Content-Type': 'application/x-www-form-urlencoded'
	});

	let params = {'filter[is_part]':false};
	Object.keys(params).forEach(key => endpoint.searchParams.append(key, params[key]));

	fetch(endpoint, {
		headers: myHeaders,
		method: 'GET'
	}).then(response => {
		return response.json();
	})
	.then((blob)=> {
		this.exerc = blob.data;
		this.exerc.forEach( (item) => {
			//(pName, pDescription,pReps=10,pSets=3)
			let myExercise = new Exercise(item.name,item.description,Number(item.id));
			myExercise.getImage();
			DataControl.addExerciseID(myExercise.ID);
			myExercise.store();

		});
		//pDataControl.store();
		//console.log(blob);
	});
 }
}

window.addEventListener('beforeunload', function( ){
	//save the database
	DataControl.store();
});




define(['salvaQuery'], function ($) {
		

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
	function routineExerciseFactory(x=null,y=null,z=null) {
		return new RoutineExercise(x,y,z);
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