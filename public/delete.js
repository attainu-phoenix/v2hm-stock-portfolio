'use strict';

var deleteBtn = document.getElementById("deletebtn");
deleteBtn.addEventListener("click", function(){

    var confirmByUser = confirm("Are you sure you want to delete");

    if(!confirmByUser){
        return;
    }
    alert("Going to Delete");
})