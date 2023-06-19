import { React, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getName, getDogs } from "../actions/index";
import "../CSS/Search.css";

export default function Search() {
  const dispatch = useDispatch();
  

  useEffect(() => {
      dispatch(getDogs());
  }, [dispatch]);

  function handleInputChange(e) {
    e.preventDefault();
    const queryDogs = e.target.value;
    console.log(queryDogs);
    if(queryDogs.length > 0){
      dispatch(getName(queryDogs));
    }else{
      dispatch(getDogs());
    }
}

  
  return (
    <div>
         <div className="search">
      <input
        type="text"
        placeholder='Dog Breed...'
         onChange={(e) => handleInputChange(e)} 
        className='buscador'
      /><span className="buscador"> 🔍</span>
     </div> 
    </div>
  );
}