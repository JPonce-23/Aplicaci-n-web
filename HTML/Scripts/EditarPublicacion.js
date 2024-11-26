document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.querySelector(".formulario");
  const fotosInput = document.getElementById("fotos");
  const estadoSelect = document.getElementById("estado");
  const fechaDisponibilidadCampo = document.getElementById("fecha-disponibilidad-campo");
  const fechaDisponibilidadInput = document.getElementById("fecha-disponibilidad");

  // Obtener el ID de la publicación de la URL
  const params = new URLSearchParams(window.location.search);
  const publicacionID = params.get("id");
  
  // Verificar si el ID está presente
  if (!publicacionID) {
    alert("ID de la publicación no encontrado.");
    window.location.href = "Mis-publicaciones.html"; // Redirige a la página de publicaciones
  }

  // Mostrar u ocultar el campo de fecha según el estado
  estadoSelect.addEventListener("change", () => {
    if (estadoSelect.value === "no_disponible") {
      fechaDisponibilidadCampo.style.display = "block";
    } else {
      fechaDisponibilidadCampo.style.display = "none";
      fechaDisponibilidadInput.value = ""; // Limpia el campo de fecha
    }
  });

  // Cargar los datos de la publicación para editar
  async function cargarDatosPublicacion() {
    try {
      const response = await fetch(`http://localhost:3000/api/publicaciones/${publicacionID}`);
      if (!response.ok) throw new Error("Error al cargar los datos de la publicación.");
      const datosPublicacion = await response.json();

      // Cargar los datos al formulario
      document.getElementById("nombre").value = datosPublicacion.nombre;
      document.getElementById("descripcion").value = datosPublicacion.descripcion;
      document.getElementById("reglas").value = datosPublicacion.reglas;
      document.getElementById("informacion").value = datosPublicacion.informacion;
      document.getElementById("ubicacion").value = datosPublicacion.ubicacion;
      document.getElementById("costo").value = datosPublicacion.costo;
      estadoSelect.value = datosPublicacion.estado || "disponible";
      fechaDisponibilidadInput.value = datosPublicacion.fecha_disponibilidad || "";

      // Mostrar el campo de fecha si el estado es no disponible
      if (estadoSelect.value === "no_disponible") {
        fechaDisponibilidadCampo.style.display = "block";
      }

      // Marcar restricciones y servicios
      datosPublicacion.restricciones.forEach((restriccion) => {
        const checkbox = document.querySelector(`input[name="restricciones"][value="${restriccion}"]`);
        if (checkbox) checkbox.checked = true;
      });
      datosPublicacion.servicios.forEach((servicio) => {
        const checkbox = document.querySelector(`input[name="servicios"][value="${servicio}"]`);
        if (checkbox) checkbox.checked = true;
      });
    } catch (error) {
      console.error("Error al cargar los datos de la publicación:", error);
      alert("No se pudieron cargar los datos de la publicación.");
    }
  }

  cargarDatosPublicacion();

  // Manejo de la subida del formulario
  formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validación básica del formulario
    if (!document.getElementById("nombre").value || !document.getElementById("descripcion").value || !document.getElementById("ubicacion").value || !document.getElementById("costo").value) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    // Mostrar mensaje de carga
    const btnGuardar = document.querySelector(".btn-publicar");
    btnGuardar.textContent = "Guardando cambios...";
    btnGuardar.disabled = true;

    // Recopilando los datos del formulario
    const datosEditados = {
      nombre: document.getElementById("nombre").value,
      descripcion: document.getElementById("descripcion").value,
      reglas: document.getElementById("reglas").value,
      informacion: document.getElementById("informacion").value,
      ubicacion: document.getElementById("ubicacion").value,
      costo: parseFloat(document.getElementById("costo").value),
      estado: estadoSelect.value,
      fecha_disponibilidad: estadoSelect.value === "no_disponible" ? fechaDisponibilidadInput.value : null,
      restricciones: [...document.querySelectorAll("input[name='restricciones']:checked")].map((el) => el.value),
      servicios: [...document.querySelectorAll("input[name='servicios']:checked")].map((el) => el.value),
    };

    // Crear un FormData para la subida de imágenes (si hay imágenes seleccionadas)
    const formData = new FormData();
    if (fotosInput.files.length > 0) {
      Array.from(fotosInput.files).forEach((file, index) => {
        formData.append(`fotos[${index}]`, file);
      });
    }

    // Añadir los otros datos al FormData
    Object.keys(datosEditados).forEach((key) => {
      formData.append(key, datosEditados[key]);
    });

    try {
      // Enviar los datos al servidor
      const response = await fetch(`http://localhost:3000/api/publicaciones/${publicacionID}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) throw new Error("Error al guardar los cambios.");

      // Mostrar mensaje de éxito
      alert("Los cambios han sido guardados exitosamente.");
      btnGuardar.textContent = "Guardar cambios";
      btnGuardar.disabled = false;

      // Redirigir a la página de publicaciones
      window.location.href = "Mis-publicaciones.html";
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
      alert("Hubo un problema al guardar los cambios. Intente de nuevo más tarde.");
      btnGuardar.textContent = "Guardar cambios";
      btnGuardar.disabled = false;
    }
  });
});
