define(function (require) {
    let lib = require('./lib');
        //controller = require('./controller/c2'),
    let classes = require('./model/classes');
    let formSubmit = function (e) {
        
        let id = $('#workout_id').domVal();
        let name = $('#workout_name').domVal();
        let description = $('#workout_description').domVal();
        if (id!='') { //edit workout
            classes.dataControl.updateRoutine(id,name,description);
        } else { //add workout
            
            classes.dataControl.createRoutine(name,description);
            classes.dataControl.store();
        }

    };
    $('#workout_form').evlOn('submit',formSubmit);
    function loadRoutine() {
        classes.dataControl.retrieveThis();
        let theRoutine = classes.dataControl.getSelectedRoutine();
        if(theRoutine) {
            $('#workout_id').domSetProp('value',theRoutine.myID);
            $('#workout_name').domSetProp('value',theRoutine.name);        
            $('#workout_description').domSetProp('value',theRoutine.description);
        } else {
            $('#workout_id').domSetProp('value','');
            $('#workout_name').domSetProp('value','');        
            $('#workout_description').domSetProp('value','');
        }
        
    }

    if(window.attachEvent) {
        window.attachEvent('onload', loadRoutine);
    } else {
        if(window.onload) {
            var curronload = window.onload;
            var newonload = function(evt) {
                curronload(evt);
                loadRoutine(evt);
            };
            window.onload = newonload;
        } else {
            window.onload = loadRoutine();
        }
    }
});
