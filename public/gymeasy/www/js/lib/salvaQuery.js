


// https://www.freecodecamp.org/news/how-to-write-a-jquery-like-library-in-71-lines-of-code-learn-about-the-dom-e9fb99dbc8d2/
//=============  CSS Manipulation =================


/**
  * Set/Get CSS properties
  * @param {*} element The elemet of the DOM
  * @param {*} property the CSS property
  * @param {*} value  the Value of the property to set
  * to set:
  *  (1) css(element, cssProperty, value);
  *  (2) it is possible to set several properties passing two arguments like this: 
  *       css(element, {cssProperty: value, cssProperty: value});
  * to get CSS property value:
  *      css(element, cssProperty);
  */
 const cssProp = function (element, property, value) {
     'use strict';
     var args = Array.from(arguments);
   
     // write less check logic first
     // element can be a n array of elements selectd by class
     //return the property of the firlt element
     if (Array.isArray(element) && element[0] != null) { //
          element = element[0];
     }
   
     if (!(element instanceof HTMLElement)) {
       throw new Error('Args 1 is not a HTMLElement');
     }
   
     if (args.length === 2) {
       if ((typeof property === 'object')) {
         //set multiple properties
         //cssProp(element, {cssProperty: value, cssProperty: value});
         var props = property;
         for (var prop in props) {
           setSingleProp(element, prop, props[prop]);
         }
   
       } else if ((typeof property === 'string')) {
         //get CSS property value
         //cssProp(element, cssProperty);
         return getProp(element, property);
   
       } else {
         throw new Error('Invalid arguments 2');
       }
     } else if (args.length === 3) {
       if ((typeof property === 'string') && (typeof value === 'string')) {
         // set single property
         // cssProp(element, cssProperty, value);
         setSingleProp(element, property, value);
   
       } else {
         throw new Error('Invalid arguments prop name or value');
       }
     }
   
     // don't do: e.style.prop
     function getProp(e, prop) {
       return e.style[prop];
     }
   
     function setSingleProp(e, prop, value) {
       e.style[prop] = value;
     }
    };




//============= END CSS Manipulation ==============

/**
 * Do  not overwrite existing css classes
 * use: $().cssClass.<function>
 * <fubction> = add, remove, togle, has
 * 
 */
const cssClass = {
     /**
      * Add a CSS class to an element
      * @param {*} elem the DOM element
      * @param {*} className the class to add
      */
     add: function(elem, className) {
       if (!elem) {
         return null;
       }
       elem.classList.add(className);
     },
     /**
      * remove a specific css class of the element
      * @param {*} elem the DOM element
      * @param {*} className the class to remove
      */
     remove: function(elem, className) {
      if (!elem) {
        return null;
      } 
      elem.classList.remove(className);
     },
     /**
      * toggle (false/true) a css class of the element
      * @param {*} elem the DOM element
      * @param {*} className the class to toggle
      */
     toggle: function(elem, className) {
      if (!elem) {
        return null;
      } 
      elem.classList.toggle(className);
     },
     /**
      * @return  true if a HTML element has a given css class
      * @return  false if a HTML element doesn\'t have a given css class
      * @param {*} elem the DOM element
      * @param {*} className the class to toggle
      */
     has: function(elem, className) {
      if (!elem) {
        return null;
      } 
      return elem.classList.contains(className);
     }
   };


//============  END CSS Class Manipulation ============

//============  DOM Manipulation ================

/**
 * Methods for Manipulating the DOM
 * use $().dom.<function>
 * function: remove, append, prepend, after, before, val
 */
const dom = {
     /**
      * remove a HTML element
      * do not throw exception if the target element is not in the DOM
      * @param {*} target the target element
      */
     remove: function(target) {
      if (Array.isArray(target)){
        target.forEach((item) => {
          item.remove();
        });
      } else {
        target.remove();
      }
       
     },
     /**
      * append a HTML element to the given element
      * @param {*} target the target element
      * @param {*} newElement the element to append
      */
     append: function(target, newElement) {
       if (Array.isArray(target)){
         target.forEach((item) => {
          item.appendChild(newElement);
         });
       } else {
        target.appendChild(newElement);
       }
     },
     /**
      * prepend a HTML element to the given element
      * @param {*} target the target element
      * @param {*} newElement the element to prepend
      */
     prepend: function(target, newElement) {
      if (Array.isArray(target)){
        target.forEach((item) => {
          item.prepend(newElement);
        });
      } else {
        target.prepend(newElement);
      }
       
     },
     /**
      * add a new HTML element after a given HTML element
      * do not throw exception if the target element is not in the DOM
      * @param {*} target the target element
      * @param {*} newElement the element to add
      */
     after: function(target, newElement) {
      if (Array.isArray(target)){
        target.forEach((item) => {
          item.insertAdjacentElement('afterend', newElement);
        });
      } else {
        target.insertAdjacentElement('afterend', newElement);
      }
       
     },
     /**
      * add a new HTML element before a given HTML element
      * @param {*} target the target element
      * @param {*} newElement the element to add 
      */
     before: function(target, newElement) {
      if (Array.isArray(target)){
        target.forEach((item) => {
          item.insertAdjacentElement('beforebegin', newElement);
        });
      } else {
        target.insertAdjacentElement('beforebegin', newElement);
      }
       
     },
     /**
      * @return return a value of a given HTML non-select element
      * @return return a value of a given select HTML element
      * @param {*} target the target element
      */
     val: function(target) {
       if (Array.isArray(target) && target.length > 0){
         return thisChange(target[0]);
       } else  {
        let value =  thisChange(target);
        return value;
       }
       
       function thisChange  (target) {
            if (target.tagName === 'SELECT') {
              if(target.options && target.options.length > 0) {
              return target.options[target.selectedIndex].value;
              } else {
                return null;
              }
            } else if (target.tagName === undefined) {
              return new Error ('No such element found');
            } else {
              return target.value;
            }

       }
       
     },
     domProp: function (element, property, value) {
      'use strict';
      var args = Array.from(arguments);
    
      // write less check logic first
      // element can be a n array of elements selectd by class
      //return the property of the firlt element
      if (Array.isArray(element) && element[0] != null) { //
           element = element[0];
      }
    
      if (!(element instanceof HTMLElement)) {
        throw new Error('Args 1 is not a HTMLElement');
      }
    
      if (args.length === 2) {
        if ((typeof property === 'object')) {
          //set multiple properties
          //Prop(element, {cssProperty: value, cssProperty: value});
          var props = property;
          for (var prop in props) {
            setSingleProp(element, prop, props[prop]);
          }
    
        } else if ((typeof property === 'string')) {
          //get element property value
          //Prop(element, cssProperty);
          return getProp(element, property);
    
        } else {
          throw new Error('Invalid arguments 2');
        }
      } else if (args.length === 3) {
        if ((typeof property === 'string') && ((typeof value === 'string') || (typeof value === 'number'))) {
          // set single property
          // Prop(element, cssProperty, value);
          setSingleProp(element, property, value);
    
        } else {
          throw new Error('Invalid arguments prop name or value')
        }
      }
    
      // don't do: e.style.prop
      function getProp(e, prop) {
        return e[prop];
      }
    
      function setSingleProp(e, prop, value) {
        e[prop] = value;
      }
     },
     domAtributes: function (element, attribute, value) {
      'use strict';
      var args = Array.from(arguments);
    
      // write less check logic first
      // element can be a n array of elements selectd by class
      //return the attribute of the firlt element
      if (Array.isArray(element) && element[0] != null) { //
           element = element[0];
      }
    
      if (!(element instanceof HTMLElement)) {
        throw new Error('Args 1 is not a HTMLElement');
      }
    
      if (args.length === 2) {
        if ((typeof attribute === 'object')) {
          //set multiple properties
          //Prop(element, {cssProperty: value, cssProperty: value});
          var props = attribute;
          for (var prop in props) {
            setSingleProp(element, prop, props[prop]);
          }
    
        } else if ((typeof attribute === 'string')) {
          //get element attribute value
          //Prop(element, cssProperty);
          return getProp(element, attribute);
    
        } else {
          throw new Error('Invalid arguments 2');
        }
      } else if (args.length === 3) {
        if ((typeof attribute === 'string') && (typeof value === 'string')) {
          // set single attribute
          // Prop(element, cssProperty, value);
          setSingleProp(element, attribute, value);
    
        } else {
          throw new Error('Invalid arguments prop name or value')
        }
      }
    
      // don't do: e.style.prop
      function getProp(e, prop) {
        return e.attributes[prop];
      }
    
      function setSingleProp(e, prop, value) {
        e.setAttribute(prop,value);
        //e.atributes[prop] = value;
      }
     },
     getNext: function(element) {
      if (!element) return null;
       let myNode =  element.nextElementSibling;
       if (myNode) return myNode;
       else return null;
     },
     getPrevious: function(element) {
      if (!element) return null;
       let myNode =  element.previousElementSibling;
       if (myNode) return myNode;
       else return null;
     },
     getParent: function(element){
       if (!element) return null;
       let Parent =  element.parentElement;
       if(Parent) return Parent;
       else return null;
     },
     getChildren(element, index){
       if(!element) return null;
        let myNode = element.children[index];
        if (myNode) return myNode;
       else return null;
     }
   };

//============ END DOM Manipulation ===========

//============ Event List Handlet =============
/**
 * Event Listener handlers methods
 * use: $().eventListener.<function>
 * function: on, off, trigger, delegate
 */
const eventListener = (function() {
     'use strict';
     let eventHub = [];
   
     return {
       
        /**
         * add an event to an HTML element
         * add the same event+callback several times to an HTML element
         * add the same callback for several different events to an HTML element
         * add several different callbacks for same event to an HTML element
         * @param {*} element the element to add the handler
         * @param {*} eventName the event
         * @param {*} cback the callback method
         */
       on: (element, eventName, cback) => {
         if(Array.isArray(element)) {
          element.forEach((item) => {
            addEvent(item);
          });
         
        } else {
          addEvent(element);
        }

        function addEvent(pItem) {
         if (!eventHub.find(({ el }) => el === pItem)) {
           eventHub.push({
             el: pItem,
             events: {},
           });
         }
   
         const eventHubItem = eventHub.find(({ el }) => el === pItem);
   
         if (!(eventName in eventHubItem.events)) {
           eventHubItem.events[eventName] = [cback];
           
           pItem.addEventListener(eventName, () => {
             eventHubItem.events[eventName].forEach((callback) => {
               callback();
             });
           });
         } else {
           eventHubItem.events[eventName].push(cback);
         }
        }
       },
   
       /**
         * remove one event handler of an HTML element off(<element>,<event>,<handler>)
         * remove all equal events of a HTML element :off(<element>, <event>)
         * remove all events of a HTML element: off(<element>)
         * @param {*} element the element to add the handler
         * @param {*} eventName the event
         * @param {*} cback the callback method
         */
       off: (element, event, cback) => {
         if (!element) {
           eventHub = [];
           return;
         }
   
         const eventHubItem = eventHub.find(({ el }) => el === element);
   
         if (!event) {
           eventHubItem.events = {};
           return;
         }
   
         if (!cback) {
           eventHubItem.events[event] = [];
           return;
         }
   
         eventHubItem.events[event] = eventHubItem.events[event].filter((cb) => {
           return cb !== cback;
         });
       },
   
       /**
         * trigger an event on a HTML element: trigger(<element>,<event>)
         *  @param {*} element the element to add the handler
         * @param {*} eventName the event
         */
       trigger: (element, eventName) => {
         const newEvent = new Event(eventName);
         element.dispatchEvent(newEvent);
       },
   
       /**
        * delegate an event to elements with a given css class name
        * do not delegate an event to elements without a given css class name
        * delegate the event to elements that are added to the DOM to after delegate call
        * trigger delegated event handler when the event happens on an element inside a targeted element
        * do not trigger delegated event handler if the event happens on container of delegator
        * trigger delegated event handler multiple times if event happens on multiple elements
        * @param {*} parentElement  the parent eelement
        * @param {*} cssName the class name
        * @param {*} eventName the event name
        * @param {*} cback the allback function
        */
       delegate: (parentElement, cssName, eventName, cback) => {
         parentElement.addEventListener(eventName, function (element) {
           const path = element.composedPath();
           path.filter(el => el.className === cssName)
               .forEach(() => cback());
         });
       }
     };
   })();

//========= END event LIST Handler ============




let salQuery = function(selector) {
 this.selectors = selector || null;
 this.element = null;
};

let salInit = function() {
     'use strict';
     const query = this.selectors.substring(1);
     const VALIDATOR = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g;
     const NS = "http://www.w3.org/1999/xhtml";
     const type = this.selectors[0];
   
     if (type === '.') {
          let elem = Array.from(document.getElementsByClassName(query));
          if (elem.length == 1) this.element = elem[0];
          else return elem;
     }
     else if (type === '#') {
       this.element = [document.getElementById(query)];
     }
     else if (!VALIDATOR.test(this.selectors)) {
       throw Error('Invalid Selector');
     }
     else {
       //return Array.from(document.getElementsByTagName(selectors));
       this.element = [...document.getElementsByTagNameNS(NS, this.selectors)];
     }
     
};

/*
salQuery.prototype.css.prototype = {
     
};
*/
salQuery.prototype = {
     init: salInit ,

     cssGetProp:function(prop){
                    return cssProp(this.element, prop);
     },
     cssSetProp:function (prop, value) {
                    cssProp(this.element, prop, value);
                    return this;
     },
     cssSetProps:function(props){
                    cssProp(this.element, props);
                    return this;
     },    
     classAdd:function (className) {
               cssClass.add(this.element, className);
               return this;
     },
     classRemove:function (className) {
               cssClass.remove(this.element, className);
               return this;
     },
     classToggle:function (className) {
               cssClass.toggle(this.element, className);
               return this;
     },
     classHas:function(className){
               "use strict";
               return cssClass.has(this.element, className);
     },
     domBefore:function (element) {
               dom.before(this.element, element);
               return this;
     },
     domAfter:function (element) {
               dom.after(this.element, element);
               return this;
     },
     domAppend:function (element) {
               dom.append(this.element, element);
               return this;
     },
     domPrepend:function (element) {
               dom.prepend(this.element, element);
               return this;
     },
     domVal: function() {
       let value = dom.val(this.element);
       return value;
     },
     domPropVal: function (element) {
      return dom.domProp(this.element, prop);
     },
     domGetProp:function(prop){
      return dom.domProp(this.element, prop);
     },
     domSetProp:function (prop, value) {
            dom.domProp(this.element, prop, value);
            return this;
     },
     domSetProps:function(props){
            dom.domProp(this.element, props);
            return this;
     },
     domAttrVal: function () {
      return dom.domAtributes(this.element, attr);
     },
     domGetAttr:function(attr){
      return dom.domAtributes(this.element, attr);
     },
     domSetAttr:function (attr, value) {
            dom.domAtributes(this.element, attr, value);
            return this;
     },
     domSetAttrs:function(attrs){
            dom.domAtributes(this.element, attrs);
            return this;
     },domParent: function () {
           let myParent = dom.getParent(this.element);
           if (myParent) {
             this.element = myParent;
           }
           return this;
     },
     domNext: function () {
           this.element= dom.getNext(this.element);
           return this;
     },
     domPrevious: function () {
           this.element = dom.getPrevious(this.element);
           return this;
     },
     domChildren: function(index) {
           this.element = dom.getChildren(this.element, index);
           return this;
     },    
     evlOn:function(type, callback){
               eventListener.on(this.element, type, callback);
               return this;
     },
     evlOff:function(type, callback){
               eventListener.off(this.element, type, callback);
               return this;
     },
     evlTrigger:function(type){
               eventListener.trigger(this.element, type);
               return this;
     },
     evlDelegate:function(type, selector, callback){
               eventListener.addDelegation(this.element, selector, type, callback);
               return this;
     }

};

// Expose salvaQuery to the global object
window.salvaQuery = window.$ = function (selector) {
    var el = new salQuery(selector);
    el.init();
    return el;
  };


define(function () {
 
  $ = function (selector) {
    var el = new salQuery(selector);
    el.init();
    return el;
  }; 
  return $;
});


  (function(window){

    window.salvaQuery = window.$ = function (selector) {
      var el = new salQuery(selector);
      el.init();
      return el;
    }; 

  })(window); // Send the window variable withing our function
//let myBack = $('.carousel-container').cssGetProp('color');
//console.log(myBack);