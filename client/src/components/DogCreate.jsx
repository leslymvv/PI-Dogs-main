import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, resState, postDogs } from "../actions/index";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import "../CSS/CreateDog.css";
import { validation } from "./Errores";


export default function DogCreate() {
  
  const  allTemperaments= useSelector((e) => e.temperament);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTemperaments());
    dispatch(resState(resState));
  }, [dispatch]);

  //*Estado para los inputs del form
  const [input, setInput] = useState({
    name: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    minlife_span: "",
    maxlife_span: "",
    image: "",
    temperament: [],
    createdInBd: false,
  });
  //*Estado para los errores
  const [errors, setErrors] = useState({});
  //*Estado para almacenar los perros que se crean en la BD
  const [dogs, setDogs] = useState([]);

  //*Handler para setear el estado input y error
  function handelChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validation(dogs,{
        ...input,
          [e.target.name]: e.target.value,
      })
    )
  }

  //* Función para determinar si el formulario esta lleno
  function isFormValid (errors, temperaments) {
    if(Object.keys(errors).length === 0 && temperaments.length > 0){
      return true;
    }else{
      return false;
    }
  }

  //* Handler para el submit, si el formulario es valido deja hacer el post
  function handleSubmit(e) {
    e.preventDefault();
    //! Se valida si el input tiene al menos un temperamento y que no haya errores en el resto del form
    if(isFormValid(errors, input.temperament)){
      let crear = {
        name: input.name.trim(),
        height: `${input.minHeight} - ${input.maxHeight}`,
        weight: `${input.minWeight} - ${input.maxWeight}`,
        life_span: `${input.minlife_span} - ${input.maxlife_span} years`,
        image: input.image.trim(),
        temperament: input.temperament.join(", "),
      };
      dispatch(postDogs(crear));
      setInput({
        name: "",
        minHeight: "",
        maxHeight: "",
        minWeight: "",
        maxWeight: "",
        minlife_span: "",
        maxlife_span: "",
        image: "",
        temperament: [],
        createdInBd: true,
      });
      setDogs([...dogs, crear]);
      alert('Dog Create!!')
    }else alert("Faltan campos por llenar")//! Si no esta lleno lanza una alerta y no deja enviar el form
  }
  
  //* Función para colocar un letrero donde informe que debe incluir al menos un temperamento
  function validateTemperament(temperament) {
    if (temperament.length === 0) {
      return "Note: must include at least one temperament";
    }
  }

  //* Handler para temperamentos
  function handleSelectTemperament(e) {
    if(!input.temperament.includes(e.target.value)){
      setInput({
        ...input,
        temperament: [...input.temperament, e.target.value],
      });
    } 
  }

  //* Handler para eliminar temperamentos
  function handleDelete(e) {
    e.preventDefault();
       setInput({
      ...input,
      temperament: input.temperament.filter((temp) => temp !== e.target.innerText),     
    });
  }

  return (
    <div className="fromPerfil">
      <div >
        <div>
          
          <Link to="/home">
            <button className="boton5">
              Home
            </button>
          </Link>
          <h1 className="titleForm">Create Dog</h1>
        </div>
        <div className="">
          <form className="fromPerfil" onSubmit={handleSubmit}>
          
            <div className="">
              <label className="title5">Name:</label>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={(e) => handelChange(e)}
                required
              /><br/><strong>{errors.name}</strong>

              <label className="title5">Height min:</label>
              <input
                type="number"
                name="minHeight"
                value={input.minHeight}
                onChange={(e) => handelChange(e)}
                required
              /><br/><strong>{errors.minHeight}</strong>

              <label className="title5">Height max:</label>
              <input
                type="number"
                name="maxHeight"
                value={input.maxHeight}
                onChange={(e) => handelChange(e)}
                required
              /><br/><strong>{errors.maxHeight}</strong>

              <label className="title5">Weight min:</label>
              <input
                type="number"
                name="minWeight"
                value={input.minWeight}
                onChange={(e) => handelChange(e)}
                required
              /><br/><strong>{errors.minWeight}</strong>

              <label className="title5">Weight max:</label>
              <input
                type="number"
                name="maxWeight"
                value={input.maxWeight}
                onChange={(e) => handelChange(e)}
                required
              ></input><br/><strong>{errors.maxWeight}</strong>

              <label className="title5">Life span min:</label>
              <input
                type="number"
                name="minlife_span"
                value={input.minlife_span}
                onChange={(e) => handelChange(e)}
                required
              /><br/><strong>{errors.minlife_span}</strong>

              <label className="title5">Life span max:</label>
              <input
                type="number"
                name="maxlife_span"
                value={input.maxlife_span}
                onChange={(e) => handelChange(e)}
                required
              /><br/><strong>{errors.maxlife_span}</strong>

              <label name="image" className="title5">
                Image:
              </label>
              <input
                name="image"
                value={input.image}
                placeholder='URL'
                onChange={(e) => handelChange(e)}
                required
              /><br/><strong>{errors.image_span}</strong>

              <label className="title5" value="temperament" name="temperament">
                {" "}
                Temperament:{" "}
              </label>
              <select
                className="boton5"
                onChange={(e) => handleSelectTemperament(e)}
              >
                <option>Temperaments</option>
                {allTemperaments &&
                  allTemperaments.map((e) => (
                    <option key={e.id} value={e.name}>
                      {e.name}
                    </option>
                  ))}
              </select><br/>

              {input.temperament.map((nombre) => {
                return (
                  <div className="concatFiltro">
                  <span key={nombre}>
                   
                    <button className="boton3" onClick={(nombre)=> handleDelete(nombre)}>
                      {nombre} 
                    </button>
                  </span>
                  </div>
                );  
              })}   
              <strong color="red">{validateTemperament(input.temperament)}</strong>
              <button
                className="boton5"
                type="submit"
              > Create new Dog
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="imgperfil">
        <img src="https://cdn.shopify.com/s/files/1/1956/7269/products/Boxer-dog-Art-Print_grande.jpg?v=1589294200" alt="perfil" />
      </div>
    </div>
  );
}