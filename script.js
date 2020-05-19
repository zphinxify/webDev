
var page = document.getElementById("content");

if (localStorage.getItem("userId") !== "null") {
    greetUser();
}
else {
    showLoginPage();
}

function greetUser() {
    page.innerHTML = "";
    var print = "Greetings, ";


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


function showLoginPage() {
    page.innerHTML = "";
    page.insertAdjacentHTML("afterbegin", 'username: <input type="text" id="userLogin"> password: <input type="password" id="userPassword"> <button id="loginButton">Login</button> ')
    var loginButton = document.getElementById("loginButton");

    loginButton.addEventListener("click", function () {

        var getUser = document.getElementById("userLogin").value;
        var getPassword = document.getElementById("userPassword").value;

        fetch("users.json")
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {

                for(i=0; i<json.length; i++)
                {
                    if (getUser == json[i].userLogin && getPassword == json[i].userPassword) {
                        localStorage.setItem("userId", getUser)
                        console.log(localStorage.getItem("userId"));
                        greetUser();
                        console.log("SKRRRRR");
                    }
                    else {
                        console.log("we not aight");
                        showErrorPage();
                    }
                }
            });
    });
}




