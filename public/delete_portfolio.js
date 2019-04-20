'use strict';

var selectAll1 = document.getElementById("selectAll1");
selectAll1.addEventListener("click", function() {

    // Get all the checkboxes
    var checkboxes1 = document.getElementsByClassName("checkbox1");

    // Set each of their :checked: property to be true
    for(var i = 0; i < checkboxes1.length; i++) {
        checkboxes1[i].checked = true;
    }

});


var clearAll1 = document.getElementById("clearAll1");
clearAll1.addEventListener("click", function() {

    // Get all the checkboxes
    var checkboxes1 = document.getElementsByClassName("checkbox1");

    // Set each of their :checked: property to be false
    for(var i = 0; i < checkboxes1.length; i++) {
        checkboxes1[i].checked = false;
    }

});


var deleteBtn1 = document.getElementById("deleteBtn1");
deleteBtn1.addEventListener("click", function() {

    var itemsToBeDeleted = [];

    // Get all the checkboxes
    var checkboxes1 = document.getElementsByClassName("checkbox1");
    for(var i = 0; i < checkboxes1.length; i++) {

        if(checkboxes1[i].checked == true) {
            itemsToBeDeleted.push( checkboxes1[i].value );
        }

    }

    if(itemsToBeDeleted.length == 0) {
        alert("Please select atleast one name to delete.");
        return;
    }


    var confirmation = confirm("Are you sure");
    if(confirmation == false) {
        return;
    }


    var request = new XMLHttpRequest();
    request.open("delete", "/delete-portfolio");

    var data = {
        itemsToBeDeleted: itemsToBeDeleted
    };

    // Set the correct header type
    request.setRequestHeader("Content-Type", "application/json");
    request.send( JSON.stringify(data) );

    request.onreadystatechange = function() {

        if(request.readyState == 4) {
            window.location.href = "/virtualpage";
        }

    };

});