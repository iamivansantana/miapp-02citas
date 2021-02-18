import React, { useEffect, useState } from 'react';
import Cita from './components/Cita';
import Formulario from './components/Formulario';
import PropTypes from 'prop-types';
function App() {

  //Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if (!citasIniciales) {
    citasIniciales = [];
  }
  

  //Arreglo de Citas
  const [citas, guardarCitas]= useState (citasIniciales);

  //useEffect para realizar ciertas operaciones cuando el state cambie
  useEffect(()=>{
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if (citasIniciales) {
      localStorage.setItem('citas',JSON.stringify(citas));
    }else{
      localStorage.setItem('citas',JSON.stringify([]));
    }

  },[citas]);


  //Funcion que tome las citas actuales y agregue la nueva

  const crearCita = cita =>{
    guardarCitas([...citas,cita]);
  }

  //Funcion que elimina cita por si Id
  const eliminaCita = id =>{
    const citasNuevas = citas.filter(cita=> cita.id !== id);
    guardarCitas(citasNuevas);
  }

  //Mensaje condicional
  const titulo = citas.length === 0 ? 'No Hay Citas':'Administra Tus Citas';

  return (
    <>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
              crearCita={crearCita}
            /> 
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita=>(
              <Cita
                key={cita.id}
                cita={cita}
                eliminaCita={eliminaCita}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

Formulario.propTypes={
  crearCita: PropTypes.func.isRequired,
}

export default App;
