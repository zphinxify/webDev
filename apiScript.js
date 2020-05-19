// All code related to API-calls goes here...

var movieList = document.getElementById("movieList");
var registerButton = document.getElementById("registerButton");

registerButton.addEventListener("click", function () {
    studioName = document.getElementById("studioName")
})

// printMovieList();

function printMovieList() {

    fetch("https://localhost:44361/api/Film")
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            console.log("printMovieList", json);

            for (i = 0; i < json.length; i++) {
                console.log(json[i].name)
                movieList.insertAdjacentHTML("beforeend", "<div><p>(" + json[i].id + ")" + json[i].name + "</p></div></div>")
            }
        });
};

 // addMovie("något annat ", 1337);
function addMovie(name, stock) {

    var data = { name: name, stock: stock };

    fetch('https://localhost:44361/api/Film', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            printMovieList();
        })
        .catch((error) => {
            console.log('Error:', error);
        });
};
addStudio("Studioname", "123")
// Adds new studio via POST to the API
// addStudio("a studio", 1234).then(data => console.log(data));
/*async*/ function addStudio(name, password) {

    var data = { name: name, password: password };

    /*let response = await*/ fetch('https://localhost:44361/api/FilmStudio', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            printMovieList();
        })
        .catch((error) => {
            console.log('Error:', error);
        });
    // await response.json(data);
   // return data;
};

function deleteMovie(id) {
    console.log("Deleted: ", id);
};