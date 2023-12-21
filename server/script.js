document.addEventListener("DOMContentLoaded", function() {
    const addForm = document.getElementById("addForm");
    const tableBody = document.getElementById("vehiculosTableBody");
  
    // Evento de envío del formulario para el método POST
    addForm.addEventListener("submit", function(event) {
      event.preventDefault();
  
      const placa = document.getElementById("placaInput").value;
      const marca = document.getElementById("marcaInput").value;
      const modelo = document.getElementById("modeloInput").value;
      const año = document.getElementById("añoInput").value;
      const color = document.getElementById("colorInput").value;
  
      // Realizar la solicitud POST a la API para agregar un nuevo vehículo
      fetch("http://localhost:3001/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          placa,
          marca,
          modelo,
          año,
          color,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log("Vehículo agregado:", data);
          // Volver a cargar y mostrar los datos después de la adición
          loadAndDisplayData();
        })
        .catch(error => console.error("Error al agregar vehículo:", error));
    });
  
    // Función para cargar y mostrar los datos desde la API GET
    function loadAndDisplayData() {
      fetch("http://localhost:3001/api/vehiculos")
        .then(response => response.json())
        .then(data => {
          // Limpiar la tabla antes de agregar nuevos datos
          
          tableBody.innerHTML = "";
  
          // Iterar sobre los datos y agregar filas a la tabla
          data.forEach(vehiculo => {
            const row = createTableRow(vehiculo);
            tableBody.appendChild(row);
          });
        })
        .catch(error => console.error("Error al obtener datos:", error));
    }
  
    // Función para crear una fila de tabla con los datos del vehículo y botones de acción
    
    function createTableRow(vehiculo) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${vehiculo.placa}</td>
        <td>${vehiculo.marca}</td>
        <td>${vehiculo.modelo}</td>
        <td>${vehiculo.año}</td>
        <td>${vehiculo.color}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editVehicle('${vehiculo.placa}')">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="deleteVehicle('${vehiculo.placa}')">Eliminar</button>
        </td>
      `;
      return row;
    }
  
    // Cargar y mostrar los datos al cargar la página
    loadAndDisplayData();
  
    // Función para manejar la edición de un vehículo
    window.editVehicle = function(placa) {
      const marca = prompt("Ingrese la nueva marca:");
      const modelo = prompt("Ingrese el nuevo modelo:");
      const año = prompt("Ingrese el nuevo año:");
      const color = prompt("Ingrese el nuevo color:");
  
      // Realizar la solicitud PUT a la API para actualizar los datos del vehículo
      fetch(`http://localhost:3001/api/put/${placa}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          placa,
          marca,
          modelo,
          año,
          color,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log("Datos del vehículo actualizados:", data);
          // Volver a cargar y mostrar los datos después de la edición
          loadAndDisplayData();
        })
        .catch(error => console.error("Error al actualizar datos del vehículo:", error));
    };
  
    // Función para manejar la eliminación de un vehículo
    window.deleteVehicle = function(placa) {
      // Confirmar la eliminación antes de proceder
      if (confirm("¿Está seguro de que desea eliminar este vehículo?")) {
        // Realizar la solicitud DELETE a la API para eliminar el vehículo
        fetch(`http://localhost:3001/api/delete/${placa}`, {
          method: "DELETE",
        })
          .then(response => {
            if (response.ok) {
              console.log("Vehículo eliminado exitosamente");
              // Volver a cargar y mostrar los datos después de la eliminación
              loadAndDisplayData();
            } else {
              console.error("Error al eliminar vehículo");
            }
          })
          .catch(error => console.error("Error al eliminar vehículo:", error));
      }
    };
  });
  