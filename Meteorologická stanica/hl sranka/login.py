from ctypes import _NamedFuncPointer
from flask import Flask, request, jsonify

app = Flask(_NamedFuncPointer)

# Simulácia databázy registrovaných používateľov
registered_users = {
    "user1": "password1",
    "user2": "password2"
}

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if username in registered_users and registered_users[username] == password:
        return jsonify({"message": "Login successful"})
    else:
        return jsonify({"message": "Invalid username or password"})

if __name__ == '__main__':
    app.run()

