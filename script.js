// Inicializace grafu
const ctx = document.getElementById('dataChart').getContext('2d');
let dataChart;

// Nastavení výchozího grafu na teplotu
dataChart = createChart("Teplota", "red");

// Funkce pro vytvoření grafu
function createChart(label, color) {
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: label,
                borderColor: color,
                data: [],
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    beginAtZero: true,
                    max: 10
                }
            }
        }
    });
}

// Funkce pro změnu zobrazeného grafu
function changeChart(chartType, color) {
    dataChart.destroy();
    dataChart = createChart(chartType, color);
}

// Simulace získávání náhodných dat ze senzorů a ukládání do historie
function simulateRandomData() {
    const temperature = Math.floor(Math.random() * 30) + 10;
    const humidity = Math.floor(Math.random() * 70) + 30;
   

    document.getElementById('temperature').textContent = temperature + "°C";
    document.getElementById('humidity').textContent = humidity + "%";
    document.getElementById('amonium').textContent = amonium + "ppm";
    document.getElementById('benzen').textContent = benzen + "ppm";

    // Přidat náhodné hodnoty do grafu a ukládat historii
    addDataToChart(temperature);
    saveDataToLocalStorage("temperatureHistory", temperature);
}

// Změna grafu na teplotu
document.getElementById('showTemperature').addEventListener('click', function () {
    changeChart("Teplota", "red");
});

// Změna grafu na vlhkost
document.getElementById('showHumidity').addEventListener('click', function () {
    changeChart("Vlhkosť", "green");
});

document.getElementById('showAmoniak').addEventListener('click', function () {
    changeChart("Amoniak", "brown");
});
document.getElementById('showBenzen').addEventListener('click', function () {
    changeChart("Benzén", "cyan");
});

// Funkce pro přidání dat do grafu a ukládání do Local Storage
function addDataToChart(value) {
    const data = dataChart.data.datasets[0].data;
    const labels = dataChart.data.labels;
    const currentTime = new Date();
    const time = currentTime.toLocaleTimeString();

    data.push(value);
    labels.push(time);

    if (data.length > 10) {
        data.shift();
        labels.shift();
    }

    dataChart.update();
}

// Funkce pro ukládání dat do Local Storage
function saveDataToLocalStorage(key, value) {
    const history = JSON.parse(localStorage.getItem(key)) || [];
    history.push(value);
    localStorage.setItem(key, JSON.stringify(history));
}

// Načtení historických dat z Local Storage po načtení stránky
window.onload = function () {
    const temperatureHistory = JSON.parse(localStorage.getItem('temperatureHistory')) || [];
    
    if (temperatureHistory.length > 0) {
        addDataToChart(temperatureHistory[temperatureHistory.length - 1]); // Zobrazit poslední hodnotu
    }
};

// Aktualizovat údaje a grafy každých 10 sekund
setInterval(simulateRandomData, 5000); // 10000 ms = 10 sekund
simulateRandomData(); // Spustit inicializaci

// Předpokládejme, že máte nějaký mechanismus pro správu přihlášení, například pomocí Local Storage.
const isLoggedIn = localStorage.getItem("isLoggedIn");

const signupButton = document.getElementById("signupButton");
const signinButton = document.getElementById("signinButton");
const logoutButton = document.getElementById("logoutButton"); // Přidali jsme tlačítko pro odhlášení
const dataSection = document.getElementById("dataSection");

if (isLoggedIn) {
    dataSection.style.display = "block";
    signupButton.style.display = "none";
    signinButton.style.display = "none";
    logoutButton.style.display = "block"; // Zobrazit tlačítko odhlášení
} else {
    dataSection.style.display = "none";
    logoutButton.style.display = "none"; // Skrýt tlačítko odhlášení
}



const nodemailer = require('nodemailer');

// Nastavení transporteru pro odesílání e-mailů
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'tvoje_emailova_adresa@gmail.com',
    pass: 'tvoje_heslo'
  }
});

// Funkce pro odeslání e-mailu
function sendEmail(temperature) {
  // E-mailová adresa, na kterou chceš poslat upozornění
  const toEmail = 'prijemce@email.com';

  // Předmět e-mailu
  let subject = '';
  if (temperature > 35) {
    subject = 'Upozornění na vysokou teplotu';
  } else if (temperature < 20) {
    subject = 'Upozornění na nízkou teplotu';
  }

  // Text e-mailu
  const text = `Teplota je momentálně ${temperature} stupňů Celsia. `;

  // Nastavení e-mailu
  const mailOptions = {
    from: 'ballekpatrik@gmail.com',
    to: toEmail,
    subject: subject,
    text: text
  };

  // Odešli e-mail
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log('Chyba při odesílání e-mailu: ' + error);
    } else {
      console.log('E-mail byl úspěšně odeslán: ' + info.response);
    }
  });
}

// Zde by měl být kód, který monitoruje teplotu. Pokud teplota přesáhne 35 nebo klesne pod 20, zavolej funkci sendEmail s aktuální teplotou.

// Příklad použití funkce sendEmail:
const currentTemperature = 36; // Nahraď tímto aktuální teplotu
sendEmail(currentTemperature);
