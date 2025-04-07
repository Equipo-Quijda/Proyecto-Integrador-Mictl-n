const API_URL = "http://localhost:3000/usuario"

function cargarUsuarios(){
    fetch(API_URL)
    .then(response => response.json())
    .then(usuarios => {
        const list = document.getElementById("lista-usuarios");
        list.innerHTML = "";

        usuarios.forEach(usuario => {
            const div = document.createElement("div");
            div.classList.add("user");
            div.innerHTML = `<img src ="${usuario.foto}" width="99px" height="99px"> ${usuario.nombre}`;
            div.style.cursor = 'pointer';
            div.onclick = () => seleccionarUsuario(div,usuario);
            list.appendChild(div);
        });
    })
    .catch(error => console.error("Error al cargar usuarios", error));
}


function seleccionarUsuario(elemento, usuario){
    usuarioSeleccionado = usuario;
    document.getElementById("nombre").value = usuario.nombre;
    document.getElementById("email").value = usuario.email;
    document.getElementById("rol").value = usuario.rol;
    document.getElementById("foto").value = usuario.foto;

}

function editarUsuarios(){
    
    if(!usuarioSeleccionado){
        alert("Selecciona un usuario a editar");
        return;
    }
    const usuarioEditado = {
        nombre: document.getElementById("nombre").value,
        email: document.getElementById("email").value,
        role: document.getElementById("rol").value,
        img: document.getElementById("foto".value)
    };
    fetch(`${API_URL}/${usuarioSeleccionado.id}`,{
        method: 'PUT',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(usuarioEditado)
    })
    .then(response => response.json())
    .then(()=>{
        alert("Usuario actualizado");
        limpiarCampos()
        cargarUsuarios();
    })
    .catch(error => console.error("Error al editar: ", error));
}

function guadarCambios(){
    const usuario = {
        //id: '',
        nombre: document.getElementById("nombre").value,
        email: document.getElementById("email").value,
        role: document.getElementById("rol").value,
        img: document.getElementById("foto").value
    };
    fetch(API_URL,{
        method: "POST",
        headers: {"Content-Type": "aplication/json"},
        body: JSON.stringify(usuario)
    })
    .then(response => response.json)
    .then(()=>{
        alert("Usuario agregado");
        limpiarCampos()
        actualizarUsuarios();
    })
    .catch(error => console.error("Error al registrar usuario", error));
}    

function limpiarCampos(){
        nombre: document.getElementById("nombre").value = "";
        email: document.getElementById("email").value = "";
        role: document.getElementById("rol").value = "";
        img: document.getElementById("foto").value = "";
}

document.addEventListener('DOMContentLoaded',function (){
    cargarUsuarios();
});