import React from 'react';
import { TiArrowUpThick } from "react-icons/ti";
import './scrolToTopButton.css'

const ScrolToTopButton = () => {

    const scrolToTop = ()=>{
        window.scrollTo({
            top:0,
            behavior:'smooth'
        });
    }
    return (
        <div>
            <button onClick={scrolToTop} className='scroll-to-top-btn'><TiArrowUpThick style={{ color: '#679936', fontSize: '30px' }} /></button>
        </div>
    )
}

export default ScrolToTopButton
