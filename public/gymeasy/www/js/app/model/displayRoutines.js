 

define(['./classes','./displayRoutexer'],function (Classes, routexer) {
     
        const myRout = routexer;
     //const DisplayRoutExerSelect =  disp.fillRoutines;
     class DisplayRoutines {

          constructor() {
               
               $('#sel_routines').evlOn('change',this.changeRoutExer.bind(this));
               //$('#sel_routines').evlOn('onselect',this.onSelectChange.bind(this));
               this.listofRoutObjects =[];
               return this;
          }
      
      
          fillRoutines()   {
              let mySelectRoutines = $('#sel_routines');
              //get routines from datastore
              //dataControl.retrieve();
              Classes.dataControl.retrieveThis();
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
              this.changeRoutExer();
          }

          onSelectChange() {
           // DisplayRoutExerSelect.fillRoutines();
               let mySelectVal = $('#sel_routines').domVal();
               let myRoutine = this.listofRoutObjects.find((item) => {
                    if(item.ID == mySelectVal) return true;
               });
               if(myRoutine) {
                   let descObj = $('#routine_description');
                   descObj.element[0].innerHTML = myRoutine.description;
               }
          }
          /**
           * Fill the routExer select with the exercises from the selected routine;
           */
          changeRoutExer() {
            myRout.fillRoutines.fillRoutines();

          }

      
      }

      
     return  new DisplayRoutines().fillRoutines();
     
 });