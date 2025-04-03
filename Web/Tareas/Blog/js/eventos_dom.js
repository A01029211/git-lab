// archivo para las funciones js

// 1. Mostrar la posición del mouse
document.addEventListener("mousemove", function (e) {
    const pos = document.getElementById("mousePosition");
    pos.textContent = `Posición del mouse: X=${e.clientX} Y=${e.clientY}`;
});

// 2. Mostrar nombre completo al enviar formulario
document.getElementById("form1").addEventListener("submit", function (e) {
    e.preventDefault();
    const fname = document.getElementById("form-fname").value;
    const lname = document.getElementById("form-lname").value;
    const fullName = document.createElement("p");
    fullName.textContent = `Nombre completo: ${fname} ${lname}`;
    document.getElementById("form1").appendChild(fullName);
});

// 3. Insertar fila y columna en la tabla
document.getElementById("btn-insert-r").addEventListener("click", function () {
    const table = document.getElementById("sampleTable");
    const newRow = table.insertRow();
    for (let i = 0; i < table.rows[0].cells.length; i++) {
        const cell = newRow.insertCell();
        cell.textContent = `Row ${table.rows.length} column ${i + 1}`;
    }
});

document.getElementById("btn-insert-c").addEventListener("click", function () {
    const table = document.getElementById("sampleTable");
    for (let i = 0; i < table.rows.length; i++) {
        const cell = table.rows[i].insertCell();
        cell.textContent = `Row ${i + 1} column ${table.rows[i].cells.length}`;
    }
});

// 4. Cambiar contenido de la tabla por posición
document.getElementById("btn-change").addEventListener("click", function () {
    const row = parseInt(document.getElementById("rowIndex").value) - 1;
    const col = parseInt(document.getElementById("colIndex").value) - 1;
    const value = document.getElementById("newValue").value;
    const table = document.getElementById("myTable");

    if (row >= 0 && row < table.rows.length && col >= 0 && col < table.rows[0].cells.length) {
        table.rows[row].cells[col].textContent = value;
    } else {
        alert("Índices inválidos");
    }
});

// 5. Agregar o quitar colores en el select
document.getElementById("btn-add-color").addEventListener("click", function () {
    const colors = ["Blue", "Yellow", "Pink", "Purple", "Orange"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const option = document.createElement("option");
    option.textContent = randomColor;
    document.getElementById("colorSelect").appendChild(option);
});

document.getElementById("btn-rmv-color").addEventListener("click", function () {
    const select = document.getElementById("colorSelect");
    if (select.options.length > 0) {
        select.remove(select.options.length - 1);
    }
});

// 6. Cambiar la imagen de gato al pasar el mouse (evento mouseover)
// Se pre-carga la nueva imagen desde loremflickr para evitar el placeholder.
document.getElementById('imagenGato').addEventListener('mouseover', () => {
    const randomWidth = Math.floor(Math.random() * (600 - 300 + 1)) + 300;
    const randomHeight = Math.floor(Math.random() * (600 - 300 + 1)) + 300;
    const newSrc = `https://loremflickr.com/${randomWidth}/${randomHeight}/cat?random=${Date.now()}`;

    const tempImg = new Image();
    tempImg.src = newSrc;
    tempImg.onload = function() {
        document.getElementById('imagenGato').src = newSrc;
    };
});