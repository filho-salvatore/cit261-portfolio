/**
 * this function runs at startup
 * Initialize the library and append it to the window
 * Since we wrap almost everything in anonymous functions, 
 * if our code fails, it should not damage all the external javascript.
 * refer to the library with salvaLib.<section>.<method>, while you may also be able to use the shorthand this to call the current sublibrary (depending on whether you’re inside another anonymous function scope).
 */
(function(window){
     // You can enable the strict mode commenting the following line  
     'use strict';

     //===============PRIVATE================================
     //private properties will be here
     // This variable will be inaccessible to the user, only can be visible in the scope of your library.
     let settings = {
          volume:100,
          mute:false
     };

     //===============PUBLIC===============================
     //internal name of library
     //this object will contain all our library code and functions
     var _LIB= {

          //here we will add the getters and setters for our private properties to be used outside
          // Then your variable will be exposed with this method !
          'getSettings': function(){
               var mySecurityCopy = {};
        
               for(var i in settings){
                    if(i) {
                         mySecurityCopy[i] = settings[i];
                    }      
                         }
               
                    return mySecurityCopy;
               },
          // Change a private property
          'setVolume': function(volume){
                    settings.volume = volume;
                    return volume;
                    },
         /**
          * Testing function – indicates if our library is present
          */
          'test':  function(){ document.getElementsByTagName("body").prepend('SPECIAL library loaded'); },
          /**
          * General tools
          */
         'tools' : {
          /**
          * Console-log wrapper
          */
          "log" : function() { if( window.console && window.console.log ){
                                   window.console.log( Array.prototype.slice.call(arguments) ); }
                              }//— lib.tools.log
          
          },///—- lib.tools
          'myCustomLog': function(thingToLog){
               console.log("My-Custom-Log > Type of variable : " + typeof(thingToLog));
               console.log("My-Custom-Log > Is number : " + !isNaN(thingToLog));
               console.log("My-Custom-Log > Length : " + (thingToLog).length);
     
               return console.log(thingToLog);
               }

     }
   
     //this is the constructor of my library
     // We need that our library is globally accesible, then we save in the window
     if(typeof(window.salvaLib) === 'undefined'){
       window.salvaLib = _LIB;
     }
     return _LIB; 

   })(window); // Send the window variable withing our function
   
   
   // Then we can call it using
   salvaLib.myCustomLog(["My library","Rules"]);
   // Now see the content of your library
     console.log(salvaLib);

     let Settings = salvaLib.getSettings();
