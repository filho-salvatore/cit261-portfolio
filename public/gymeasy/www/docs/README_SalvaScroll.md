# salvaScroll 

Vanilla Javascript Scrollbar
Used to create a croll in text divisions

salvaScroll doesn't use `mousewheel` to create the scrolling effect, instead it hides the natural scrollbar. So properties like `scrollTop` can be used on the `scrollElement`. Other plugins that uses the scroll function can also be used with salvaScroll. 

**Usage:**

include 
```html
<script src="salvaScroll.js"></script>
```

And in js

```javascript
var customScroll = new salvaScroll(element,width)
```
`element` is the divison where the text is inside (the wrapper element) and width is the `width` of the scrollbar


**Example**
```javascript
<div class="custom-scroll-1">
    <div class='imageWrapper' >
        <p>(1) To get the Workouts, Click Load Workouts 
        <hr>
        <p>(2) To add Exercises to a Workout
        <p>  (2.1)Click Load Exercises
        <p>  (2.2) Select the desired Exercise
        <p>  (2.3) Click Add to Workout
        <hr>
        <p>(3) To Adminitrate Workouts (Add,Edit,delete)
        <p>  (3.1) Click the respective button (add,Edit,Delete)
            
    </div>
</div> 

let myScroll = new ScrollSal.scroll(".custom-scroll-1",10).setStyle({
			"background":"#202020",
			"z-index":"2"
		},{
			"background":"rgba(0,0,0,0)"
		});

```

## Methods:


`.setStyle(scrollbar,scrollbarholder)` where:

`scrollbar`(object) is used to style the scrollbar
`scrollbarholder`(object) is used to style the scrollbar holder.

Eg:

```javascript
let myScrolBarStyle = {
  'background':'#fc0',
  'border-radius':'10px'
};
let myHolderStyle = {
  'background':'#fff',
  'opacity':'.6'
};
customScroll.setStyle( myScrolBarStyle,myHolderStyle);

```

`.setScroll(scrollPosition,duration)` where:
 
 `scrollposition` - (integer) position to scroll to. 
 `duration` (integer) duration in milliseconds.

`.refresh()` : recalculate the scrollbar properties incase of height change. Is called automatically in an interval.

`.destroy()` : remove all custom scroll properties and show the original default scroll bar.

## Event Handler

`.onScroll(func)` setup a function (func) to be executed while scrolling.


## Properties


`.scrollBar` the scrollbar element

`.scrollBarHolder` the scrollbar holder element

`.scrollElement` the element which scrolls. Refer this element to other plugins that use the scroll function.

`.scrollSpeed` speed at which element scrolls when clicked on the scrollbar holder. default 200ms







