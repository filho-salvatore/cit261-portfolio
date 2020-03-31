/*
const carouselContainer = document.querySelector('.carousel-container');
const listImageArea = carouselContainer.querySelector('.inner-scroller');
const listOfImages = listImageArea.querySelectorAll('img');
const currentImage = carouselContainer.querySelector('.current-image');

const arrowLeft = carouselContainer.querySelector('.arrow-left');
const arrowRight = carouselContainer.querySelector('.arrow-right');
*/









window.addEventListener('resize', function(e) {
  //  myCar.styleList();
});




 define(['salvaQuery','./classes','./displayRoutines','./displayRoutexer'], function ($,datacontrol,disp,routExer) {
    //var $ = require('./js/salvaQuery.js');
    $('#initButton').evlOn('click', function( ){
		datacontrol.dataControl.init();
        disp.fillRoutines(disp.disPlay);
       
    });

    $('#addWorkoutButton').evlOn('click', function( ){
        disp.clearSelectedRoutine(disp.disPlay);
        window.open('page2.html', '_blank'); 
    });
    $('#editWorkoutButton').evlOn('click', function( ){
        disp.saveSelectedRoutine(disp.disPlay);
        window.open('page2.html', '_blank'); 
    });
    $('#deleteWorkoutButton').evlOn('click', function( ){
        let deletion = confirm("Are you sure you want to delete?");
        if (deletion ) disp.removeSelectedRoutine(disp.disPlay);
        
    });
    $('#removeExerciseButton').evlOn('click',function() {
        let deletion = confirm("Are you sure you want to delete?");
        if (deletion ) routExer.removeSelected();
    });
    /*
    addWorkoutButton
    */

    const DataControl = datacontrol.dataControl;
    const addExercise = routExer.addExercisesToWorkout;
    // ========= START CARROUSELL =========
    class Carrousell {


        constructor (
            pWidth = 500,
            pHeight = 400,
            pNavHeight = 80,
            pCarouselContainer = '.carousel-container',
            pListImageArea = '.inner-scroller',
            //pListOfImages = 'img',
            pCurrentImage = '.current-image',
            pArrowLeft = '.arrow-left',
            pArrowRight = '.arrow-right'
        ){
            // change css variables
            document.documentElement.style.setProperty(`--box-widht`, pWidth+'px');
            document.documentElement.style.setProperty(`--box-height`, pHeight+'px');
            document.documentElement.style.setProperty(`--nav-height`, pNavHeight+'px');
            this.CurrentImageClass = '.current-image';
            this.carouselContainer =$(pCarouselContainer).element;
            this.listImageArea = $(pListImageArea).element;
            this.myListImageArea = $(pListImageArea); //the ul container for the image list
            this.listOfImages = null;
            this.imagesFromREST = null;
            this.currentImage = $(pCurrentImage).element;
            this.myCurrentImage = $(pCurrentImage);
            this.arrowLeft = $(pArrowLeft).element;
        
            this.arrowRight = $(pArrowRight).element;
            this.mySelect = $('#sel_images');
        
            //tags
            this.myCurrentImageListTAG = '.current-image-list';
            this.mycurrentImageStyleClass = 'current-image-list'; //is the current image of the list. parent is inner-scroller
            this.mySlideStyleClassRight = 'slideInFromRight'; //is the animation right
            this.mySlideStyleClassLeft = 'slideInFromLeft'; //is the animation left
            
            //events 
            $(pArrowLeft).evlOn('click',this.goToLeft.bind(this));
            $(pArrowRight).evlOn('click', this.goToRight.bind(this));
            if(this.listOfImages) {
                Array.prototype.forEach.call(this.listOfImages, (image) =>{
                    image.addEventListener('click', this.changeCurrentImage.bind(this));
                });
            }
            // event to button get exercises
            let buttonGet = $('#getExercises');
            buttonGet.evlOn('click', this.getExercisesFromStorage.bind(this));

            //event to button addExercises to workout
            
            let buttonAddToWorkout = $('#addExercises');
            buttonAddToWorkout.evlOn('click', addExercise.bind(this));

            //add events to control select change and img change
            //this.mySelect.evlOn('change', this.onSelectChange.bind(this));
            
           let oSelect =  $('#sel_images');
           oSelect.evlOn('change', this.onSelectChange.bind(this));
           
            
        
            //add the images to the select
            //this.addimagesToSelect();
        
            this.styleList();
            return this;
        }
        


        /**
         * Get the Exercise list from the local storage.
         * This list of exercises was made by a fetch in the REST API and stored in the storage.
         * Get the exercise image names from the REST API
         */
        getExercisesFromStorage() {
            
            //alert("got");
           
            const myDataControl = DataControl.retrieveThis();
            const myExerciseList = DataControl.getExercises();
            const myImgList= [];
            const theEnd = myExerciseList.length;
            let cont = 0;
            myExerciseList.forEach((exercise) => {
            
            const endpoint = `https://gymeasy.herokuapp.com/medias?filter[id_exercise]=${exercise.ID}&filter[type]=record_image`               ;
            const myToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJsZXZlbCI6ImV4cGVydCIsInVzZXJuYW1lIjoiYWRtaW4iLCJpZCI6IjUzYjBlYzY0LTUwNGItMTFlYS1iOWM5LTIyMDAwYWVmNGUwYiIsImlhdCI6MTU4MjMwMDg5MCwiZXhwIjoxNTgyMzA0NDkwfQ.HQGPNm_YSqpVUmJTrs2gulD2e5PYZSuye4-4qMh0Fk8';
        
            const myHeaders = new Headers({
                'Authorization': myToken,
                'Content-Type': 'application/x-www-form-urlencoded'
            });
        
            fetch(endpoint, {
                headers: myHeaders,
                method: 'GET'
            }).then(response => {
                return response.json();
            })
            .then((blob)=> {
                cont ++;
                 //console.log(blob);
                 if(blob.data && Array.isArray(blob.data) && blob.data.length > 0) {
                    myImgList.push(blob.data[0]);
                  
                 }
                 if(cont === theEnd){
                    this.imagesFromREST = myImgList;
                    this.addElements(myImgList);
                }
            });
            
            });
            
            
               

        }

       
        
        addimagesToSelect() {
            if(this.listOfImages) {

                for (let i = 0; i< this.listOfImages.length; i++){
                    var opt = document.createElement('option');
                    let mySrc = this.listOfImages[i].src;
                    let myImgName = mySrc.replace(/^.*[\\\/]/, '');
                    if(this.imagesFromREST) {
                        let found = this.imagesFromREST.find(p => p.link ==  myImgName);
                        if (found) {
                            opt.value =found.id_exercise;
                        } else {
                            opt.value = i;
                        }
                    } else {
                        opt.value = i; 
                    }

                    
                    let splitted = mySrc.split('/');
                    let fileName = splitted[splitted.length-1];
                    opt.innerHTML =fileName;
            
                    this.mySelect.domAppend(opt);
                }
            }
        }
            styleList() {
                
                const mylistImageArea = $('.inner-scroller');
                if (mylistImageArea.element.scrollWidth == mylistImageArea.domGetProp('offsetWidth')) {
                    mylistImageArea.cssSetProp('justifyContent','center');
                } else {
                    mylistImageArea.cssSetProp('justifyContent','flex-start');
                }
            }
        
            onSelectChange() {
                //the val is the id of the exercise
                let theSelect = $('#sel_images');
                let SelImageName = theSelect.element[0].options[theSelect.element[0].selectedIndex].text;
                
                if (SelImageName) {
                    //get the exercise
                    let found = this.listOfImages.find((imag) => {
                        let imagename =  imag.src.replace(/^.*[\\\/]/, '');
                        return (imagename == SelImageName);
                    });
                    //let mynewImage = this.listOfImages[Number(val)];
                    //call change image
                    if(found) {
                    this.changeCurrentImage(found);
                    }
                    //console.log('select chaged');
                }   
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
        
            scrollDiv(dir, px) {
                var scroller = document.getElementById('outer-scroller');
                if (dir == 'l') {
                    scroller.scrollLeft -= px;
                }
                else if (dir == 'r') {
                    scroller.scrollLeft += px;
                }
            }
            applyAnimation(current){
                const mylistImageArea = this.myListImageArea; // <ul> '.inner-scroller'
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
                let imageName;
                let theImageList = this.imagesFromREST;
                
                if ((pNewImage instanceof HTMLElement)) {
                    index = this.getImageIndex(pNewImage.src);
                    imageName = pNewImage.src.replace(/^.*[\\\/]/, '');
                }else {
                    index = this.getImageIndex(pNewImage.element.src);
                    imageName = pNewImage.element.src.replace(/^.*[\\\/]/, '');
                }

                let found = theImageList.find(p => p.link == imageName);
                index =found.id_exercise;
                if(index >= 0) {
                            
                    
                    var opts = this.mySelect.element[0].options;
                    let arrayOpt = Array.from(this.mySelect.element[0].options);
                    let found = arrayOpt.find((element) => element.value == index);
                    if (found) {
                        this.mySelect.element[0].selectedIndex =found.index;
                    }
            }
            }
        
            /**
             * Add images to the image List
             * @param {*} pImages The array of images
             */
            addElements(pImages){
                if (!pImages || !Array.isArray(pImages)) {
                    return;
                }
                let found = null;
                // only add if it is not there already
                const myImages =[];
                
                    pImages.forEach((item,index) => {
                        let myImgName = item.link.replace(/^.*[\\\/]/, '');
                        //only add new images
                        if (this.listOfImages) {
                            found = this.listOfImages.find((imag) => {
                                let imagename =  imag.src.replace(/^.*[\\\/]/, '');
                                return (imagename == myImgName);
                            });
                            
                        }
                        if(!found) {
                            //update the current image (the selected one)
                            if(index == 0) {
                                let curImg = document.getElementById('carousel-container');  
                                var curImage = document.createElement('img');
                                curImg.appendChild(curImage);
                                curImage.src = './img/'+item.link;
                                curImage.classList.add('current-image');
                            }

                            var entry = document.createElement('li');
                            var image = document.createElement('img');
                            image.src = './img/'+item.link;
                            image.classList.add('image-of-list');
                            image.addEventListener('click', this.changeCurrentImage.bind(this));
                            myImages.push(image);
                            entry.appendChild(image);
                            //apend the new image to the inner scroller
                            let list = document.getElementById('imageList');
                            list.appendChild(entry);
                        }
            
                    });
                    if(!found) {
                        this.listOfImages =  myImages;
                        //img 0 is the current image
                        this.listOfImages[1].scrollLeft=0;
                        this.changeCurrentImage(this.listOfImages[1]);
                        this.addimagesToSelect();      
                    }
            }
        
        }


        

    // ==========END CARROUSELL ============
    return {
        list: new Carrousell(230,150,50)
    };
});