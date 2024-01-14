// Inicializace grafu
const ctx = document.getElementById('dataChart').getContext('2d');


// Nastavení výchozího grafu na teplotu
dataChart = createChart();

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

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }


