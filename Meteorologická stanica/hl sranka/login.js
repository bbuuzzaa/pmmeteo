function loadLogin() {
    var registrovaneMeno = localStorage.getItem("registrovaneMeno"); // Získanie registrovaného užívateľského mena z localStorage
    var registrovaneHeslo = localStorage.getItem("registrovaneHeslo"); // Získanie registrovaného hesla z localStorage
    var zapametatSiCheckbox = document.getElementById("zapametatSiCheckbox"); // Získanie referencie na checkbox "Zapamätať si"

    if (zapametatSiCheckbox.checked && registrovaneMeno && registrovaneHeslo) {
        // Ak je zaškrtnutý checkbox "Zapamätať si" a sú registrované údaje v localStorage,
        // nastavíme ich hodnoty do inputov
        document.querySelector('input[name="meno"]').value = registrovaneMeno;
        document.querySelector('input[name="heslo"]').value = registrovaneHeslo;
    }
}

function ulozitPrihlasenie() {
    var meno = document.querySelector('input[name="meno"]').value; // Získanie hodnoty z inputu pre užívateľské meno
    var heslo = document.querySelector('input[name="heslo"]').value; // Získanie hodnoty z inputu pre heslo

    fetch('/prihlasit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ meno, heslo })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Úspešné prihlásenie") {
            alert("Úspešne si sa prihlásil(a).");
        } else {
            alert("Neplatné užívateľské meno alebo heslo. Skús to prosím ešte raz.");
        }
    })
    .catch(error => {
        console.error('Chyba:', error);
    });



    return false; // Prevent form submission
}

