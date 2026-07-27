function createAccount() {


    // User input
    let username = document.getElementById("newUsername").value;
    let password = document.getElementById("newPassword").value;
    let language = document.getElementById("language").value;

    // If it was filled inornot (in local storage)
    if (username === "" || password === "") {
        alert("Please fill in all fields.");
        return;
    }

    // localstorage!!!!!!
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    localStorage.setItem("language", language);

    alert("Account created successfully!");
}

function login() {

    // User input
    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;

    // Checking localstorage for inputted username and pass (aka the user input)
    let savedUsername = localStorage.getItem("username");
    let savedPassword = localStorage.getItem("password");

    // Cheks if it matches the one inputted by the user
    if (username === savedUsername && password === savedPassword) {

        alert("Login successful!");

        window.location.href = "accounts.html";

    } else {

        alert("Incorrect username or password.");

    }

}