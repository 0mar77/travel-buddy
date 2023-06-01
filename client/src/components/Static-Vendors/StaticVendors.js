import React from 'react';
import Veracruz from '../../images/veracruz.jpg';
import './StaticVendor.css';
import Guadalajara from '../../images/guadalajara.jpg';
import CDMX from '../../images/cdmx.jpg'
import Bikes from '../../images/bikes.webp'
import Tequila from '../../images/tequila.jpg'


function StaticVendor() {
    return (
        <>
            <div className='flex-container'>
                <div className="border-2 border-customComplementary p-2 my-3 bg-customSections text-customText card">
                    <img src={Veracruz} />
                    <h3 className="text-customPrimary my-1">Luis</h3>
                    <p className="text-white my-1">Location: Veracruz</p>
                    <p className="text-white my-1">Description: I am offering a night tour around Veracruz's best known bars at night! 🥂🍻</p>
                    <p>Phone Number: (123) 456 7890</p>
                </div>
                <div className="border-2 border-customComplementary p-2 my-3 bg-customSections text-customText card">
                    <img src={Bikes} />
                    <h3 className="text-customPrimary my-1">Moises</h3>
                    <p className="text-white my-1">Location: CDMX</p>
                    <p className="text-white my-1">Description: I will be giving a tour of the city on bikes!! 🚲</p>
                    <p>Phone Number: (123) 456 7890</p>
                </div>
                <div className="border-2 border-customComplementary p-2 my-3 bg-customSections text-customText card">
                    <img src={CDMX} />
                    <h3 className="text-customPrimary my-1">Fernando</h3>
                    <p className="text-white my-1">Location: CDMX</p>
                    <p className="text-white my-1">Description: I am offering a tour around Reforma, Presidente Masaryk and more!</p>
                    <p>Phone Number: (123) 456 7890</p>
                </div>
                <div className="border-2 border-customComplementary p-2 my-3 bg-customSections text-customText card">
                    <img src={Guadalajara} />
                    <h3 className="text-customPrimary my-1">Francisco</h3>
                    <p className="text-white my-1">Location: Guadalajara</p>
                    <p className="text-white my-1">Description: I am offering a tour around downdown Guadalajara to cover the Basilica, Plaza de Armas, San Juan de Dios and more!</p>
                    <p>Phone Number: (123) 456 7890</p>
                </div>
                <div className="border-2 border-customComplementary p-2 my-3 bg-customSections text-customText card">
                    <img src={Tequila} />
                    <h3 className="text-customPrimary my-1">Eduardo</h3>
                    <p className="text-white my-1">Location: Guadalajara</p>
                    <p className="text-white my-1">Description: Tequila tour 🥃</p>
                    <p>Phone Number: (123) 456 7890</p>
                </div>
            </div>
        </>
    );
  }

  export default StaticVendor;