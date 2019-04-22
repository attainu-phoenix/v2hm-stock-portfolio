'use strict'

var signupPost = function(request, response) {


   var DB = request.app.locals.DB;

  var name = request.body.name;
  var email = request.body.email;
  var password = request.body.password;
  var confirmPassword = request.body.confirmPassword;


    if (password !== confirmPassword) {
    response.redirect("back")
    return
    }

    DB.collection("userDetails").findOne({ email: email }, function(error, found) {
        if (found) {
            response.redirect("/login")
            return
        }

    else {    var userData = {

                   name: name,
                   email: email,
                   password: password,
                   confirmPassword: confirmPassword
                }
    DB.collection("userDetails").insertOne(userData, function(error){

         if(error){
            response.send("Error signing up please go back to the signup page by clicking on back button in your browser");
         } else {
            response.redirect("/");
        }
    })
}
})
}

exports.signupPost = signupPost;
