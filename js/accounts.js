let username = localStorage.getItem("username");
let language = localStorage.getItem("language");

if (!username) {
    window.location.href = "index.html";
}

// to display user name and language on accounts //
document.getElementById("displayUsername").textContent = username;
document.getElementById("displayLanguage").textContent = language;


function logout() {

    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("language");

    window.location.href = "index.html";

}