import React, { useState } from 'react'
// import uuid from 'uuid/v4';
import { v4 as uuidv4 } from 'uuid';

const Formulario = ({crearCita}) => {
    //Crear state de Citas
    const [cita,actualizarCita]=useState({
        mascota: '',
        propietario: '',
        fecha:'',
        hora:'',
        sintomas:''
    
    });

    const [error, actualizaError]= useState(false);


    //Funcion que se ejecuta cada que escribe en un imput
    //-----------------------------------------------------------------
    //e.target.name --- es para saber en que campo estoy escribiendo
    //e.target.value --- Recupera el valor de cualquier entrada.
    //[e.target.name]: e.target.value --- Recupera el nombre de la etiqueta y su valor para agregarlo en el name indicado
    const actualizarState = (e)=>{
       actualizarCita({...cita,[e.target.name]: e.target.value})
    }

    //Extraer los valores 
    const {mascota,propietario,fecha,hora,sintomas}=cita;

    //Cuando el usuario presiona agregar cita
    const submitCita = (e)=>{
        e.preventDefault();
        
        //Validar
        if (mascota.trim() === '' || propietario.trim() === '' 
        || fecha.trim() === ''|| hora.trim() === '' || sintomas.trim() === '') {
            actualizaError(true);
            return;
        }
        //Eliminar el mensaje previo de error
        actualizaError(false);
        
        //Asignar un ID
        cita.id= uuidv4();

        //Crear la Cita
        crearCita(cita);

        //Reiniciar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha:'',
            hora:'',
            sintomas:''
        })
        
    }


    return (
        <>
          <h2>Crear Cita</h2>
          {error?<p className="alerta-error">Todos los Campos son Obligatorios</p>  :null}
          <form
            onSubmit={submitCita}
          >
              <label> Nombre Mascota</label>
              <input
                type="text"
                name="mascota"
                className="u-full-width"
                placeholder="Nombre Mascota"
                onChange={actualizarState}
                value={mascota}
                />
              <label> Nombre Dueño</label>
              <input
                type="text"
                name="propietario"
                className="u-full-width"
                placeholder="Nombre Dueño de la Mascota"
                onChange={actualizarState}
                value={propietario}
                />
              <label> Fecha</label>
              <input
                type="date"
                name="fecha"
                className="u-full-width"
                onChange={actualizarState}
                value={fecha}
                />
              <label> Hora</label>
              <input
                type="time"
                name="hora"
                className="u-full-width"
                onChange={actualizarState}
                value={hora}
                />
               <label>Sintomas</label>
               <textarea
                className="u-full-width"
                name="sintomas"
                placeholder="Escribe aquí los sintomas"
                onChange={actualizarState}
                value={sintomas}
               ></textarea>
               
               <button
                type="submit"
                className="u-full-width button-primary"
               >Agregar Cita</button>
          </form>
          
        </>
    )
}

export default Formulario
