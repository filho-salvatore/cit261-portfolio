/**
 * TOPIC 06 DOM
 * 
 */


document.getElementById("showDOM").addEventListener("click", function() {
    document.getElementById("result").innerHTML ="";
    document.getElementById("result").innerHTML = showDOMTree(nodeTree);
});
/**
 *  Show Node Tree from the some point
 */
document.getElementById("show_DOM_TREE_Element").addEventListener("click", function() {
    document.getElementById("result").innerHTML ="";
    var elementTree = null;
    let startElement = document.getElementById("startPointInTree").value;
    let element  = document.getElementsByTagName(startElement);
    for (let i = 0; i < element.length; i++) {
        elementTree = getNodeTree(element[i]);
        document.getElementById("result").innerHTML += showDOMTree(elementTree);
    }
});


 

/**
 * Create the DOM tree in the nodeTree Variable
 */
var nodeTree = getNodeTree(document.documentElement);


function getNodeTree(node) {
    if (node.hasChildNodes()) {
        var children = [];
        for (var j = 0; j < node.childNodes.length; j++) {
            children.push(getNodeTree(node.childNodes[j]));
        }

        return {
            nodeName: node.nodeName,
            parentName: node.parentNode.nodeName,
            children: children,
            content: node.innerText || "",
        };
    }

    return false;
}

function showDOMTree(node) {
	if (!node) return "";
    
    var txt = "";
	
    if (node.children.length > 0) {
        txt += "<ul><li><b>Node:</b> " + node.nodeName + "</li>";
        txt += "<li> <b>Parent:</b> " + node.parentName + "</li>";
        txt += "<li><b>Content:</b> " + node.content + "</li>";
        for (var i = 0; i < node.children.length; i++)
        	if (node.children[i])
            	txt += "<li> <b>Children:</b> " + showDOMTree(node.children[i]) + "</li>";
        txt += "</ul>";
    }/*else{
        txt += "<ul><li>Nodo: " + node.nodeName + "</li>";
        txt += "<li> Padre: " + node.parentNode.nodeName + "</li>";
        txt += "<li>Contenido: " + node.content + "</li>";
    }*/

    return txt;
}



/**
 * clear the results division
 */
function clearResults(){
    document.getElementById("result").innerHTML = "";
}