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

function zeigeStundenDiagramme(daten) {
    const stunden = daten.hourly.data.slice(0, 24);
    const labels = stunden.map(stunde => new Date(stunde.time * 1000).getHours() + " Uhr");

    // 🔥 Temperatur in °C umrechnen & in Float konvertieren
    const temperaturen = stunden.map(stunde => Number(((stunde.temperature - 32) * 5 / 9).toFixed(2)));

    // 🔥 Niederschlag bleibt gleich (mm/h)
    const niederschlag = stunden.map(stunde => Number(stunde.precipIntensity.toFixed(2)));

    // 🔥 Windgeschwindigkeit bleibt gleich (m/s)
    const windgeschwindigkeit = stunden.map(stunde => Number(stunde.windSpeed.toFixed(2)));

    // Diagramme aktualisieren
    erstelleDiagramm("temperaturChart", "Temperatur (°C)", labels, temperaturen, "#00bcd4");
    erstelleDiagramm("niederschlagChart", "Niederschlag (mm/h)", labels, niederschlag, "#00bcd4");
    erstelleDiagramm("windChart", "Windgeschwindigkeit (m/s)", labels, windgeschwindigkeit, "#00bcd4");
}

function erstelleDiagramm(canvasId, label, labels, daten, farbe) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Falls bereits ein Diagramm existiert, zerstören
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
                borderColor: "#00bcd4",
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


// Diagramm-Wechsel durch Buttons
document.getElementById("tempButton").addEventListener("click", () => zeigeDiagramm("temperaturChart"));
document.getElementById("regenButton").addEventListener("click", () => zeigeDiagramm("niederschlagChart"));
document.getElementById("windButton").addEventListener("click", () => zeigeDiagramm("windChart"));

function zeigeDiagramm(chartId) {
    document.getElementById("temperaturChart").style.display = "none";
    document.getElementById("niederschlagChart").style.display = "none";
    document.getElementById("windChart").style.display = "none";
    document.getElementById(chartId).style.display = "block";
}
