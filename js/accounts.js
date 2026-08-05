let username = localStorage.getItem("username");
let language = localStorage.getItem("language");

if (!username) {
    window.location.href = "index.html";
}

// Balance starts at 0 if the user has never added money before
let balance = parseFloat(localStorage.getItem("balance")) || 0;

// Fill in the user info
document.getElementById("displayUsername").textContent = username;
document.getElementById("avatarInitial").textContent = username.charAt(0).toUpperCase();
document.getElementById("displayLanguage").textContent = language || "Not set";
updateBalanceDisplay();

function updateBalanceDisplay() {
    document.getElementById("displayBalance").textContent = "RM " + balance.toFixed(2);
}

function addMoney() {
    let amount = prompt("How much would you like to add? (RM)");

    // Make sure they typed a real, positive number
    amount = parseFloat(amount);
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    balance += amount;
    localStorage.setItem("balance", balance);
    updateBalanceDisplay();
}

function onDemand() {
    alert("On-Demand booking is coming soon!");
}

function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("language");
    localStorage.removeItem("balance");

    window.location.href = "index.html";
}

 