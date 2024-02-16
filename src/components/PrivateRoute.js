import React from 'react';
import {useSelector} from 'react-redux'
import LoadingToRedirect from './LoadingToRedirect';


const PrivateRoute = ({children}) => {

    const { isAuth } = useSelector(state => state.user)
    return (
        <div>
            { isAuth ? children : <LoadingToRedirect/>}
        </div>
    )
}

export default PrivateRoute
