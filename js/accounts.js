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

window.onload = async function () {

    const stops = await loadStops();

    const stopSelect = document.getElementById("stopSelect");

    stopSelect.innerHTML = "";

    stops.forEach(stop => {

        const option = document.createElement("option");

        option.value = stop.stop_id;

        option.textContent = stop.stop_name;

        stopSelect.appendChild(option);

    });

};