document.addEventListener("DOMContentLoaded", () => {
    const userForm = document.getElementById("userForm");
    const nombreInput = document.getElementById("nombre");
    const apellidosInput = document.getElementById("apellidos");
    const correoInput = document.getElementById("correo");
    const rolInput = document.getElementById("rol");

    // Load user data from localStorage
        const user = JSON.parse(sessionStorage.getItem("mictlanUser"));

        if (!user) {
            alert("No se encontró información del usuario. Por favor, inicie sesión nuevamente.");
            window.location.href = "./login.html";
        } else {
        const rol = fetch("http://localhost:8080/roles/" + user.rolId,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },

        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
        }).then((data) => {
                    
            nombreInput.value = user.nombre || "";
            apellidosInput.value = user.apellido || "";
            correoInput.value = user.correo || "";
            rolInput.value = data.nombre || "";
            })
            .catch((error) => {
                console.error("Error fetching role:", error);
            });

        }

    // Handle form submission
    userForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const updatedUser = {
            nombre: nombreInput.value,
            apellidos: apellidosInput.value,
            correo: correoInput.value,
        };

        try {
            const response = await fetch("http://localhost:8080/usuarios/" + user.idUsuarios, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedUser),
            }).then((response) => {

            if (response.ok) {
                alert("Usuario actualizado correctamente.");
            } else {
                alert("Error al actualizar el usuario.");
            }})
        } catch (error) {
            console.error("Error:", error);
            alert("Ocurrió un error al conectar con el servidor.");
        }

        const reloadUserData = async () => {
            try {
            const response = await fetch("http://localhost:8080/usuarios/id/" + user.idUsuarios, {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const updatedUserData = await response.json();
                sessionStorage.setItem("mictlanUser", JSON.stringify(updatedUserData));
            } else {
                console.error("Error al recargar la información del usuario.");
            }
            } catch (error) {
            console.error("Error al conectar con el servidor para recargar la información del usuario:", error);
            }
        };

        await reloadUserData();
    });

    // Handle logout
    const logoutButton = document.getElementById("logoutButton");
    logoutButton.addEventListener("click", () => {
        sessionStorage.removeItem("mictlanUser");
        window.location.href = "./login.html";
    });
});