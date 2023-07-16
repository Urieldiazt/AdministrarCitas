

//Variables ySelectores
const mascotainput = document.querySelector('#mascota');
const propietarioinput = document.querySelector('#propietario');
const telefonoinput = document.querySelector('#telefono');
const fechainput = document.querySelector('#fecha');
const horainput = document.querySelector('#hora');
const sintomasinput = document.querySelector('#sintomas');

const formulario = document.querySelector('#nueva-cita');
const listaCitas = document.querySelector('#citas');
let editando;

//eventsListenners
eventsListenners();
function eventsListenners(){
    mascotainput.addEventListener('input', agregandoCampo);
    propietarioinput.addEventListener('input', agregandoCampo);
    telefonoinput.addEventListener('input', agregandoCampo);
    fechainput.addEventListener('input', agregandoCampo);
    horainput.addEventListener('input', agregandoCampo);
    sintomasinput.addEventListener('input', agregandoCampo);

    formulario.addEventListener('submit', validarFormulario);
}

const citasObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}


//class
class Citas{
    constructor(){
        this.citas = [];
    }

    imprimirCita(cita){
        this.citas = [...this.citas, {...cita}];
    }

    eliminarCita(id){
        this.citas = this.citas.filter(cita => cita.id !== id);
    }

    editarCita(citaActualizada){
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita);
    }
}

class UI{
    imprimirAlerta(mensaje, tipo){
        const alerta = document.createElement('DIV');
        alerta.classList.add('alert', 'text-center');
        if(tipo === 'error'){
            alerta.classList.add( 'alert-danger');
        }else{
            alerta.classList.add('alert-success');
        }

        alerta.textContent = mensaje;

        document.querySelector('.agregar-cita').insertBefore(alerta, formulario);

        setTimeout(()=>{
            alerta.remove();
        },5000);
    }

    imprimirHTML(citas){
        //Limpiar HTMl
        this.limpiarHTML();

        citas.forEach(cita => {
            //destructuring 
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;
            
            //Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('P');
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder">Propietario: </span> ${propietario}
            `;

            const telefonoParrafo = document.createElement('P');
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder">Telefono: </span> ${telefono}
            `;

            const fechaParrafo = document.createElement('P');
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder">Fecha: </span> ${fecha}
            `;

            const horaParrafo = document.createElement('P');
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder">Hora: </span> ${hora}
            `;

            const sintomasParrafo = document.createElement('P');
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder">Sintomas: </span> ${sintomas}
            `;

            //btnBorrar 
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'mr-2');
            btnBorrar.innerHTML = `Eliminar
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            `;
            btnBorrar.onclick = ()=>{
                eliminarCita(id);
            }

            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = `Editar
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>
            `;
            btnEditar.onclick = ()=>{
                editarCita(cita);
            }


            //Agregar los parrafos al divCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnBorrar);
            divCita.appendChild(btnEditar);

            //Agregar las citas al HTMl
            listaCitas.appendChild(divCita);
        });  
    }

    limpiarHTML(){
        while(listaCitas.firstChild){
            listaCitas.removeChild(listaCitas.firstChild);
        }
    }
}

//Intanciar 
const ui = new UI;

//instanciar citas derntro de la funcion vuelve a crear el objeto
let cita = new Citas;



//functions
function agregandoCampo(e){
    citasObj[e.target.name] = e.target.value;
}

function validarFormulario(e){
    e.preventDefault();

    //destructuring
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citasObj;

    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    if(editando){
        ui.imprimirAlerta('Editado correctamente');

        //Pasar el objeto de la cita a edicion
        cita.editarCita({...citasObj});

        //regreasar estado de button
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        editando = false;

    }else{
        //generando un id unico
        citasObj.id = Date.now();
    
        //Creando una cita
        cita.imprimirCita({...citasObj});
  
        //mandando mensaje de exito
        ui.imprimirAlerta('Se agrego correctamnete la cita');
    }


    //Reseteando formulario
    formulario.reset();

    //Reseteando datos
    reiniciarDatos();

    //Mostrar HTMl
    const {citas} = cita;
    ui.imprimirHTML(citas);

}

function reiniciarDatos(){
    citasObj.mascota = '';
    citasObj.propietario = '';
    citasObj.telefono = '';
    citasObj.fecha = '';
    citasObj.hora = '';
    citasObj.sintomas = '';
}

function eliminarCita(id){
    //eliminar cita
    cita.eliminarCita(id);

    //Muestra un mensaje
    ui.imprimirAlerta('Se elimino la cita correctamente');

    //Refresca las citas
    const {citas} = cita;
    ui.imprimirHTML(citas);

}

//carga los datos y modo edicion

function editarCita(cita){
     //destructuring
     const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;


     //Llenar los input
    mascotainput.value = mascota;
    propietarioinput.value = propietario;
    telefonoinput.value = telefono;
    fechainput.value = fecha;
    horainput.value = hora;
    sintomasinput.value = sintomas;

    citasObj.mascota = mascota;
    citasObj.propietario = propietario;
    citasObj.telefono = telefono;
    citasObj.fecha = fecha;
    citasObj.hora = hora;
    citasObj.sintomas = sintomas;
    cita.id = id;

    //Cambiar texto
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;
}

