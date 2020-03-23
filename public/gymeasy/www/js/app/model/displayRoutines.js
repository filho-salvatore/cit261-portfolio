 

define(['./classes'],function (Classes) {
     
     
     class DisplayRoutines {

          constructor() {
               
               $('#sel_routines').evlOn('click',this.onSelectChange.bind(this));
               this.listofRoutObjects =[];
               return this;
          }
      
      
          fillRoutines()   {
              let mySelectRoutines = $('#sel_routines');
              //get routines from datastore
              //dataControl.retrieve();
             
              let listOfRoutines = Array.from(Classes.dataControl.myRoutines);
             
              listOfRoutines.forEach((item) => {
                  let myPersonal = Classes.routine();
                  //load object from Storage local
                  myPersonal.retrieve(item);
                  this.listofRoutObjects.push(myPersonal);
              });
              
              for (let i = 0; i< listOfRoutines.length; i++){
                  var opt = document.createElement('option');
                  opt.value =this.listofRoutObjects[i].ID;  // the value of the select
                  
                  let fileName = this.listofRoutObjects[i].name; 
                  opt.innerHTML =fileName; // the text of the select
          
                  mySelectRoutines.domAppend(opt);
              }
      
          }

          onSelectChange() {
              
               let mySelectVal = $('#sel_routines').domVal();
               let myRoutine = this.listofRoutObjects.find((item) => {
                    if(item.ID == mySelectVal) return true;
               });
               if(myRoutine) {
                   let descObj = $('#routine_description');
                   descObj.element[0].innerHTML = myRoutine.description;
               }
          }
      
      }
     return  new DisplayRoutines().fillRoutines();
     
 });