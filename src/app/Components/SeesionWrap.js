'use client'
import {SessionProvider} from 'next-auth/react';

const SessionWrpper = ({children})=>{
    return(
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
export default SessionWrpper;