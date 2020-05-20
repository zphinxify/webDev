
var page = document.getElementById("content");
ShowLoginOrLoggedIn();

var showMovies = document.getElementById("movieButton");

showMovies.addEventListener("click", function () {

    printMovieList();

})

var addNewMovie = document.getElementById("addMovie");

addNewMovie.addEventListener("click", function () {
    insertDataNewMovie();
})

//AddMovie("Something elsawde", 12)
function AddMovie(name, stock) {
    var actualStock = stock;
    var stringName = name.toString();
    var intStock = parseInt(actualStock);
   

    fetch('https://localhost:44361/api/film', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({stock:intStock, name:stringName}),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.log('Error:', error);
        });
}

function ShowLoginOrLoggedIn() {

    if (localStorage.UserName != null) {
        LoggedIn();


    }
    else {
        ShowLogin();

    }
}



function printMovieList() {

    fetch("https://localhost:44361/api/Film")
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            console.log("printMovieList", json);

            for (i = 0; i < json.length; i++) {
                console.log(json[i].name)
                movieList.insertAdjacentHTML("beforeend", "<div class='movieDiv'> + <p> Title: " + json[i].name + " | Stock: " + json[i].stock + " </p> <button class='button' id='rentMovie1' onclick='RentMovie(" + json[i].id + ");' >Rent Movie</button> <button class='button' id='addTrivia1' onclick='addTrivia(" + json[i].id + ");' >Add new trivia</button></div>");
            }
        });
};

function rentMovie (FilmId) {

    fetch('https://localhost:44361/api/RentedFilm', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({FilmId:movieId, Trivia:trivia}),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.log('Error:', error);
        });


}

async function Login() {
    let user, password = "";
    userName = document.getElementById("username").value;
    pw = document.getElementById("pw").value

    try {
        const response = await fetch("https://localhost:44361/api/filmstudio");
        const data = await response.json();

        data.forEach(user => {
            if (user.password == pw && user.name == userName) {
                localStorage.UserName = user.name;
                localStorage.UserId = user.id;
            }
        });
        if (localStorage.UserName == null) {
            alert("Incorrect login")
        }
    } catch (error) {
        console.log(error);
    }
    location.reload();
    ShowLoginOrLoggedIn();
}

function sendTrivia(FilmId, Trivia) {

    var trivia = Trivia.toString();
    var id = FilmId;

    var movieId = parseInt(id);

    fetch('https://localhost:44361/api/FilmTrivia', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({FilmId:movieId, Trivia:trivia}),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.log('Error:', error);
        });
};


function insertDataNewMovie() {
    page.innerHTML = "";
    page.insertAdjacentHTML("afterend", 'Name: <input type="text" id="movieName"> Stock: <input type="text" id="stock"> <button id="postNewMovie">Add Movie</button> ')

    var addNewMovie = document.getElementById("postNewMovie");
    addNewMovie.addEventListener("click", function () {
        name = document.getElementById("movieName").value;
    stock = document.getElementById("stock").value
        AddMovie(name, stock);
    })
}


function addTrivia() {
    page.innerHTML = "";
    page.insertAdjacentHTML("afterbegin", 'Name: <input type="text" id="trivia"> MovieID: <input type="text" id="movieId"> <button id="submitTrivia">Submit Trivia</button> ')
    page.insertAdjacentHTML("beforeend", '<button id="WelcomepageId">Gå till Welcome Page</button>')

    var triviaButton = document.getElementById("submitTrivia");

    triviaButton.addEventListener("click", function () {
        id = document.getElementById("movieId").value;
        trivia = document.getElementById("trivia").value;
        sendTrivia(id, trivia);
    })
}


function showRegisterNewFilmstudio() {
    page.innerHTML = "";
    page.insertAdjacentHTML("afterbegin", 'Användarnamn: <input type="text" id="FilmstudioNamnId"> Lösenord: <input type="password" id="FilmstudioPasswordId"> <button id="SaveFilmstudioId">Save User</button> ')
    page.insertAdjacentHTML("beforeend", '<button id="WelcomepageId">Gå till Welcome Page</button>')

    var welcomePageButton = document.getElementById("WelcomepageId");

    welcomePageButton.addEventListener("click", function () {

        LoggedIn();

    })

    var RegistreraKnapp = document.getElementById("SaveFilmstudioId");

    RegistreraKnapp.addEventListener("click", function () {

        var usernameForNewMoviestudio = document.getElementById("FilmstudioNamnId").value;
        var pwForNewMoviestudio = document.getElementById("FilmstudioPasswordId").value;

        addMovieStudio(usernameForNewMoviestudio, pwForNewMoviestudio);

    })
}

function addMovieStudio(name, password) {

    var data = { name: name, password: password };

    fetch('https://localhost:44361/api/FilmStudio', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);

        })
        .catch((error) => {
            console.log('Error:', error);
        });
};

function ShowLogin() {
    const loginDiv = document.getElementById("login");

    var signUpButton = document.getElementById("signUp");

    signUpButton.addEventListener("click", function () {

        showRegisterNewFilmstudio();

    })


    loginDiv.innerHTML =
        '<div class="login-container">' +
        '<div id="modal-register" class="modal">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<span class="close">&times;</span>' +
        `<h2>Register account</h2>` +
        '</div>' +
        '<div id="modal-body-register" class="modal-body">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<input type="text" placeholder="Username" id="username">' +
        '<input type="password" placeholder="Password" id="pw">' +
        '<button type="submit" onclick="Login()">Login</button>' +
        '</div>';
}

function LoggedIn() {
    const loginDiv = document.getElementById("login");
    userName = localStorage.UserName;
    loginDiv.innerHTML = '<div class="login-container">' +
        '<button type="submit" onclick="Logout()">Logout</button>' +
        `<p>Hello ${userName}</p>` +
        '</div>';
}

async function Logout() {
    localStorage.clear();
    location.reload();
    ShowLogin();
}







