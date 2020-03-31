define(['salvaQuery'],function ($) {

/**
 * 
 * @param {*} e the original element (wrapper Element)
 * @param {*} w width of the scrollbar
 */
SalvaScroll = function(e, w) {
  
    var _this = this;

    /**
     * the original element (paragraph)
     */
    this.origP = $(e).element;

    // init function, if not ie 8 and below this will run
    this.init = function(){
      if (w == undefined) {
          this.scrollBarWidth = 5;
      } else {
          this.scrollBarWidth = w;
      }
      // scrollspeed for scroll trackpad click event
      this.scrollSpeed = 200;
      // parent content
      this.parContent = this.origP.innerHTML;
      this.origP.innerHTML = "";

      
      /**
       * Elements created
       * the wrapper is the container for the outer-scroller
       * inside the wrapper(e) element we created the outer-scroller
       * the outer-scroller is the container for the inner-scroller
       * inside the outer-scroller we create a inner-scroller
       * the inner-scroller is the container for the scrollbar-holder and the scrollbar elements
       * inside the inner-scroller we create the scrollbar-holder
       * inside the scrollbar-holder we create the scrollbar
       */
      this.outerP = document.createElement('div'); //the outer scroller
      this.scrollBarHolder = document.createElement('div'); //the vertical bar where we put the scrollbar
      this.scrollBar = document.createElement('div'); //the scroll element
      this.innerP = document.createElement('div'); //the inner scroller


      this.outerP.className = 'salvaScroll-outer-scroller';
      this.scrollBarHolder.className = 'salvaScroll-scrollbar-holder';
      this.scrollBar.className = 'salvaScroll-scrollbar';
      this.innerP.className = 'salvaScroll-inner-scroller';
      this.outerP.style.position = 'relative';
      this.outerP.style.paddingRight = this.scrollBarWidth + 'px';
      this.outerP.style.zIndex = '9999999';
      this.outerP.style.height = '100%';
      this.outerP.style.overflow = 'hidden';
      this.inPWidth = (this.origP.clientWidth - this.scrollBarWidth) + 'px';
      this.innerP.style.cssText = 'height:100%;overflow-y:auto;overflow-x:hidden;padding-right:' + (this.scrollBarWidth + 20) + "px;width:100%;box-sizing:content-box;";
      this.innerP.innerHTML = this.parContent;
      this.innerP.style.height = '100%';
      this.outerP.appendChild(this.innerP);
      this.scrollBarHolder.appendChild(this.scrollBar);
      this.outerP.appendChild(this.scrollBarHolder);
      this.origP.appendChild(this.outerP);
      this.sbHeight = this.innerP.clientHeight * 100 / this.innerP.scrollHeight;
      this.mdown = false;
      this.customHeight = false;
      this.scrollElement = this.innerP;
      
      /**
       * onScroll event handler
       * @param f function to run when the event onScroll happens
       */
      this.onScroll = function(f) {
          _this.onScrollF = f;
      };
      
      /**
       * The scrollbar style
       */
      this.sBStyle = {
          width: _this.scrollBarWidth + 'px',
          height: _this.sbHeight + '%',
          position: 'absolute',
          right: 0,
          top: 0,
          backgroundColor: '#444444',
          borderRadius: '15px'
      };

      /**
       * the Scrollbar holder style
       */
      this.sBHStyle = {
          width: _this.scrollBarWidth + 'px',
          height: '100%',
          position: 'absolute',
          right: 0,
          top: 0,
          backgroundColor: '#ADADAD',
          borderRadius: '15px'
      };

      /**
       * apply style  to scrollbar
       */
      for (var p in this.sBStyle) {
          this.scrollBar.style[p] = this.sBStyle[p];
      }

      /**
       * apply style to scrollbar holder
       */
      for (var p in this.sBHStyle) {
          this.scrollBarHolder.style[p] = this.sBHStyle[p];
      }


      /**
       * event listener to the scroll event in the inner-scroller
       */
      this.innerP.addEventListener('scroll', function() {
          _this.scrollBar.style.top = _this.innerP.scrollTop * 100 / _this.innerP.scrollHeight + (_this.sbHeight - parseFloat(_this.sBStyle.height)) * _this.innerP.scrollTop / (_this.innerP.scrollHeight - _this.innerP.clientHeight) + '%';
          //call the event handler 
          if ('onScrollF' in _this) {
              _this.onScrollF();
          }

      });

      this.setScroll = function(p, d) {
          if (d == undefined || d <= 0) d = 500;
          if (p >= _this.innerP.scrollHeight - _this.innerP.clientHeight){p = _this.innerP.scrollHeight - _this.innerP.clientHeight;};

          var difference = p - _this.innerP.scrollTop;
          var perTick = difference / d * 10;

          setTimeout(function() {
              _this.innerP.scrollTop += perTick;
              if (Math.abs(p - _this.innerP.scrollTop) < 5) return;
              _this.setScroll(p, d - 10);
          }, 10);
      };

       /**
       * Handles the onmousedown event on the scrollbar holder
       * @param e the event
       */
      this.scrollBarHolder.onmousedown = function(e) {
          if (e.target != this) return;
          var relPos = (e.pageY - _this.scrollBarHolder.getBoundingClientRect().top) * 100 / _this.scrollBarHolder.clientHeight;
          _this.setScroll(_this.innerP.scrollHeight * relPos / 100, _this.scrollSpeed);
      };

      /**
       * Handles the onmousedown event on the scrollbar
       * @param e the event
       */
      this.scrollBar.onmousedown = function(e) {
          _this.mdown = true;
          _this.posCorrection = e.pageY - _this.scrollBar.getBoundingClientRect().top;
          _this.btmCorrection = _this.scrollBar.clientHeight * 100 / _this.outerP.clientHeight;
          return false;
      };

      /**
       * Handles the onmouseup event on the wrapper container
       * @param e the event
       */
      this.origP.onmouseup = function() {
          _this.mdown = false;
      };

      /**
       * Handles the onmousemove event on the wrapper container
       * @param e the event
       */
      this.origP.onmousemove = function(e) {
          if (_this.mdown) {
              if (document.selection) {
                  document.selection.empty();
              } else {
                  window.getSelection().removeAllRanges();
              }
              _this.relY = e.pageY - _this.outerP.getBoundingClientRect().top;
              _this.pC = (_this.relY - _this.posCorrection) * 100 / _this.outerP.clientHeight;
              if (_this.pC >= 0 && (_this.pC + _this.btmCorrection) <= 100) {
                  _this.scrollBar.style.top = _this.pC + '%';
                  _this.innerP.scrollTop = (parseFloat(_this.scrollBar.style.top) - (_this.sbHeight - parseFloat(_this.sBStyle.height)) * _this.innerP.scrollTop / (_this.innerP.scrollHeight - _this.innerP.clientHeight)) * _this.innerP.scrollHeight / 100;
              } else {
                  if (_this.pC < 0 && parseFloat(_this.scrollBar.style.top) > 0) {
                      _this.scrollBar.style.top = '0%';
                      _this.innerP.scrollTop = 0;
                  }
              }
              //call the event Handler
              if ('onScrollF' in _this) {
                  _this.onScrollF();
              }
          } else {
              return false;
          }
      };

      this.refresh = function() {
          _this.sbHeight = _this.innerP.clientHeight * 100 / _this.innerP.scrollHeight;
          if (_this.sbHeight >= 100) {
              _this.scrollBarHolder.style.display = 'none';
          } else {
              _this.scrollBarHolder.style.display = 'block';
          }
          _this.sbHeight = this.innerP.clientHeight * 100 / this.innerP.scrollHeight;
          _this.sBStyle['height'] = _this.customHeight ? _this.sBStyle['height'] : _this.sbHeight + '%';
          if (_this.innerP.scrollHeight > _this.innerP.clientHeight) {
              _this.scrollBar.style.height = _this.sBStyle.height;
          }
      };

      this.refresh();
      
      /**
       * Set the style of the Scrollbar
       * @param {*} pScrollBar the object with style for the scrollbar
       * @param {*} pSBHolder the object with style for the scrollbar-holder
       */
      this.setStyle = function(pScrollBar, pSBHolder) {
          if (pScrollBar != undefined) {
              pScrollBar['width'] = _this.scrollBarWidth;
              if ('height' in pScrollBar) {
                _this.customHeight = true;
                  pScrollBar['height'] = (parseFloat(pScrollBar['height']) * 100 / _this.outerP.clientHeight) + '%';
              }
              for (var x in pScrollBar) {
                  _this.sBStyle[x] = pScrollBar[x];
                  _this.scrollBar.style[x] = pScrollBar[x];
              }
          }
          if (pSBHolder != undefined) {
              pSBHolder['width'] = _this.scrollBarWidth;
              for (var x in pSBHolder) {
                  _this.sBHStyle[x] = pSBHolder[x];
                  _this.scrollBarHolder.style[x] = pSBHolder[x];
              }
          }
          //we return this so we can add styles easely
          return _this;
      };
    }; // end the init function

    this.destroy = function(){
      _this.origP.innerHTML = _this.parContent;
      _this.origP.style.overflow = 'auto';
      _this.init = null;
    };

    /**
     * Check if the browser is Internet Explorer
     * @return true if it is IE
     */
    function isIE () {
      var myNav = navigator.userAgent.toLowerCase();
      return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
    }

    if (!isIE() || (isIE() && isIE() < 9)){
        _this.init();
    }
};


		

	 


	return {
	    	scroll: SalvaScroll
		

	};
 });