import React from 'react'
import './commentsList.css';
import { MdDelete } from "react-icons/md";
import { BiSolidEditAlt } from "react-icons/bi";
import swal from 'sweetalert';

const CommentsList = () => {

    const handleDeleteComment = ()=>{
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this comment!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                swal("Poof! Your comment has been deleted!", {
                icon: "success",
            });
        } else {
                swal("Your comment is safe!");
            }
        });
    }

    const handleUpdateComment = () =>{
        swal({
            title: "Comment Updated!",
            text: "You clicked the button!",
            icon: "success",
            button: "update!",
        });
    }
    return (
        <div className='commentsList'>
            <h4 className='commentListCount'>2 Comments</h4>
            <div className='commentItem'>
                    <div className='commentItemInfo'>
                        <div className='commentItemUsername'>
                            Nihed
                        </div>
                        <div className="commentDate">
                            2 hours ago
                        </div>
                    </div>
                    <p className='commentItemText'>this is an amazing blog</p>
                    <div className='commentItemIconWrapper'>
                        <BiSolidEditAlt  onClick={handleUpdateComment} style={{fontSize:'23px' , color:'#628F07', margin:'0 2px'}}/>
                        <MdDelete  onClick={handleDeleteComment}  style={{fontSize:'23px' , color:'#F5C61E', margin:'0 2px'}}/>
                    </div>
            </div>
            <div className='commentItem'>
                    <div className='commentItemInfo'>
                        <div className='commentItemUsername'>
                            Louay Ben youssef
                        </div>
                        <div className="commentDate">
                            1 day ago
                        </div>
                    </div>
                    <p className='commentItemText'>hello this is wonderful</p>
                    <div className='commentItemIconWrapper'>
                        <BiSolidEditAlt onClick={handleUpdateComment} style={{fontSize:'23px' , color:'#628F07', margin:'0 1px'}} />
                        <MdDelete onClick={handleDeleteComment}  style={{fontSize:'23px' , color:'#F5C61E' , margin:'0 1px'}}/>
                    </div>
                </div>
        </div>
    )
}

export default CommentsList
