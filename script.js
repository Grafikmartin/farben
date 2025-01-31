const API_KEY = "dWL7n8jTc69tmrPmxxoNMfeaCUGJzKCR";

document.getElementById("suchen").addEventListener("click", async () => {
    const stadt = document.getElementById("stadt-eingabe").value.trim();
    const status = document.getElementById("status");
    const extrahintergrund = document.querySelector(".extrahintergrund");
    const diagrammContainer = document.getElementById("diagramm-container");

    if (!stadt) {
        status.textContent = "Bitte eine Stadt eingeben!";
        return;
    }

    status.textContent = "Lade Wetterdaten...";
    
    try {
        const koords = await holeKoordinaten(stadt);
        if (!koords) throw new Error("Ort nicht gefunden.");
        
        const wetterDaten = await ladeWetterDaten(koords.lat, koords.lon);
        status.textContent = "";

        // 🎯 Erst jetzt Hintergrund & Diagramm sichtbar machen!
        extrahintergrund.style.display = "block";
        diagrammContainer.style.display = "block";

        // 🎨 Langsam einblenden für bessere Optik
        setTimeout(() => {
            extrahintergrund.style.opacity = "1";
            diagrammContainer.style.opacity = "1";
        }, 50);

        zeigeStundenDiagramme(wetterDaten);
    } catch (error) {
        status.textContent = `Fehler: ${error.message}`;
    }
});


async function holeKoordinaten(stadt) {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?city=${stadt}&format=json&limit=1`);
    if (!response.ok) throw new Error("Fehler beim Abrufen der Ortskoordinaten.");
    const daten = await response.json();
    return daten.length > 0 ? { lat: daten[0].lat, lon: daten[0].lon } : null;
}

async function ladeWetterDaten(lat, lon) {
    const response = await fetch(`https://api.pirateweather.net/forecast/${API_KEY}/${lat},${lon}?extend=hourly`);
    if (!response.ok) throw new Error("Fehler beim Abrufen der Wetterdaten.");
    return await response.json();
}




function zeigeDiagramm(chartId) {
    // Alle Diagramme verstecken
    const charts = [
        "temperaturChart", "appTempChart", "niederschlagChart", "precipProbabilityChart",
        "windChart", "boeenChart", "humidityChart", "uvIndexChart", "pressureChart",
        "cloudCoverChart", "visibilityChart"
    ];
    
    charts.forEach(id => {
        const chartElement = document.getElementById(id);
        if (chartElement) {
            chartElement.style.display = "none";
        }
    });

    // Gewünschtes Diagramm anzeigen
    const activeChart = document.getElementById(chartId);
    if (activeChart) {
        activeChart.style.display = "block";
    }

    // Alle Buttons zurücksetzen
    const buttons = [
        "tempButton", "appTempButton", "regenButton", "precipProbability", 
        "windButton", "boeenButton", "humidity", "uvIndexButton", "pressure", 
        "cloudCover", "visibilityButton"
    ];

    buttons.forEach(btnId => {
        const btnElement = document.getElementById(btnId);
        if (btnElement) {
            btnElement.classList.remove("active-button");
        }
    });

    // Passenden Button aktivieren
    const activeButtonMap = {
        "temperaturChart": "tempButton",
        "appTempChart": "appTempButton",
        "niederschlagChart": "regenButton",
        "precipProbabilityChart": "precipProbability",
        "windChart": "windButton",
        "boeenChart": "boeenButton",
        "humidityChart": "humidity",
        "uvIndexChart": "uvIndexButton",
        "pressureChart": "pressure",
        "cloudCoverChart": "cloudCover",
        "visibilityChart": "visibilityButton"
    };

    if (activeButtonMap[chartId]) {
        document.getElementById(activeButtonMap[chartId]).classList.add("active-button");
    }
}

function erstelleDiagramm(canvasId, label, labels, daten, farbe) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (window[canvasId] instanceof Chart) {
        window[canvasId].destroy();
    }

    window[canvasId] = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: daten,
                backgroundColor: farbe,
                borderColor: farbe,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: "#00bcd4", // 🌟 Legenden-Textfarbe
                        font: { size: 14 }
                    }
                }
            },
            scales: {
                x: { 
                    title: { display: true, text: "Uhrzeit", color: "#00bcd4", font: { size: 14 }},
                    ticks: { color: "#00bcd4" },
                    grid: { color: "rgba(0, 188, 212, 0.25)" } // 🌟 Gitternetzlinien auf 50% #00bcd4 setzen
                },
                y: { 
                    title: { display: true, text: label, color: "#00bcd4", font: { size: 14 }},
                    ticks: { color: "#00bcd4" },
                    grid: { color: "rgba(0, 188, 212, 0.25)" } // 🌟 Auch Y-Achse mit 50% Transparenz
                }
            }
        }
    });
}

function zeigeStundenDiagramme(daten) {
    const stunden = daten.hourly.data.slice(0, 24);
    const labels = stunden.map(stunde => new Date(stunde.time * 1000).getHours() + " Uhr");
    
    const temperaturen = stunden.map(stunde => ((stunde.temperature - 32) * 5 / 9).toFixed(2));
    const gefuehlteTemperatur = stunden.map(stunde => ((stunde.apparentTemperature - 32) * 5 / 9).toFixed(2));
    const niederschlag = stunden.map(stunde => stunde.precipIntensity.toFixed(2));
    const regenwahrscheinlichkeit = stunden.map(stunde => (stunde.precipProbability * 100).toFixed(2));
    const windgeschwindigkeit = stunden.map(stunde => stunde.windSpeed.toFixed(2));
    const boeen = stunden.map(stunde => stunde.windGust.toFixed(2));
    const luftfeuchtigkeit = stunden.map(stunde => (stunde.humidity * 100).toFixed(2));
    const uvIndex = stunden.map(stunde => stunde.uvIndex);
    const luftdruck = stunden.map(stunde => stunde.pressure.toFixed(2));
    const wolkenbedeckung = stunden.map(stunde => (stunde.cloudCover * 100).toFixed(2));
    const sichtweite = stunden.map(stunde => stunde.visibility.toFixed(2));
    
    erstelleDiagramm("temperaturChart", "Temperatur (°C)", labels, temperaturen, "#00bcd4");
    erstelleDiagramm("appTempChart", "Gefühlte Temperatur (°C)", labels, gefuehlteTemperatur, "#00bcd4");
    erstelleDiagramm("niederschlagChart", "Niederschlag (mm/h)", labels, niederschlag, "#2196F3");
    erstelleDiagramm("precipProbabilityChart", "Regenwahrscheinlichkeit (%)", labels, regenwahrscheinlichkeit, "#00bcd4");
    erstelleDiagramm("windChart", "Windgeschwindigkeit (m/s)", labels, windgeschwindigkeit, "#00bcd4");
    erstelleDiagramm("boeenChart", "Böen (m/s)", labels, boeen, "#00bcd4");
    erstelleDiagramm("humidityChart", "Luftfeuchtigkeit (%)", labels, luftfeuchtigkeit, "#00bcd4");
    erstelleDiagramm("uvIndexChart", "UV-Index", labels, uvIndex, "#00bcd4");
    erstelleDiagramm("pressureChart", "Luftdruck (hPa)", labels, luftdruck, "#00bcd4");
    erstelleDiagramm("cloudCoverChart", "Wolkenbedeckung (%)", labels, wolkenbedeckung, "#00bcd4");
    erstelleDiagramm("visibilityChart", "Sichtweite (km)", labels, sichtweite, "#00bcd4");
}

const buttonChartMap = {
    "tempButton": "temperaturChart",
    "appTempButton": "appTempChart",
    "regenButton": "niederschlagChart",
    "precipProbability": "precipProbabilityChart",
    "windButton": "windChart",
    "boeenButton": "boeenChart",
    "humidity": "humidityChart",
    "uvIndexButton": "uvIndexChart",
    "pressure": "pressureChart",
    "cloudCover": "cloudCoverChart",
    "visibilityButton": "visibilityChart"
};

Object.keys(buttonChartMap).forEach(buttonId => {
    const buttonElement = document.getElementById(buttonId);
    if (buttonElement) {
        buttonElement.addEventListener("click", () => zeigeDiagramm(buttonChartMap[buttonId]));
    }
});



