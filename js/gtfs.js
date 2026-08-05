function loadStops() {

    return new Promise((resolve, reject) => {

        Papa.parse("gtfs/stops.txt", {

            download: true,

            header: true,

            complete: function(results) {

                const cleanData = results.data.filter(row => row.stop_id);
                resolve(cleanData);

            },

            error: function(error) {

                reject(error);

            }

        });

    });

}

console.log("GTFS.js loaded!!!!");

function loadStopTimes() {

    return new Promise ((resolve, reject) => {

        Papa.parse("gtfs/stop_times.txt", {

            download: true,
            header: true,

            complete: function (results) {

                const cleanData = results.data.filter(row => row.stop_id);
                resolve(cleanData);
            
            },
            error: function(error) {
                reject(error);
            }

        });

    });

}


// ===================================================
// Wiring it all together: search box + arrivals table
// ===================================================

// Keeps the full stop_times list in memory so we don't
// re-parse the CSV every time someone picks a new stop
let allStopTimes = [];

// Maps the text shown in the search box back to a stop_id,
// since stop names alone aren't always unique
let stopLabelToId = {};

document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("stopSearch");
    const arrivalsBox = document.getElementById("arrivalTimes");

    // Let the person know data is loading
    searchInput.placeholder = "Loading bus stops...";
    searchInput.disabled = true;

    Promise.all([loadStops(), loadStopTimes()])
        .then(function (results) {

            const stops = results[0];
            allStopTimes = results[1];

            populateStopOptions(stops);

            searchInput.placeholder = "Start typing a bus stop name...";
            searchInput.disabled = false;

        })
        .catch(function (error) {

            console.error("Failed to load GTFS data:", error);
            searchInput.placeholder = "Couldn't load bus stops";
            arrivalsBox.innerHTML = "<p>Something went wrong loading bus stop data. Please refresh the page.</p>";

        });

    // Fires whenever the typed text changes or a suggestion is picked
    searchInput.addEventListener("input", function () {

        const typedValue = searchInput.value;
        const stopId = stopLabelToId[typedValue];

        // Only show arrivals once the person has picked an exact match
        // from the suggestion list (not while they're still typing)
        if (stopId) {
            showArrivalsForStop(stopId);
        } else {
            arrivalsBox.innerHTML = "<p>Select a bus stop to see the scheduled arrivals!</p>";
        }

    });

});


// Fills the <datalist> with every stop name as a suggestion
function populateStopOptions(stops) {

    const datalist = document.getElementById("stopOptions");
    datalist.innerHTML = "";
    stopLabelToId = {};

    stops.forEach(function (stop) {

        // Some stop names repeat across different stops/routes,
        // so we add the ID to keep every label unique
        const label = stop.stop_name + " (" + stop.stop_id + ")";
        stopLabelToId[label] = stop.stop_id;

        const option = document.createElement("option");
        option.value = label;
        datalist.appendChild(option);

    });

}


// Builds a clean table of arrival times for the chosen stop
function showArrivalsForStop(stopId) {

    const arrivalsBox = document.getElementById("arrivalTimes");

    const matches = allStopTimes
        .filter(function (row) {
            return row.stop_id === stopId;
        })
        .sort(function (a, b) {
            return a.arrival_time.localeCompare(b.arrival_time);
        });

    if (matches.length === 0) {
        arrivalsBox.innerHTML = "<p>No scheduled arrivals found for this stop.</p>";
        return;
    }

    let tableHTML =
        '<table class="arrivals-table">' +
            '<thead>' +
                '<tr>' +
                    '<th>Trip</th>' +
                    '<th>Arrival</th>' +
                    '<th>Departure</th>' +
                '</tr>' +
            '</thead>' +
            '<tbody>';

    matches.forEach(function (row) {
        tableHTML +=
            '<tr>' +
                '<td>' + row.trip_id + '</td>' +
                '<td>' + row.arrival_time + '</td>' +
                '<td>' + row.departure_time + '</td>' +
            '</tr>';
    });

    tableHTML += '</tbody></table>';

    arrivalsBox.innerHTML = tableHTML;

}
