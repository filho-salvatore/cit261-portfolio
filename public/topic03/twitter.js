var opts = {
    method: 'GET',      
    headers: {}
  };
  fetch('https://cit261-portfolio.herokuapp.com/twitter', opts).then(function (response) {
    return response.json();
  })
  .then(function (body) {
    //doSomething with body;
  });

/**  callTwitterAPI
@param theCallback the callback function
The server sid express route
 this.express.get('/api/name', (req, res) => {
      let name = "TEST API CIT-261 Salvatore";
      res.status(200).json(name);
      
    });

*/


function callTwitterAPI(theCallback) {
    var qValue = document.getElementById('queryText').value;
    var params = "querytext="+qValue;
    let url = 'https://cit261-portfolio.herokuapp.com/twitter';
    let completeURL = url+"?"+params;
    
    var http = new XMLHttpRequest();
    
    http.open("GET", url+"?"+params, true);
    // Make a scripted HTTP request to a backend version API    
    request = new XMLHttpRequest();    
    //request.open('GET', completeURL);    
    request.open('GET', completeURL,true);    
    request.send();    
    
    // Register a callback that will be invoked when the response arrives    
    request.onload = () => {        if (request.status === 200) 
        {            
            // If HTTP status is good, get version number and call callback.            
            let twitterData = JSON.stringify(request.responseText);            
            theCallback(null, twitterData);        
        } else {            
            // Otherwise report an error to the callback            
            theCallback(response.statusText, null);        
        } 
    };    // Register another callback that will be invoked for network errors    
    
    request.onerror = request.ontimeout = (e) => {        
        theCallback(e.type, null) ;   
    };
}

function getTwitterData(){ 
     callTwitterAPI((error,theTwitterData)=>{

    if(theTwitterData){
        console.log("The API NAME is: " + theTwitterData);
        document.write("The API NAME is: " + theTwitterData);
    }
    if(error){
        document.write("The Error is: "+ error);
        console.log("The Error is: "+ error);
    }

    });

}