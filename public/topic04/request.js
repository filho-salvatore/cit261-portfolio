/*
TOPIC 4 - 
*/


/***
Get the API Name
@param theCallback the callback function
The server sid express route
 this.express.get('/api/name', (req, res) => {
      let name = "TEST API CIT-261 Salvatore";
      res.status(200).json(name);
      
    });

*/
function getAPIName(theCallback) {
    // Make a scripted HTTP request to a backend version API    
    request = new XMLHttpRequest();    
    request.open('GET', ' https://cit261-portfolio.herokuapp.com/api/name');    
    request.send();    
    
    // Register a callback that will be invoked when the response arrives    
    request.onload = () => {        if (request.status === 200) 
        {            
            // If HTTP status is good, get version number and call callback.            
            let apiName = JSON.stringify(request.responseText);            
            theCallback(null, apiName);        
        } else {            
            // Otherwise report an error to the callback            
            theCallback(response.statusText, null);        
        } 
    };    // Register another callback that will be invoked for network errors    
    
    request.onerror = request.ontimeout = (e) => {        
        theCallback(e.type, null) ;   
    };
}

function onGetAPIName(){ 
    
    getAPIName((error,theAPIName)=>{

    if(theAPIName){
        
        alert("The API NAME is: " + theAPIName);
    }
    if(error){
       
       alert("The Error is: "+ error);
    }

    });

}