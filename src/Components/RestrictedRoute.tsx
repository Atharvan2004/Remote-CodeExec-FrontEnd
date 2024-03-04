import { ReactNode } from 'react';
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

interface RootState{
    auth:{
        token:string|null;
    }
}

interface RestrictedRouteProps {
    children: ReactNode;
}

const RestrictedRoute = ({children}:RestrictedRouteProps) => {
    const {token} = useSelector((state: RootState) => state.auth);

    if(token!==null){
        return children;
    }else{
        return <Navigate to={'/login'}/>
    }
}

export default RestrictedRoute