var url = "http://localhost:8080/roles";
var rolesdecanela = document.getElementById("rolesdecanela");

function cargarRoles() {
    var data = fetch(url, {
        method: 'GET', // GET, POST, PUT, DELETE, etc.
        headers: {
        'Content-Type': 'application/json',
        // Otros headers como Authorization
        },
    })
        .then(response => {
        // Verificar si la respuesta es correcta
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json(); // O response.text(), response.blob(), etc.
        }).then(data => {
            crearRol(data);
        })
    }

function crearRol (data) {
    data.forEach((rol) => {
        var div = document.createElement("div");
        div.className = "col-sm-4 col-md-3 col-lg-2 mb-3";
        div.innerHTML = `
        <h1>${rol.nombre}</h1>
        <p>${rol.descripcion}</p>`

        rolesdecanela.appendChild(div);
})};

cargarRoles();

var intervalRoles = setInterval(() => {
    rolesdecanela.innerHTML = "";
    cargarRoles();
}
, 15000);