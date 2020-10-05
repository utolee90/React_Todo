import React, {useEffect, useState} from 'react';
import 'App.css';

export default function Empty({location}){
    useEffect(()=>{    
        console.log(location)
    }, [location])

    return <> </>;
}