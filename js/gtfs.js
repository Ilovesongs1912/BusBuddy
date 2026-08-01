function loadStops() {

    return new Promise((resolve, reject) => {

        Papa.parse("gtfs/stops.txt", {

            download: true,

            header: true,

            complete: function(results) {

                resolve(results.data);

            },

            error: function(error) {

                reject(error);

            }

        });

    });

}

console.log("GTFS.js loaded!");