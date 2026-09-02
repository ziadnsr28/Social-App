
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { authContext} from '../Context/AuthContext';

export default function AppProtectRouts({ children }: { children: React.ReactNode }) {
    const { Token } = useContext(authContext)!

    if (!Token) return <Navigate to="/auth/login" replace />;

    return <>{children}</>
}

