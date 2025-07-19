import React from 'react'

function Imagessec() {
  return (
  <>
  <div className="bg_imagesec  py-3 overflow-hidden" >
    <div className="container">
        <div className="row justify-content-center">
     <div className='text-white text-center w-75 '>

               <h2 className='heading pt-2'>Your Donation Can Make Someone’s Life Better</h2>
            <p className='pera'>
                Even a single donation can save lives. Blood gives us energy by bringing oxygen and nutrients to the body's cells. Donate blood and be the reason for someone's existence.
            </p>
     </div>
            <div className="col-12 col-md-6 col-lg-4">
<div className="h-100  mt-2">
 <div className='p-4 bg-white borderdesign shadow'>
       <img src={require("../assets/images/free-blood-donate-stock-vector.jpg")} alt="" className= 'borderdesign p-2 img-fluid border border-3 border-danger' />
 </div>
</div>
            </div>
         
        </div>
    </div>
  </div>
  </>
  )
}

export default Imagessec