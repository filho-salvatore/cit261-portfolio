/**  callTwitterAPI
@param theCallback the callback function

*/


function callTwitterAPI(theCallback) {
  
    var qValue = document.getElementById('queryText').value;
    var params = "querytext="+qValue;
    let url = 'https://cit261-portfolio.herokuapp.com/twitter';
    //let url = 'http://localhost:8000/twitter';
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
        let theData = JSON.parse(theTwitterData);
        let theDataParsed = JSON.parse(theData);  //for some reason I have to parse the data twice to get the object
        let twits = theDataParsed.statuses;
        console.log("number of twits: " + twits.length);
        var resultPlace = document.getElementById('response');
        
        let htmlTable = '<table border="1">';
       
        htmlTable += '<thead><tr><th>ID</th><th>Text</th></tr>  </thead>';
            

          for (index = 0; index < twits.length; ++index) { 
            console.log(twits[index]); 
            htmlTable += '<tr>';
            htmlTable += '<th>'+index+'</th>';
            htmlTable += '<th>'+twits[index].text+'</th>'
            htmlEndTable = '</tr>';
            } 
            
            htmlEndTable +='</table>';
            resultPlace.innerHTML +=  htmlTable;

        //document.write("The lenght is: " + JSON.stringify(theData));
    }
    if(error){
        document.write("The Error is: "+ error);
        console.log("The Error is: "+ error);
    }

    });

}