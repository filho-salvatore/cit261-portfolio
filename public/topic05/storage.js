/**
 * TOPIC 05  - Local Storage
 * 
 */

 /**
  * update the local storage view table when the DOM is loaded
  */
document.addEventListener("DOMContentLoaded", function(){
   
updateLocalStorageView();
updateSessionStorageView(); 
});




 function isStorageEnabled(){
    if (typeof(Storage) !== "undefined") {
        return true;
      } else {
        return false;
      }

 }



 /**
  * The localStorage Object

The localStorage object stores the data with no expiration date. 
The data will not be deleted when the browser is closed, and will be available the next day, week, or year.
  * 
  * 
  */

  // Store

function localStorePair(){
    if (isStorageEnabled()) {
        var key = document.getElementById('localkey').value;
        var value = document.getElementById('localvalue').value;
        localStorage.setItem(key,value);
        updateLocalStorageView(); 
    }else{
        alert("localStorage not enabled in this browser");

    }
}
/**
 * Get Value from Storage
 * @param {*} key 
 */
function localGetValueFromStorage(key){
// Retrieve
let value = '';
if (isStorageEnabled()) {
    value = localStorage.getItem(key);
}else{
    alert("localStorage not enabled in this browser");
}
return value;

}

/**
 * Clear Local Storage
 */

 function localStorageClear(){
    if (isStorageEnabled()) {
        localStorage.clear();
        updateLocalStorageView();
    }else{
        alert("localStorage not enabled in this browser");
    }
 }
/**
 * Get Value from the localStorage
 */
function localGetValue(){
    if (isStorageEnabled()) {
        let key = document.getElementById('localkeyget').value;

        let value = localGetValueFromStorage(key);
        document.getElementById('localkeyvalue').value = value;
    }else{
        alert("localStorage not enabled in this browser");
    }
    
}

/**
 * Get Array from the localStorage
 */
function localGetArray(){
  if (isStorageEnabled()) {
      let key = document.getElementById('localkeyArrayget').value;

      let value = localGetValueFromStorage(key);
      document.getElementById('textValue').value = value;
  }else{
      alert("localStorage not enabled in this browser");
  }
  
}
/**
 * Update the <div> 'localStorage' with the data in the local Storage
 */
function updateLocalStorageView(){
  myDiv =  document.getElementById('mylocalStorage');
  myDiv.innerHTML =  "";
  if (isStorageEnabled()) {
  let htmlTable = '<table border="1">';
  htmlTable += '<thead style="background-color:lightblue" ><tr><th>Key</th><th>Value</th></tr>  </thead>';
            
  for (var i = 0; i < localStorage.length; i++) {
    var key   = localStorage.key(i);
    var value = localStorage.getItem(key);
    htmlTable += '<tr>';
    htmlTable += '<th>'+key+'</th>';
    htmlTable += '<th>'+value+'</th>'
    htmlEndTable = '</tr>';
   
    }

    htmlEndTable +='</table>';
    myDiv.innerHTML +=  htmlTable;
  }else{
    myDiv.innerHTML =  "Local Storage not Enabled in this Browser";
  }

}


/**
 * The sessionStorage Object
The sessionStorage object is equal to the localStorage object, except that it stores the data for only one session. 
The data is deleted when the user closes the specific browser tab.
 */

/**
  * The sessionStorage Object

The sessionStorage object stores the data with no expiration date. 
The data will not be deleted when the browser is closed, and will be available the next day, week, or year.
  * 
  * 
  */

  // Store

  function sessionStorePair(){
    if (isStorageEnabled()) {
        var key = document.getElementById('sessionkey').value;
        var value = document.getElementById('sessionvalue').value;
        sessionStorage.setItem(key,value);
        updateSessionStorageView(); 
    }else{
        alert("sessionStorage not enabled in this browser");

    }
}

function sessionGetValueFromStorage(key){
// Retrieve
let value = '';
if (isStorageEnabled()) {
    value = sessionStorage.getItem(key);
}else{
    alert("sessionStorage not enabled in this browser");
}
return value;

}



/**
 * Clear Local Storage
 */

 function sessionStorageClear(){
    if (isStorageEnabled()) {
        sessionStorage.clear();
        updateSessionStorageView();
    }else{
        alert("sessionStorage not enabled in this browser");
    }sessionStorage.clear();
 }
/**
 * Get Value from the sessionStorage
 */
function sessionGetValue(){
    if (isStorageEnabled()) {
        let key = document.getElementById('sessionkeyget').value;

        let value = sessionGetValueFromStorage(key);
        document.getElementById('sessionkeyvalue').value = value;
    }else{
        alert("sessionStorage not enabled in this browser");
    }
    
}

/**
 * Get Value from the sessionStorage
 */
function sessionGetObject(){
  if (isStorageEnabled()) {
      let key = document.getElementById('sessionkeygetObject').value;

      let value = sessionGetValueFromStorage(key);
      document.getElementById('sessionkeyvalueObj').value = value;
  }else{
      alert("sessionStorage not enabled in this browser");
  }
  
}

/**
 * Update the <div> 'sessionStorage' with the data in the session Storage
 */
function updateSessionStorageView(){
  myDiv =  document.getElementById('mysessionStorage');
  myDiv.innerHTML =  "";
  if (isStorageEnabled()) {
  let htmlTable = '<table border="1">';
  htmlTable += '<thead style="background-color:lightgreen" ><tr><th>Key</th><th>Value</th></tr>  </thead>';
            
  for (var i = 0; i < sessionStorage.length; i++) {
    var key   = sessionStorage.key(i);
    var value = sessionStorage.getItem(key);
    htmlTable += '<tr>';
    htmlTable += '<th>'+key+'</th>';
    htmlTable += '<th>'+value+'</th>'
    htmlEndTable = '</tr>';
   
    }

    htmlEndTable +='</table>';
    myDiv.innerHTML +=  htmlTable;
  }else{
    myDiv.innerHTML =  "Local Storage not Enabled in this Browser";
  }

}

const myFunction1 = function test1(){
    alert("Function Test1");
};

const myArray1 = ['Array of numbers',1,2,3,4,5,6,7,8];
const myArray2 = ['Array of strings','string 1','string 2', 'string 3'];

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


 /**
  * Store Object in the session Storage
  */
 function sessionStoreObject(){
    if (isStorageEnabled()) {
        let value
        let key = document.getElementById('sessionkeyObject').value;
        switch(key) {
            case 'obj1':
                value = JSON.stringify(obj1);
              break;
            case 'obj2':
                value = JSON.stringify(obj2);
              break;
            case 'obj3':
                value = JSON.stringify(obj3);
            break;
          } 
        sessionStorage.setItem(key,value);
        updateSessionStorageView(); 
    }else{
        alert("sessionStorage not enabled in this browser");

    }
}

/**
  * Store Array in the local Storage
  */
 function localStoreArray(){
    if (isStorageEnabled()) {
        let value
        let key = document.getElementById('localkeyArray').value;
        switch(key) {
            case 'arr1':
                value = JSON.stringify(myArray1);
              break;
            case 'arr2':
                value = JSON.stringify(myArray2);
              break;
            case 'arr3':
                value = JSON.stringify(myArray3);
            break;
          } 
        localStorage.setItem(key,value);
        updateLocalStorageView(); 
    }else{
        alert("sessionStorage not enabled in this browser");

    }
}