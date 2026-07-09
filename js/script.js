function createAccount() {


    // Get what the user typed
    let username = document.getElementById("newUsername").value;
    let password = document.getElementById("newPassword").value;
    let language = document.getElementById("language").value;

    // Check if everything was filled in
    if (username === "" || password === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Save the information
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    localStorage.setItem("language", language);

    alert("Account created successfully!");
}

function login() {

    // Get what the user typed
    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;

    // Get the saved account
    let savedUsername = localStorage.getItem("username");
    let savedPassword = localStorage.getItem("password");

    // Check if they match
    if (username === savedUsername && password === savedPassword) {

        alert("Login successful!");

        window.location.href = "accounts.html";

    } else {

        alert("Incorrect username or password.");

    }

}