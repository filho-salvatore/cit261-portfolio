define(function (require) {
    
    /**
     * This code execute after the initialization when the requirejs load the modules
     */
    var /*$ = require('./model/salvaQuery'),*/
        lib = require('./lib'),
        controller = require('./controller/c1'),
        model = require('./model/m1'),
        salva = require('./model/s1'),
        Classes = require('./model/classes');
        displayRoutines = require('./model/displayRoutines');
        displayRoutExer = require('./model/displayRoutexer');
        
        imageList = require('./model/imglist');
       
        //DataControl = require('./model/classes');
        //exercises = require('./model/classes');
        //carrousel.addElements(Images);
        //routines = require('./model/classes');

    //A fabricated API to show interaction of
    //common and specific pieces.
    controller.setModel(model);
    //$(function () {
    //    controller.render(lib.getBody());
    //});
});
