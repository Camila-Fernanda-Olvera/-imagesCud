var arrayImagenes = JSON.parse(localStorage.getItem("Imagenes")) || [];

var btnaddI = document.getElementById("btnaddI");

btnaddI.onclick = () => {
    let imagenI = document.getElementById("imagen");
    let imagen = imagenI.files[0];

    if (!imagen) {
        Swal.fire({
            icon: "error",
            title: "Oops!...",
            text: "Debes seleccionar una imagen"
        });
        return;
    }

    let reader = new FileReader();
    reader.onload = (e) => {
    let nuevaImagen = { imagen: e.target.result };
    arrayImagenes.push(nuevaImagen);
    localStorage.setItem("Imagenes", JSON.stringify(arrayImagenes));
    actualizarImagenes();
    };
    reader.readAsDataURL(imagen);
};

const actualizarImagenes = () => {
    let tabla = document.getElementById("tablacategorias");
    let tablaHTML = ``;

    arrayImagenes = JSON.parse(localStorage.getItem("Imagenes")) || [];

    arrayImagenes.forEach((img, i) => {
        tablaHTML += `
            <tr>
                <td><img src="${img.imagen}" width="100" class="rounded"></td>
                <td>
                    <button class="btn btn-danger" onclick="eliminarImagen(${i})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg></button>

                    <button class="btn btn-success" onclick="editarImagen(${i})" data-bs-toggle="modal" data-bs-target="#modaleditI"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                    </svg></button>
                </td>
            </tr>
        `;
    });

    tabla.innerHTML = tablaHTML;
};

const editarImagen = (index) => {
    let imagen = arrayImagenes[index].imagen;
    let imagenInput = document.getElementById("eimagen");
    document.getElementById("index").value = index;
};

const guardarI = () => {
    let index = document.getElementById("index").value;
    let imagenInput = document.getElementById("eimagen");
    let imagen = imagenInput.files[0];

    if (!imagen) {
        Swal.fire({
            icon: "error",
            title: "Oops!...",
            text: "Debes seleccionar una imagen"
        });
        return;
    }

    let reader = new FileReader();
    reader.onload = function(e) {
        arrayImagenes[index] = { imagen: e.target.result };
        localStorage.setItem("Imagenes", JSON.stringify(arrayImagenes));
        actualizarImagenes();
    };
    reader.readAsDataURL(imagen);
};

const eliminarImagen = (index) => {
    Swal.fire({
        title: "¿Estás seguro de eliminar la imagen?",
        showDenyButton: true,
        confirmButtonText: "Sí",
        denyButtonText: "No"
    }).then((result) => {
        if (result.isConfirmed) {
            arrayImagenes.splice(index, 1);
            localStorage.setItem("Imagenes", JSON.stringify(arrayImagenes));
            actualizarImagenes();
            Swal.fire("Eliminado", "", "success");
        }
    });
};
actualizarImagenes();