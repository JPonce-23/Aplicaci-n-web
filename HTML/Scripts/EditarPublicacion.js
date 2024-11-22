document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector(".formulario");
  
    // Simulación de datos cargados desde el backend
    const datosPublicacion = {
      nombre: "Casa de ejemplo",
      descripcion: "Descripción previa de la casa.",
      reglas: "Reglas anteriores.",
      informacion: "Información adicional previa.",
      ubicacion: "Colonia ejemplo, Delegación ejemplo",
      costo: 5000,
      restricciones: ["mascotas", "ruido"],
      servicios: ["wifi", "amueblado"]
    };
  
    // Precargar los datos en el formulario
    document.getElementById("nombre").value = datosPublicacion.nombre;
    document.getElementById("descripcion").value = datosPublicacion.descripcion;
    document.getElementById("reglas").value = datosPublicacion.reglas;
    document.getElementById("informacion").value = datosPublicacion.informacion;
    document.getElementById("ubicacion").value = datosPublicacion.ubicacion;
    document.getElementById("costo").value = datosPublicacion.costo;
  
    // Seleccionar las restricciones y servicios existentes
    datosPublicacion.restricciones.forEach(restriccion => {
      document.querySelector(`input[name="restricciones"][value="${restriccion}"]`).checked = true;
    });
    datosPublicacion.servicios.forEach(servicio => {
      document.querySelector(`input[name="servicios"][value="${servicio}"]`).checked = true;
    });
  
    // Validación y envío del formulario
    formulario.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const datosEditados = {
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("descripcion").value,
        reglas: document.getElementById("reglas").value,
        informacion: document.getElementById("informacion").value,
        ubicacion: document.getElementById("ubicacion").value,
        costo: parseFloat(document.getElementById("costo").value),
        restricciones: [...document.querySelectorAll("input[name='restricciones']:checked")].map(el => el.value),
        servicios: [...document.querySelectorAll("input[name='servicios']:checked")].map(el => el.value),
      };
  
      console.log("Datos editados a enviar:", datosEditados);
  
      alert("Los cambios han sido guardados.");
    });
  });
  