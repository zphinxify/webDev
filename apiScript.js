// All code related to API-calls goes here...

var movieList = document.getElementById("movieList");
var registerButton = document.getElementById("registerButton");

registerButton.addEventListener("click", function () {
   var name = document.getElementById("studioName").value;
   var password = document.getElementById("newPassword").value;
    
        addStudio(name, password, true);
    
});

// printMovieList();


addMovie("test", 2)

function addMovie(name, stock) {

    var data = { name: name, stock: stock };

    /*let response = await*/ fetch('https://localhost:44361/api/Film', {
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


function addStudio(name, password) {

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