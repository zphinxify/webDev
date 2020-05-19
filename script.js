var userName = "movie";
var password = "test";


var page = document.getElementById("content");

if (localStorage.getItem("userId") !== "null") {
    greetUser();
}
else {
    showLoginPage();
}

function greetUser() {
    page.innerHTML = "Welcome, master!";
    page.insertAdjacentHTML("beforeend", "<div><button id='logoutButton'>Log out</button></div>");

    var logoutButton = document.getElementById("logoutButton");

    logoutButton.addEventListener("click", function () {
        // console.log("this happend");
        localStorage.removeItem("userId");
        showLoginPage();
    });

}

function showErrorPage() {
    page.insertAdjacentHTML("afterbegin", "<div>Forgot your password?</div>");
}


function showLoginPage(userName,password) {
    page.innerHTML = "";
    page.insertAdjacentHTML("afterbegin", 'username: <input type="text" id="userInput"> password: <input type="password" id="userPassword"> <button id="loginButton">Login</button> ')
    var loginButton = document.getElementById("loginButton");

    loginButton.addEventListener("click", function () {

        var getUser = document.getElementById("userInput").value;
        var getPassword = document.getElementById("userPassword").value;

        if (getUser == userName && getPassword == password) {
            localStorage.setItem("userId", getUser)
            console.log(localStorage.getItem("userId"));
            greetUser();
        }
        else {
            console.log("we not aight");
            showErrorPage();
        }

    });
}




