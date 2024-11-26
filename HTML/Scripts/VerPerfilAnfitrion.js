document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const anfitrionId = urlParams.get("id"); // Obtiene el 'id' de la URL
  
    if (anfitrionId) {
      cargarPerfilAnfitrion(anfitrionId);
    } else {
      alert("No se encontró el anfitrión.");
    }
  
    // Función para cargar la información del anfitrión desde el servidor
    async function cargarPerfilAnfitrion(id) {
      try {
        const response = await fetch(`http://localhost:3000/api/anfitriones/${id}`);
        if (!response.ok) throw new Error("No se pudo cargar el perfil del anfitrión");
  
        const datosAnfitrion = await response.json();
  
        // Mostrar los datos del anfitrión en la página
        document.getElementById("fotoPerfil").src = datosAnfitrion.foto || "placeholder.jpg";
        document.getElementById("nombreAnfitrion").textContent = datosAnfitrion.nombre;
        document.getElementById("correo").textContent = datosAnfitrion.correo;
        document.getElementById("telefono").textContent = datosAnfitrion.telefono;
        document.getElementById("sexo").textContent = datosAnfitrion.sexo;
  
      } catch (error) {
        console.error("Error al cargar el perfil del anfitrión:", error);
        alert("Hubo un problema al cargar el perfil.");
      }
    }
  });
  