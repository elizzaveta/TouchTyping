import React from 'react';
import {addResultsToLocalStorage} from "@/functions/localStorage";

function TestDev() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const targetElement:HTMLInputElement | null = document.getElementById('wpmInput') as HTMLInputElement | null;
        if(targetElement) addResultsToLocalStorage(parseInt(targetElement.value));
    }

    return (
        <div>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input id='wpmInput'></input>
                <button type='submit'>add wpm</button>
            </form>
        </div>
    );
}

export default TestDev;