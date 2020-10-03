import React  from 'react';
import LoginContext from '../account/Util';


function HomePage({location, match, history}){
    return <h1>HOME</h1>;
}

function HomeContent({location, match, history}){
    
    return 'Home';
}

function NoPage({location, match, history}){
    return "NOPAGE";
}


export {HomePage, HomeContent, NoPage } ;