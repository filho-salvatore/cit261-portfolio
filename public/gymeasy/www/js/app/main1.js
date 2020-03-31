define(function (require) {
    
    /**
     * This code execute after the initialization when the requirejs load the modules
     */
    var /*$ = require('./model/salvaQuery'),*/
        lib = require('./lib'),
        //controller = require('./controller/c1'),
        //model = require('./model/m1'),
        //salva = require('./model/s1'),
        Classes = require('./model/classes');
        displayRoutines = require('./model/displayRoutines');
        displayRoutExer = require('./model/displayRoutexer');
        
        imageList = require('./model/imglist');
        ScrollSal = require('./model/scrollsal');
        new ScrollSal.scroll(".custom-scroll-1",10).setStyle({
			"background":"#202020",
			"z-index":"2"
		},{
			"background":"rgba(0,0,0,0)"
		});
});
