


let username = localStorage.getItem("username");
let language = localStorage.getItem("language");

if (!username) {
    window.location.href = "index.html";
}


let username = localStorage.getItem("username");
let language = localStorage.getItem("language");

// to display user name and language on accoutns //
document.getElementById("displayUsername").textContent = username;
document.getElementById("displayLanguage").textContent = language;


function logout() {

    window.location.href = "index.html";

}