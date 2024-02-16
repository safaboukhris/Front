import React,{useState} from 'react';
import { AiFillLike } from "react-icons/ai";

const Like = () => {

    const [isLiked, setIsLiked] = useState(false);

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    };

    return (
        <div style={{ fontSize: '20px', color: isLiked ? 'blue' : 'grey', marginLeft:'8px' }} onClick={handleLikeClick}>
            <AiFillLike />
        </div>
    )
}

export default Like
