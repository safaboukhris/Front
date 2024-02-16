import React,{ useState, useEffect } from 'react';
import PacmanLoader from "react-spinners/PacmanLoader";


const Spinner = () => {

    const [loading, setLoading] = useState(false);
        useEffect(()=>{
            setLoading(true)
            setTimeout(()=>{
                setLoading(false)
            },5000)
        },[])

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <PacmanLoader
                        color={'rgb(173, 8, 8)'}
                        loading={loading}
                        size={35}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    /> 
        </div>
    )
}

export default Spinner
