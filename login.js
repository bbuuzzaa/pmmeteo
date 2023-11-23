function loadLogin() {
    var registeredUsername = localStorage.getItem("registeredUsername");
    var registeredPassword = localStorage.getItem("registeredPassword");
    var rememberMeCheckbox = document.getElementById("rememberMeCheckbox");

    if (rememberMeCheckbox.checked && registeredUsername && registeredPassword) {
        // Ak je zaškrtnutý checkbox "Remember me" a sú registrované údaje v localStorage,
        // nastavíme ich hodnoty do inputov
        document.querySelector('input[name="username"]').value = registeredUsername;
        document.querySelector('input[name="password"]').value = registeredPassword;
    }
}
function saveLogin() {
    var username = document.querySelector('input[name="username"]').value;
    var password = document.querySelector('input[name="password"]').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Login successful") {
            alert("You have successfully logged in.");
        } else {
            alert("Invalid username or password. Please try again.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

    return false; // Prevent form submission
}

