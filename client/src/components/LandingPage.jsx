import React from 'react';
import {Link} from 'react-router-dom';
import  '../CSS/LandingPage.css';


export default function LandingPage(){
    return (
      
        <div id='justificado'>

            <div>
                <h1 className='title'>Bienvenido Aplicación Dog</h1>
                <Link to ='/home'>
                    <button className='boton'> Start  </button>
                </Link>
             </div>
            <div className="imaLoading">
                 <img src="https://i.pinimg.com/564x/b5/23/c7/b523c704fa41a279128054026243eba8.jpg" alt='not exist'/>
            </div>
     
        </div>
    )
}