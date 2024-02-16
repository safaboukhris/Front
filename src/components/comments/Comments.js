import React,{useState} from 'react';
import {toast } from 'react-toastify';
import './comments.css'

const Comments = () => {

    const [text,setText]= useState("");
    //form handler submit 
    const handleSubmit= (e)=>{
        e.preventDefault();
        if(text.trim === "" ) return toast.error( "Please enter a valid comment" );
        console.log({text});
    }

    return (
        <div>
            <form className='commentForm' onSubmit={handleSubmit}>
                <input  type='text' 
                    placeholder=' Add A Comment...' 
                    className='commentInput' 
                    value={text}
                    onChange={(e) => setText(e.target.value)}/>
                <button type='submit' className='commentButton'>
                    Comment
                </button>
            </form>
        </div>
    )
}

export default Comments
