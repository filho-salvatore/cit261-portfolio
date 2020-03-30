define(function (require) {
    let lib = require('./lib');
        //controller = require('./controller/c2'),
    let classes = require('./model/classes');
       
    function loadRoutine() {
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
