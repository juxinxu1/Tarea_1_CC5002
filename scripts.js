document.addEventListener("DOMContentLoaded", function () {
    // --- Variables del formulario ---
    const form = document.getElementById("activity-form");
    const regionSelect = document.getElementById("region");
    const comunaSelect = document.getElementById("comuna");
    const contactarPorSelect = document.getElementById("contactar_por");
    const otroContactoContainer = document.getElementById("otro_contacto_container");
    const temaSelect = document.getElementById("tema");
    const otroTemaContainer = document.getElementById("otro_tema_container");
    const fotosContainer = document.getElementById("fotos_container");
    const agregarFotoBtn = document.getElementById("agregar_foto");
    const confirmationDiv = document.getElementById("confirmation");
    const finalMessageDiv = document.getElementById("final_message");
    const submitActivityBtn = document.getElementById("submit_activity");
  
    // Prellenar los campos de fecha/hora
    const inicioInput = document.getElementById("inicio");
    const terminoInput = document.getElementById("termino");
    const now = new Date();
    inicioInput.value = now.toISOString().slice(0, 16); // formato "YYYY-MM-DDTHH:MM"
    // Fecha término: +3 horas
    const terminoDate = new Date(now.getTime() + 3 * 60 * 60 * 1000);
    terminoInput.value = terminoDate.toISOString().slice(0, 16);
  
    // --- Cargar regiones y comunas desde el archivo JSON ---
    fetch("region_comuna.json")
      .then(response => response.json())
      .then(data => {
        // Poblar el select de regiones
        data.regiones.forEach(region => {
          const option = document.createElement("option");
          option.value = region.id;
          option.textContent = region.nombre;
          regionSelect.appendChild(option);
        });
  
        // Cuando se selecciona una región, poblar el select de comunas
        regionSelect.addEventListener("change", function () {
          const regionId = parseInt(this.value);
          // Limpiar el select de comunas
          comunaSelect.innerHTML = "<option value=''>Seleccione una comuna</option>";
          const regionData = data.regiones.find(r => r.id === regionId);
          if (regionData) {
            regionData.comunas.forEach(comuna => {
              const opt = document.createElement("option");
              opt.value = comuna.id;
              opt.textContent = comuna.nombre;
              comunaSelect.appendChild(opt);
            });
          }
        });
      })
      .catch(error => console.error("Error al cargar regiones:", error));
  
    // --- Mostrar/Ocultar campo para "otra" en Contactar por ---
    contactarPorSelect.addEventListener("change", function () {
      if (this.value === "otra") {
        otroContactoContainer.style.display = "block";
      } else {
        otroContactoContainer.style.display = "none";
      }
    });
  
    // --- Mostrar/Ocultar campo para "otro" en Tema ---
    temaSelect.addEventListener("change", function () {
      if (this.value === "otro") {
        otroTemaContainer.style.display = "block";
      } else {
        otroTemaContainer.style.display = "none";
      }
    });
  
    // --- Agregar campos para fotos (máximo 5) ---
    agregarFotoBtn.addEventListener("click", function () {
      const currentFiles = fotosContainer.querySelectorAll("input[type='file']");
      if (currentFiles.length < 5) {
        const newFileInput = document.createElement("input");
        newFileInput.type = "file";
        newFileInput.name = "fotos[]";
        newFileInput.accept = "image/*";
        // Si ya hay al menos un input, ya no se requiere "required" para los siguientes
        newFileInput.required = false;
        fotosContainer.appendChild(newFileInput);
      } else {
        alert("Solo se permiten 5 fotos máximo.");
      }
    });
  
    // --- Manejo del envío del formulario ---
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      // Aquí se pueden agregar validaciones adicionales, por ejemplo, verificar que la fecha de término sea mayor a la de inicio
  
      // Mostrar mensaje de confirmación
      confirmationDiv.style.display = "block";
      form.style.display = "none";
    });
  
    // Confirmación: Sí
    document.getElementById("confirm_yes").addEventListener("click", function () {
      confirmationDiv.style.display = "none";
      finalMessageDiv.style.display = "block";
    });
  
    // Confirmación: No
    document.getElementById("confirm_no").addEventListener("click", function () {
      confirmationDiv.style.display = "none";
      form.style.display = "block";
    });
  
    // Botón para volver a la portada desde el mensaje final
    document.getElementById("volver_portada").addEventListener("click", function () {
      window.location.href = "index.html";
    });
  });
  const activityTable = document.getElementById("activity-table");
if (activityTable) {
  // Datos de ejemplo inventados para 5 actividades
  const dummyActivities = [
    {
      inicio: "2025-04-01 10:00",
      termino: "2025-04-01 12:00",
      comuna: "Santiago",
      sector: "Centro",
      tema: "Música",
      nombreOrganizador: "Juan Pérez",
      totalFotos: 3,
      fotos: [
        "Guitarra.jfif",
        "bateria.jfif",
        "biotecnologia.jfif"
      ]
    },
    {
      inicio: "2025-04-02 14:00",
      termino: "2025-04-02 16:00",
      comuna: "Providencia",
      sector: "Norte",
      tema: "Deporte",
      nombreOrganizador: "María González",
      totalFotos: 2,
      fotos: [
        "baloncesto.jpg",
        "voleibol.jpg"
      ]
    },
    {
      inicio: "2025-04-03 09:00",
      termino: "2025-04-03 11:00",
      comuna: "Las Condes",
      sector: "Sur",
      tema: "Ciencias",
      nombreOrganizador: "Carlos López",
      totalFotos: 4,
      fotos: [
        "biologia.jfif",
        "fisica.jfif",
        "quimica.jfif",
        "astronomia.jfif"
      ]
    },
    {
      inicio: "2025-04-04 18:00",
      termino: "2025-04-04 20:00",
      comuna: "Vitacura",
      sector: "Este",
      tema: "Política",
      nombreOrganizador: "Ana Torres",
      totalFotos: 1,
      fotos: [
        "politica.jfif"
      ]
    },
    {
      inicio: "2025-04-05 13:00",
      termino: "2025-04-05 15:00",
      comuna: "Maipú",
      sector: "Oeste",
      tema: "Tecnología",
      nombreOrganizador: "Luis Martínez",
      totalFotos: 5,
      fotos: [
        "robotica.jfif",
        "procesadores.jfif",
        "IA.jfif",
        "automatizacion.jfif",
        "biotecnologia.jfif"
      ]
    }
  ];

  // Renderizar la tabla con las actividades
  const tbody = activityTable.querySelector("tbody");
  dummyActivities.forEach((activity, index) => {
    const tr = document.createElement("tr");
    tr.dataset.index = index;
    tr.innerHTML = `
      <td>${activity.inicio}</td>
      <td>${activity.termino}</td>
      <td>${activity.comuna}</td>
      <td>${activity.sector}</td>
      <td>${activity.tema}</td>
      <td>${activity.nombreOrganizador}</td>
      <td>${activity.totalFotos}</td>
    `;
    // Al hacer clic en la fila se muestra el detalle
    tr.addEventListener("click", function() {
      showDetail(activity);
    });
    tbody.appendChild(tr);
  });

  // Función para mostrar el detalle de una actividad
  function showDetail(activity) {
    document.getElementById("listado").style.display = "none";
    const detalleSection = document.getElementById("detalle");
    const detailDiv = document.getElementById("activity-detail");
    detailDiv.innerHTML = `
      <p><strong>Inicio:</strong> ${activity.inicio}</p>
      <p><strong>Término:</strong> ${activity.termino}</p>
      <p><strong>Comuna:</strong> ${activity.comuna}</p>
      <p><strong>Sector:</strong> ${activity.sector}</p>
      <p><strong>Tema:</strong> ${activity.tema}</p>
      <p><strong>Nombre Organizador:</strong> ${activity.nombreOrganizador}</p>
      <p><strong>Total Fotos:</strong> ${activity.totalFotos}</p>
      <div id="photos-container"></div>
    `;
    // Mostrar las fotos en tamaño 320x240 y con funcionalidad para ampliar
    const photosContainer = detailDiv.querySelector("#photos-container");
    activity.fotos.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.width = 320;
      img.height = 240;
      img.style.cursor = "pointer";
      // Al hacer clic se abre el modal con la imagen ampliada
      img.addEventListener("click", function() {
        openModal(src.replace("320x240", "800x600"));
      });
      photosContainer.appendChild(img);
    });
    detalleSection.style.display = "block";
  }

  // Botones para volver
  document.getElementById("back-to-list").addEventListener("click", function() {
    document.getElementById("detalle").style.display = "none";
    document.getElementById("listado").style.display = "block";
  });
  document.getElementById("back-to-home").addEventListener("click", function() {
    window.location.href = "index.html";
  });

  // Modal para foto ampliada
  const modal = document.getElementById("modal-foto");
  const modalImg = document.getElementById("modal-img");
  document.getElementById("close-modal").addEventListener("click", function() {
    modal.style.display = "none";
  });
  // Cerrar modal al hacer clic fuera del contenido
  modal.addEventListener("click", function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
  function openModal(src) {
    modalImg.src = src;
    modal.style.display = "block";
  }
}
// --- Sección de Estadísticas ---
if (document.getElementById('chart-line')) {
    // Gráfico de Líneas: Cantidad de actividades por día
    const ctxLine = document.getElementById('chart-line').getContext('2d');
    new Chart(ctxLine, {
      type: 'line',
      data: {
        labels: ['2025-04-01', '2025-04-02', '2025-04-03', '2025-04-04', '2025-04-05'],
        datasets: [{
          label: 'Cantidad de Actividades',
          data: [5, 7, 3, 6, 4],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.3
        }]
      },
      options: { responsive: true }
    });
  }
  
  if (document.getElementById('chart-pie')) {
    // Gráfico de Torta: Total de actividades por tipo
    const ctxPie = document.getElementById('chart-pie').getContext('2d');
    new Chart(ctxPie, {
      type: 'pie',
      data: {
        labels: ['Música', 'Deporte', 'Ciencias', 'Política', 'Tecnología', 'Otros'],
        datasets: [{
          data: [10, 15, 7, 3, 12, 5],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)'
          ]
        }]
      },
      options: { responsive: true }
    });
  }
  
  if (document.getElementById('chart-bar')) {
    // Gráfico de Barras: Actividades por mes y horario
    const ctxBar = document.getElementById('chart-bar').getContext('2d');
    new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
        datasets: [
          {
            label: 'Mañana',
            data: [5, 8, 6, 7],
            backgroundColor: 'rgba(255, 99, 132, 0.6)'
          },
          {
            label: 'Mediodía',
            data: [3, 5, 4, 6],
            backgroundColor: 'rgba(54, 162, 235, 0.6)'
          },
          {
            label: 'Tarde',
            data: [4, 6, 3, 5],
            backgroundColor: 'rgba(255, 206, 86, 0.6)'
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  