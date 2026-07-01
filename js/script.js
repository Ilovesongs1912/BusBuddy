console.log("JavaScript connected!");


function createProfile(){

    let username = document.getElementById("username").value;

    let profileLock = document.getElementById("profileLock").value;


    if(username === "" || profileLock === ""){

        alert("Please enter your username and password!");

    }

    else{

        localStorage.setItem("username", username);
        localStorage.setItem("profileLock", profileLock);


        alert("Welcome to BusBuddy, " + username + "!");

    }

}