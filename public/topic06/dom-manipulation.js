/**
 * Create and add the remove button to each email in the list
 * 
 */
var myLIlist = document.getElementsByTagName("LI");
var i;

for (i = 0; i < myLIlist.length; i++) {

  let mySpan = document.createElement("SPAN");
  let txt = document.createTextNode("  [\u00D7] ");
  mySpan.className = "remove";
  mySpan.appendChild(txt);
  myLIlist[i].appendChild(mySpan);

}

/**
 *  Click on a remove button to hide the current list item
 */
var remove = document.getElementsByClassName("remove");
var i;

for (i = 0; i < remove.length; i++) {

  remove[i].onclick = function() {

    let parent = this.parentElement;
    parent.style.display = "none";

  };

}


/**
 * Add e-mail to the CC list
 */
function newCCEmail() {

 
  let inputValue = document.getElementById("myCCEmail").value;
  let li = document.createElement("li");
  let text = document.createTextNode(inputValue);

  li.appendChild(text);

  if (inputValue === '') {

    alert("missing the e-mail to add");

  } else {

    document.getElementById("myCC").appendChild(li);

  }

  document.getElementById("myCCEmail").value = "";

  let mySpan = document.createElement("SPAN");
  let txt = document.createTextNode(" [\u00D7] ");
  mySpan.className = "remove";
  mySpan.appendChild(txt);
  li.appendChild(mySpan);

  for (i = 0; i < remove.length; i++) {

    remove[i].onclick = function() {

      let parent = this.parentElement;
      parent.style.display = "none";

    };
  }
}



/**
 * Add e-mail to the CCO list
 */
function newCCOEmail() {

  
  let inputValue = document.getElementById("myCCOEmail").value;
  let li = document.createElement("li");
  let text = document.createTextNode(inputValue);
  li.appendChild(text);

  if (inputValue === '') {

    alert("Missing the e-mail to add!");

  } else {
    document.getElementById("myCCO").appendChild(li);
  }

  document.getElementById("myCCOEmail").value = "";

  let mySpan = document.createElement("SPAN");
  let txt = document.createTextNode(" [\u00D7] ");
  mySpan.className = "remove";
  mySpan.appendChild(txt);
  li.appendChild(mySpan);

  for (i = 0; i < remove.length; i++) {

    remove[i].onclick = function() {

      let parent = this.parentElement;
      parent.style.display = "none";

    };

  }
}

/**
 * pretend to send the e-mail
 */
function sendEmail(){
  alert("email sent!");
}

