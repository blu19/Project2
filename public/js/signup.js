$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    console.log("hello")
    $.post("/signup", {
      user_name: "username",
      email: email,
      password: password,
      user_dob: "1999-01-01",
    })
      .then(function(data) {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(function(err){
        console.log("in the .catch++++++++++++")
        console.log(err)
        handleLoginErr(err)})
  }

  function handleLoginErr(err) {
    console.log("in the handleLoginErr")
    console.log(err.responseJSON)
    let alertMessage;
    for (let index = 0; index < err.responseJSON.errors.length; index++) {
      alertMessage = alertMessage + " " + err.responseJSON.errors[index].message;
    }
    $("#alert .msg").text(alertMessage);
    $("#alert").fadeIn(500);
  }
});

