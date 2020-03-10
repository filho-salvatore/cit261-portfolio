/*
const carouselContainer = document.querySelector('.carousel-container');
const listImageArea = carouselContainer.querySelector('.next-list');
const listOfImages = listImageArea.querySelectorAll('img');
const currentImage = carouselContainer.querySelector('.current-image');

const arrowLeft = carouselContainer.querySelector('.arrow-left');
const arrowRight = carouselContainer.querySelector('.arrow-right');
*/

class Carrousell {


constructor (
    pWidth = 500,
    pHeight = 400,
    pCarouselContainer = '.carousel-container',
    pListImageArea = '.next-list',
    pListOfImages = 'img',
    pCurrentImage = '.current-image',
    pArrowLeft = '.arrow-left',
    pArrowRight = '.arrow-right'
){
    // change css variables
    document.documentElement.style.setProperty(`--box-widht`, pWidth+'px');
    document.documentElement.style.setProperty(`--box-height`, pHeight+'px');
    this.CurrentImageClass = '.current-image';
    this.carouselContainer =$(pCarouselContainer).element;
    this.listImageArea = $(pListImageArea).element;
    this.myListImageArea = $(pListImageArea);
    this.listOfImages = $(pListOfImages).element;
    this.currentImage = $(pCurrentImage).element;
    this.myCurrentImage = $(pCurrentImage);
    this.arrowLeft = $(pArrowLeft).element;

    this.arrowRight = $(pArrowRight).element;
    this.mySelect = $('#sel_images');

    //tags
    this.myCurrentImageListTAG = '.current-image-list';
    this.mycurrentImageStyleClass = 'current-image-list'; //is the current image of the list. parent is next-list
    this.mySlideStyleClassRight = 'slideInFromRight'; //is the animation right
    this.mySlideStyleClassLeft = 'slideInFromLeft'; //is the animation left
    this.mySelect = $('#sel_images');
    //events 
    $(pArrowLeft).evlOn('click',this.goToLeft.bind(this));
    $(pArrowRight).evlOn('click', this.goToRight.bind(this));
    Array.prototype.forEach.call(this.listOfImages, (image) =>{
        image.addEventListener('click', this.changeCurrentImage.bind(this));
    });
    
    //add events to control select change and img change
    //this.mySelect.evlOn('change', this.onSelectChange.bind(this));
   let oSelect = document.getElementById('sel_images');
   oSelect.addEventListener(
    'change',
    this.onSelectChange.bind(this),
    false
  );

    

    //add the images to the select
    this.addimagesToSelect();

    this.styleList();
    
}

addimagesToSelect() {
    for (let i = 0; i< this.listOfImages.length; i++){
        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML =this.listOfImages[i].src;
        this.mySelect.domAppend(opt);
    }
}
    styleList() {
        
        const mylistImageArea = $('.next-list');
        if (mylistImageArea.element.scrollWidth == mylistImageArea.domGetProp('offsetWidth')) {
            mylistImageArea.cssSetProp('justifyContent','center');
        } else {
            mylistImageArea.cssSetProp('justifyContent','flex-start');
        }
    }

    onSelectChange() {
        let val = this.mySelect.domVal();
        //get the element
        let mynewImage = this.listOfImages[Number(val)];
        //call change image
        this.changeCurrentImage(mynewImage);

        //console.log('select chaged');
    }

    goToRight() {
        let myCurrent = $(this.myCurrentImageListTAG);
        if(myCurrent.element) {
            let parent = $(this.myCurrentImageListTAG).domParent(); //is <li>
            let nextSibling = parent.domNext(); //is the next <li>
            if(nextSibling.element) { 
                let nextImage = nextSibling.domChildren(0);
                nextImage.classAdd(this.mycurrentImageStyleClass);
                myCurrent.classRemove(this.mycurrentImageStyleClass);
                let current = $(this.myCurrentImageListTAG); //current now is the new image
                this.changeSelect(current);
                this.applyAnimation(current);
                
            }
        }
    }

    applyAnimation(current){
        const mylistImageArea = this.myListImageArea; // <ul>
        const myCurrentImage = $(this.CurrentImageClass);
        
        if(current.element) {
            // The offsetLeft property returns the left position (in pixels) 
            // relative to the left side the offsetParent element.
            // The scrollLeft property sets or returns the number of pixels 
            // an element's content is scrolled horizontally.
            let myLeftOffSet = current.domGetProp('offsetLeft');
            mylistImageArea.domSetProp('scrollLeft', myLeftOffSet - 50); //50 is the width of th arrow division + paddings
            let myNewSrc = current.domGetAttr('src').value;
            myCurrentImage.domSetAttr('src',myNewSrc);
            myCurrentImage.classAdd(this.mySlideStyleClassRight); //apply the animation
            setTimeout(function() {
                myCurrentImage.classRemove(this.mySlideStyleClassRight); //remove the animation
            }, 50);
        }

    }
    goToLeft() {
        let myCurrent = $(this.myCurrentImageListTAG);
        if(myCurrent.element) {
            let parent = $(this.myCurrentImageListTAG).domParent(); //is <li>
            let prevSibling = parent.domPrevious(); //is the prev li
            
            if(prevSibling.element) {
                //current.parentElement.previousElementSibling.children[0].classList.add(this.mycurrentImageStyleClass);
                //current.classList.remove(this.mycurrentImageStyleClass);
                //the new image iwill be now the current
                let nextImage = prevSibling.domChildren(0);
                nextImage.classAdd(this.mycurrentImageStyleClass);
                myCurrent.classRemove(this.mycurrentImageStyleClass);
                let current = $(this.myCurrentImageListTAG); //current now is the new image
                this.changeSelect(current);
                
                this.applyAnimation(current);
            }
        }
    }

    getImageIndex(pValue){
        let theIndex =null;
        let find = this.listOfImages.find((item, index) => { 
            if (index == 0) return false; //zero is always the current image
            if (item.src == pValue) {
                theIndex = index;
                return true;
            }
        });
        return theIndex;
    }
    /**
     * 
     * @param {*} newImage the event corry with it the context of the caller
     */
    changeCurrentImage(newImage) {
        let myImage;
        let changeSelect = false;
        if ((newImage instanceof HTMLElement)) {
            myImage = newImage;
        }else {
            myImage = newImage.currentTarget;
            changeSelect = true;
        }
        const myCurrentImage = $('.current-image');
        const myListOfImages =  $('img').element;

        myCurrentImage.classAdd('fadeIn');
        setTimeout(function() {
            myCurrentImage.classRemove('fadeIn');
        }, 50);
        let myNewSrc =  myImage.attributes.src.value;
        myCurrentImage.domSetAttr('src',myNewSrc);
        Array.prototype.forEach.call(myListOfImages, function(image) {
            image.classList.remove('current-image-list');
        });
        myImage.classList.add('current-image-list');
        if (changeSelect) {
            this.changeSelect(myImage);
        }
    }

    changeSelect(pNewImage) {
        let index = -1;
        if ((pNewImage instanceof HTMLElement)) {
            index = this.getImageIndex(pNewImage.src);
        }else {
            index = this.getImageIndex(pNewImage.element.src);
        }
        if(index >= 0) {
                    
            
            var opts = this.mySelect.element[0].options;
            let arrayOpt = Array.from(this.mySelect.element[0].options);
            let found = arrayOpt.find((element) => element.value == index);
            if (found) {
                this.mySelect.element[0].selectedIndex = found.value;
            }
    }
    }

    addElements(pImages){
        if (!pImages || !Array.isArray(pImages)) {
            return;
        }
        pImages.forEach((item,index) => {
            if(index == 0) {
                let curImg = document.getElementById('carousel-container');  
                var curImage = document.createElement('img');
                curImg.appendChild(curImage);
                curImage.src = item;
                curImage.classList.add('current-image');
            }
            var entry = document.createElement('li');
            var image = document.createElement('img');
            image.src = item;
            image.classList.add('image-of-list');
            image.addEventListener('click', this.changeCurrentImage.bind(this));
            entry.appendChild(image);
            let list = document.getElementById('imageList');
            list.appendChild(entry);


        });

        this.listOfImages =  $('img').element;
        //img 0 is the current image
        this.listOfImages[1].scrollLeft=0;
        this.changeCurrentImage(this.listOfImages[1]);
        this.addimagesToSelect();      
    }

}


myCar = new Carrousell(
    500,
    300
);
//alt="" current-image-list
let imageList = [
    "./photo_1.png",
    "./photo_2.png",
    "./photo_3.png",
    "./photo_4.png",
    "./photo_5.png",
    "./photo_6.png",
    "./photo_7.png",
    "./photo_8.png",
    "./photo_9.png",
    "./photo_10.png",
    "./photo_11.png",
    "./photo_12.png",
    "./photo_13.png"
]


myCar.addElements(imageList);

window.addEventListener('resize', function(e) {
    myCar.styleList();
});




