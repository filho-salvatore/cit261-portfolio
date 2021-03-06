

define(['./classes','./salvaScroll'],function (Classes, ScrollSal) {
     
     
     class DisplayRoutExer {

          constructor() {
               
               $('#sel_routine_exercises').evlOn('mousedown',this.onSelectChange.bind(this));
               $('#sel_routine_exercises').evlOn('change',this.onSelectChange.bind(this));
               
               this.listofRoutObjects =[];
               this.myExercisesArray= [];
               return this;
          }
      
          getRoutinesArray() {
            let myInitiledDatabase = Classes.dataControl.getFlagElementsSreated();
            if (myInitiledDatabase && myInitiledDatabase === 'true') {
                return Array.from(Classes.dataControl.myRoutineExercises);
            }
            return null;
          }

          //Add the exercises of the routine to the Select
          fillRoutines()   {
            
              let mySelectRoutines = $('#sel_routine_exercises');
              mySelectRoutines.element[0].options.length = 0;
              //get routines from datastore
              //dataControl.retrieve();
              this.myExercisesArray= [];
              let listOfRoutExers = this.getRoutinesArray();
             //get selected routine
             let myRoutine = $('#sel_routines');
             if(myRoutine.element) {
             let mySelectRoutine = $('#sel_routines').domVal();
              if(listOfRoutExers) {
              //find the routine exercises where the routine id == mySelectRoutine
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
            }
              this.onSelectChange();
              return this;
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
               new ScrollSal.scroll("#scrolable1").setStyle({
                    "background":"#202020",
                    "z-index":"2"
                },{
                    "background":"rgba(0,0,0,0)"
                });
          }

          /**
           * remove the selected exercise from the Routine
           */
          removeSelected() {
                //get the routine
                let myroutine =  Number($('#sel_routines').domVal());
                let myExercise = Number($('#sel_routine_exercises').domVal());
                //find the routexer
                if(myroutine && myExercise) {
                    let myRoutExers = Array.from(Classes.dataControl.myRoutineExercises);
                      if (myRoutExers) {
                        let found = myRoutExers.find((item) => {
                          let myRoutine = Classes.routineExercise().retrieve(item);
                          return ((myRoutine.myRoutineID == myroutine) &&
                                  (myRoutine.myExerciseID == myExercise));
                         
                            });
                        if (found)    {
                            Classes.dataControl.removeRoutExer(found);
                        }
                      }
                      
                //remove from select
                $('#sel_routine_exercises').selectRemoveSelected();
                
                      
                }

          }

      
      }
      const SelecRoutExer = new DisplayRoutExer();//.fillRoutines();
      const fillRoutines =  SelecRoutExer;
      /**
         * add the selected exercise to the selected workout
         */
        function addExercisesToWorkout() {
            //DataControl.retrieveThis(); /* get the actual stae of Datacontrol before changing it */
            //get the selected exercise
            let myExercise = $('#sel_images').domVal();
            //get the selected workout
            let myRoutine =  $('#sel_routines').domVal();
            //create a workexer
            let myRoutExer = Classes.routineExercise(Number(myRoutine),Number(myExercise), true).store();
            //add to select
            //DataControl.store();
            SelecRoutExer.fillRoutines();
            //update description
            SelecRoutExer.onSelectChange();
         }

        

     return  {
         disPlay: SelecRoutExer,
         addExercisesToWorkout,
         fillRoutines,
         removeSelected: fillRoutines.removeSelected

     };
     
 });