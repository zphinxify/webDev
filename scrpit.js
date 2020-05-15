var userName = "movie";
var password = "test";

var loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", function(){

    var getUser = document.getElementById("userInput");
    var getPassword = document.getElementById("userPassword");

        if (getUser == userName && getPassword == password)
        {
            console.log("we aight");
        }
        else
        {
            console.log("we not aight");
        }
});