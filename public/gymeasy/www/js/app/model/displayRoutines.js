 

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
      
      
          /**
           * Fill the select with the routines from the database
           * @param {*} pThis if this is called from the event correct the this pointer
           */
          fillRoutines(pThis)   {
                let self =null;  
                if(pThis !=undefined) {
                  self = pThis;
                }else {
                  self = this;
                }
              let mySelectRoutines = $('#sel_routines');
              //get routines from datastore
              //dataControl.retrieve();
              //verify if the databse is initialized
              let myInitiledDatabase = Classes.dataControl.getFlagElementsSreated();
              if (myInitiledDatabase && myInitiledDatabase == 'true') {
                    Classes.dataControl.retrieveThis();
                    let listOfRoutines = Array.from(Classes.dataControl.myRoutines);
                    
                    listOfRoutines.forEach((item) => {
                        let myPersonal = Classes.routine();
                        //load object from Storage local
                        myPersonal.retrieve(item);
                        self.listofRoutObjects.push(myPersonal);
                    });
                    
                    for (let i = 0; i< listOfRoutines.length; i++){
                        var opt = document.createElement('option');
                        opt.value =self.listofRoutObjects[i].ID;  // the value of the select
                        
                        let fileName = self.listofRoutObjects[i].name; 
                        opt.innerHTML =fileName; // the text of the select
                
                        mySelectRoutines.domAppend(opt);
                    }
                    self.changeRoutExer();
                }
          }

          /**
           * Save the selected routine to database to be used somewhere else
           * @param {*} pThis if this is called from the event correct the this pointer
           */
          saveSelectedRoutine(pThis) {
            let self = null;  
            if(pThis != undefined) {
                  self = pThis;
            }else {
                  self = this;
            }
            //get the selected routine
            let mySelectRoutine = $('#sel_routines').domVal();
            let myPersonal = Classes.routine();
            //load object from Storage local
            myPersonal.retrieve(mySelectRoutine);
            //save it
            Classes.dataControl.saveSelectedRoutine(myPersonal);
          }

          removeSelectedRoutine(pThis) {
            //get the selected routine
            let mySelectRoutine = Number($('#sel_routines').domVal());
            let myRoutExerToDelete = [];
            //get all routexers
            if(mySelectRoutine) {
            let myRoutExers = Classes.dataControl.myRoutineExercises;
              if (myRoutExers) {
                myRoutExers.forEach((item) => {
                  let myRoutine = Classes.routineExercise().retrieve(item);
                  if(myRoutine.myRoutineID == mySelectRoutine) {
                    myRoutExerToDelete.push(item);
                  }
                });
              }
              Classes.dataControl.removeRoutine(mySelectRoutine);
              myRoutExerToDelete.forEach((item) => {
                Classes.dataControl.removeRoutExer(item);
              });
              //remove from select
              $('#sel_routines').selectRemoveSelected();
              
              
            }
          }

          clearSelectedRoutine(){
            Classes.dataControl.clearSelectedRoutine();
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

      const SelecRoutine = new DisplayRoutines();
      const fill = SelecRoutine;

     return { 
        disPlay: SelecRoutine,
        fillRoutines: fill.fillRoutines,
        saveSelectedRoutine: fill.saveSelectedRoutine,
        clearSelectedRoutine: fill.clearSelectedRoutine,
        removeSelectedRoutine: fill.removeSelectedRoutine
    };
     
 });