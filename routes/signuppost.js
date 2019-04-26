'use strict'

var signupPost = function(request, response) {


   var DB = request.app.locals.DB;

  var name = request.body.name;
  var email = request.body.email;
  var password = request.body.password;
  var confirmPassword = request.body.confirmPassword;


    if (password !== confirmPassword) {
    response.redirect("/signup?Error:Password&Retyped-Password-are-Different")
    return
    }

    DB.collection("userDetails").findOne({ email: email }, function(error, found) {
        if (found) {
            response.redirect("/login?You-are-a-registered-User-Please-Login-to-access-Virtual-Portfolio")
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
            response.redirect("/signup?Error:DATABASE-ERROR");
         } else {
            response.redirect("/login?Signup-Sucessful-Please-Login-to-access-Virtual-Portfolio");
        }
    })
}
})
}

exports.signupPost = signupPost;
