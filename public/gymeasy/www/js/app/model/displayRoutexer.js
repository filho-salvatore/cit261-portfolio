class DisplayRoutExer {

     constructor() {
          return this;
     }
 
 
     fillRoutines()   {
         let mySelectRoutines = $('#sel_routine_exercises');
         //get routines from datastore
         //dataControl.retrieve();
        
         let listOfRoutExers = Array.from(Classes.dataControl.myRoutines);
         let listofRoutObjects =[]
         listOfRoutExers.forEach((item) => {
             let myPersonal = Classes.routine();
             //load object from Storage local
             myPersonal.retrieve(item);
             listofRoutObjects.push(myPersonal);
         });
         
         for (let i = 0; i< listOfRoutExers.length; i++){
             var opt = document.createElement('option');
             opt.value = i;
             //let mySrc = listOfRoutExers[i].src;
             //let splitted = mySrc.split('/');
             let fileName = listofRoutObjects[i].name; /*splitted[splitted.length-1];*/
             opt.innerHTML =fileName;
     
             mySelectRoutines.domAppend(opt);
         }
 
     }
 
 }
 

define(['./classes'],function (Classes) {
     
     
     class DisplayRoutExer {

          constructor() {
               
               $('#sel_routine_exercises').evlOn('click',this.onSelectChange.bind(this));
               this.listofRoutObjects =[];
               this.myExercisesArray= [];
               return this;
          }
      
          getRoutinesArray() {
            return Array.from(Classes.dataControl.myRoutineExercises);
          }
      
          fillRoutines()   {
              let mySelectRoutines = $('#sel_routine_exercises');
              //get routines from datastore
              //dataControl.retrieve();
              this.myExercisesArray= [];
              let listOfRoutExers = this.getRoutinesArray();
             //get selected routine
             let mySelectRoutine = $('#sel_routines').domVal();
             
              listOfRoutExers.forEach((item) => {
                  
                  let myPersonal = Classes.routineExercise();
                  //load object from Storage local
                  myPersonal.retrieve(item);
                  if(myPersonal.routineID == mySelectRoutine){ 
                      //get the exercises
                     let myLocalExercise = myPersonal.exerciseID;
                     //get the exercises objects
                     let myLocalExerObj = Classes.exercise().retrieve(myLocalExercise);
                     this.myExercisesArray.push(myLocalExerObj);
                  }
                  this.listofRoutObjects.push(myPersonal);
              });
              

              for (let i = 0; i< this.myExercisesArray.length; i++){
                  var opt = document.createElement('option');
                  opt.value =this.myExercisesArray[i].ID;  // the value of the select
                  
                  let fileName = this.myExercisesArray[i].name; 
                  opt.innerHTML =fileName; // the text of the select
          
                  mySelectRoutines.domAppend(opt);
              }
      
          }

          onSelectChange() {
              
               let mySelectExercise = $('#sel_routine_exercises').domVal();
               //find the Routine

               //get the exercise Id
               let myExercise =  this.myExercisesArray.find((item) => {
                    if(item.ID == mySelectExercise) return true;
               });
               if(myExercise) {
                   let descObj = $('#routexer_description');
                   descObj.element[0].innerHTML = myExercise.description;
               }
          }
      
      }
     return  new DisplayRoutExer().fillRoutines();
     
 });