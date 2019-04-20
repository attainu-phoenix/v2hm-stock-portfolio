'use strict';

var selectAll2 = document.getElementById("selectAll2");
selectAll2.addEventListener("click", function() {

    // Get all the checkboxes
    var checkboxes2 = document.getElementsByClassName("checkbox2");

    // Set each of their :checked: property to be true
    for(var i = 0; i < checkboxes2.length; i++) {
        checkboxes2[i].checked = true;
    }

});


var clearAll2 = document.getElementById("clearAll2");
clearAll2.addEventListener("click", function() {

    // Get all the checkboxes
    var checkboxes2 = document.getElementsByClassName("checkbox2");

    // Set each of their :checked: property to be false
    for(var i = 0; i < checkboxes2.length; i++) {
        checkboxes2[i].checked = false;
    }

});


var deleteBtn2 = document.getElementById("deleteBtn2");
deleteBtn2.addEventListener("click", function() {

    var itemsToBeDeleted2 = [];

    // Get all the checkboxes
    var checkboxes2 = document.getElementsByClassName("checkbox2");
    for(var i = 0; i < checkboxes2.length; i++) {

        if(checkboxes2[i].checked == true) {
            itemsToBeDeleted2.push( checkboxes2[i].value );
        }

    }

    if(itemsToBeDeleted2.length == 0) {
        alert("Please select atleast one name to delete.");
        return;
    }


    var confirmation = confirm("Are you sure");
    if(confirmation == false) {
        return;
    }


    var request = new XMLHttpRequest();
    request.open("delete", "/delete-watchlist");

    var data = {
        itemsToBeDeleted2: itemsToBeDeleted2
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