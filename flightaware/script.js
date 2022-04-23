//Making a map and tiles
const map = L.map('map').setView([40, 35], 6);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributonrs';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, {
    attribution
});
tiles.addTo(map);
const api_url = 'https://opensky-network.org/api/states/all?lamin=35.8389&lomin=25&lamax=45&lomax=45';
//tr: https://opensky-network.org/api/states/all?lamin=35.8389&lomin=25&lamax=45&lomax=45
//////////////////////////////////////////

function fetchData() {
    return fetch(api_url)
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            return res.states.filter((state) => {
                return (state[5]) && (state[6]);
            });
        })
        .catch((err) => {
            if (err) throw err
        });
}

function plotStates(map, markers) {
    fetchData().then(function (states) {
        states.forEach((state) => {
            const
                icao24 = state[0],
                callsign = state[1],
                origin_country = state[2],
                time_position = state[3],
                last_contact = state[4],
                lng = state[5],
                lat = state[6],
                baro_altitude = state[7],
                on_ground = state[8],
                velocity = state[9],
                true_track = state[10],
                vertical_rate = state[11],
                sensors = state[12],
                geo_altitude = state[13],
                squawk = state[14],
                spi = state[15],
                position_source = state[16];


            if (markers[icao24]) {
                markers[icao24].setLatLng([lat, lng]);
            } else {
                const airplaneIcon = L.icon({
                    iconUrl: 'airplane.png',
                    iconSize: [19],
                });

                //Uçakların gidiş yönü açısı => true_track
                markers[icao24] = L.marker([lat, lng], {
                    icon: airplaneIcon,
                    rotationAngle: true_track
                }).bindPopup(`<p> Ülke: ${origin_country} <br> Enlem: ${lat}° <br> Boylam: ${lng}° <br> Hız: ${velocity} m/s<br> Barometrik Yükseklik: ${baro_altitude} m</p>`);

                markers[icao24].addTo(map);

            }
        });
        setTimeout(() => plotStates(map, markers), 5000);
    });
}


const markers = {};
plotStates(map, markers);