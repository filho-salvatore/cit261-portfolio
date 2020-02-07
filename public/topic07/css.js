"use strict";

/**
 * Togle the Shared stylesheet on/of
 */
function toggleCSS() {    
    for (var i = 0; i < document.styleSheets.length; i++ ) 
    {        
        
        if ((document.styleSheets[i].href &&             
        
            document.styleSheets[i].href.includes("sample")) ||            
            document.styleSheets[i].title == "Shared") { 
            document.styleSheets[i].disabled = !document.styleSheets[i].disabled;  
            break;        
        }    
    }
}

/**
 * disable all stylesheets loaded, except the sample.css
 */
function disableAll() {    
    
    for (var i = 0; i < document.styleSheets.length; i++ ) {        
        
        if (!(document.styleSheets[i].href &&              
                document.styleSheets[i].href.includes("sample")) &&             
                document.styleSheets[i].title != "Shared") {            
                document.styleSheets[i].disabled = true;        
        }    
    }
}

/**
 * apply stylesheet
 * @param {*} color the stylesheet to apply 
 */
function applyCSS(color) {    
    for (var i = 0; i < document.styleSheets.length; i++ ) {        
        if ((document.styleSheets[i].href &&             
            document.styleSheets[i].href.includes(color)) ||            
            document.styleSheets[i].title == color) {            
                document.styleSheets[i].disabled = false;        
        }else if (!(document.styleSheets[i].href &&                   
                    document.styleSheets[i].href.includes("sample")) &&    
                    document.styleSheets[i].title != "Shared") {

                    document.styleSheets[i].disabled = true;        
        }
    }
}
    
var newRuleIndex = -1;



//runs when the document is loaded
disableAll();


var element = document.createElement('style'),sheet;
//element.title="mySheet"
// Append style element to head
document.head.appendChild(element);

// Reference to the stylesheet
sheet = element.sheet;

/* alternative approach
let head =document.getElementsByTagName('HEAD');

head.append('<style id="new-animations" type="text/css"></style>');

var sheet = document.getElementById('new-animations').sheet
*/

/*
var styles = '.new-animation {';
styles += 'text-align:right;';
styles += 'line-height:150px !important;'
styles += '}';
*/
let styles = 'body {';
styles += 'background-color:blue';
styles += '}';

let styles2 = "p {border: 1px solid black;}";
// Add the first CSS rule to the stylesheet


function toggleRule() {  
    var sets = document.styleSheets 
    var sheet; 
    for (var prop in sets) {
        if (sets.hasOwnProperty(prop)) {
            sheet = sets[prop];
           
        }
    }
    if (newRuleIndex == -1) {        
        newRuleIndex = sheet.insertRule(styles2, 0);    
    }else {        
        sheet.deleteRule(newRuleIndex);        
        newRuleIndex = -1;    
    }
}