import React,{useState} from 'react';
import { IoMdHeart } from "react-icons/io";

const Heart = () => {

    const [isLiked, setIsLiked] = useState(false);

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    };
    return (
        <div style={{ fontSize: '20px', color: isLiked ? 'red' : 'grey' }} onClick={handleLikeClick}>
            <IoMdHeart />
        </div>
    )
}

export default Heart
