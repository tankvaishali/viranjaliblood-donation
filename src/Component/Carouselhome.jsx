import React from 'react';
import { BsStars } from 'react-icons/bs';

function Carouselhome() {
  return (
    <div className='carouselhome'>
      <div className="overlay">
        <div className="content text-center text-md-start">
            <div className='pb-3 rounded-circle text-center text-md-start  mx-auto ms-lg-1 float-animation ' style={{width:"150px",height:"150px"}}>
                <img src="https://as2.ftcdn.net/jpg/05/59/73/69/1000_F_559736920_crlhU44gd3bWBhN485Sr44ahx9LU3oL1.jpg" alt="" className='img-fuid w-100 h-100 rounded-circle object-fit-cover' />
            </div>
          <h1 className="heading " style={{color:"yellow"}}>
           <span >   વિરાંજલી </span>  
           મહારક્તદાન શિબિર
          </h1>
          <div className='pera_div py-1'><BsStars /> જય જવાન સમિતિ પ્રેરીત</div>
          <div className='pera_div py-1'><BsStars /> ખોડલધામ સમિતિ આયોજીત</div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Carouselhome;
