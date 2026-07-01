console.log("JavaScript is connected!");

function login() {
    console.log("LOGIN BUTTON WAS CLICKED!");
    alert("Button works!");
}

let username =
document.getElementById("username").value;


let password =
document.getElementById("password").value;


if(username === "" || password === ""){

alert("Please fill in everything!");

}

else{

alert("Welcome " + username);

}

