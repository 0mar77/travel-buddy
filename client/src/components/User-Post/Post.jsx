import React from 'react';
import ImageCard from './ImageCard.jsx';
import veracruz from '../../images/veracruz.jpg';

const VenderCard = () => {
return (
    // Hard coded for now. Need to solve image uploading 
    <main className='App'>
        <ImageCard imgSrc={veracruz}>
            <h3 className='text-l font-bold'>Bar Hopping</h3>
            <div className='text-s'>
                <p className='text-s'>with Luis</p>
                <p>Email: 123@gmail.com</p>
                <p>Description: I am offering a night tour around Veracruz's best known bars at night!</p>
                <p>Cost: 1500</p>
            </div>
            
            {/* Creates like, save and share buttons. This part is not ready. Will be updated shortly */}
            {/* <div className='space-x-4 mt-4'>
                <button className='btn'>
                    <Heart />
                </button>
                <button className='btn'>
                    <Bookmark />
                </button>
                <button className='btn'>
                    <Share2 />
                </button>
            </div> */}
        </ImageCard>
    </main>
    
)
      

}
    
export default VenderCard;