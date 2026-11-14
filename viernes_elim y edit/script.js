import { PortafolioService, Proyecto, SuperProyecto } from "./portafolioService.js";

const formulario = document.getElementById('formProyecto');
formulario.addEventListener('submit', createProyecto);

const proyectosService = new PortafolioService();
let idEditar = null;

function refresh() {
    const contenedorPadre = document.getElementById("projects__container");
    contenedorPadre.innerHTML = "";

    const proyectos = proyectosService.getProyectos();

    proyectos.forEach(a => {
      
        const proyectoDiv = document.createElement("div");
        proyectoDiv.classList.add("project");
        contenedorPadre.appendChild(proyectoDiv);
        proyectoDiv.id = a.id;

        const title = document.createElement("h3");
        title.textContent = a.nombre;
        proyectoDiv.appendChild(title);

        const descripcionNodo = document.createElement("p");
        descripcionNodo.textContent = a.descripcion;
        proyectoDiv.appendChild(descripcionNodo);

        const Tecno = document.createElement("p");
        Tecno.innerHTML = "<p><strong>Tecnologias</strong></p>";
        proyectoDiv.appendChild(Tecno);

        const tecDeSection = document.createElement("div");
        tecDeSection.classList.add("projects__section");
        proyectoDiv.appendChild(tecDeSection);

        const tecnoListUl = document.createElement("ul");
        for (let i = 0; i < a.tecnologias.length; i++) {
            const li = document.createElement("li");
            li.textContent = a.tecnologias[i];
            tecnoListUl.appendChild(li);
        }
        tecDeSection.appendChild(tecnoListUl);

        const colabTitle = document.createElement("p");
        colabTitle.innerHTML = "<p><strong>Colaboradores</strong></p>";
        proyectoDiv.appendChild(colabTitle);

        const colSection = document.createElement("div");
        colSection.classList.add("projects__section");
        proyectoDiv.appendChild(colSection);

        const colListUl = document.createElement("ul");
        for (let i = 0; i < a.coolaboradores.length; i++) {
            const col = document.createElement("li");
            col.textContent = a.coolaboradores[i];
            colListUl.appendChild(col);
        }
        colSection.appendChild(colListUl);

        const repositorio = document.createElement("div");
        repositorio.innerHTML = `Puedes encontrar el repositorio en <a href="${a.repositorio}">${a.repositorio}</a>`;
        proyectoDiv.appendChild(repositorio);

        const button = document.createElement("button");
        button.textContent = "Eliminar";
        button.id = a.id;
        proyectoDiv.appendChild(button);
        button.addEventListener("click", () => { eliminarProyecto(a.id) });

        const buttonModificar = document.createElement("button");
        buttonModificar.textContent = "Modificar";
        buttonModificar.id = a.id;
        proyectoDiv.appendChild(buttonModificar);
        buttonModificar.addEventListener("click", () => { editarProyecto(a.id) });

    });
}

function eliminarProyecto(proyectoId) {
    console.log(proyectoId);
    proyectosService.eliminarProyecto(proyectoId);
    refresh();
}

function editarProyecto(proyectoId) {
    const proyecto = proyectosService.getProyectos().find(p => p.id == proyectoId);

    formulario["name"].value = proyecto.nombre;
    formulario["description"].value = proyecto.descripcion;
    formulario["tecnologies"].value = proyecto.tecnologias.join('\n');
    formulario["contributors"].value = proyecto.coolaboradores.join('\n');
    formulario["repository"].value = proyecto.repositorio;

    idEditar = proyectoId;
}

function createProyecto(event) {
    event.preventDefault();

    const nombreProyecto = event.target["name"].value;
    const descripcionProyecto = event.target.description.value;
    const tecnologies = event.target["tecnologies"].value;
    const contributors = event.target["contributors"].value;
    const repository = event.target["repository"].value;

    const tecs = tecnologies.split('\n');
    const colaborators = contributors.split('\n');

    if (idEditar == null) {
        proyectosService.guardarProyecto(new Proyecto(nombreProyecto, tecs, descripcionProyecto, colaborators, repository));
    } else {
        proyectosService.actualizarProyecto(idEditar, new Proyecto(nombreProyecto, tecs, descripcionProyecto, colaborators, repository));
        idEditar = null;
    }

    event.target.reset();
    refresh();
}

    // Separar tecnologias del miltiline por linea
    // const multiline = multilineInput.split('\n');
