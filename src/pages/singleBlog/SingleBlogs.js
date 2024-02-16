import React,{useEffect} from 'react'
import{useSelector,useDispatch} from 'react-redux';
import {useParams,Link} from 'react-router-dom';
import moment from 'moment';
import {getSingleBlog } from "../../redux/slices/blogSlice"
import Spinner from '../../components/Spinner'
import './singleBlog.css';
import Comments from '../../components/comments/Comments';
import CommentsList from '../../components/comments/CommentsList';
import { IoCalendarNumberSharp } from "react-icons/io5";


    const SingleBlogs = () => {

            const dispatch = useDispatch();
            const {blog , isLoading, errors } = useSelector((state) => state.blog);
            const { id } = useParams();
            

                useEffect(() => {
                    if (id) {
                    dispatch(getSingleBlog(id));
                    }
                }, [dispatch,id]);
                    if (isLoading) {
                    return <p><Spinner/></p>;
                }
                    if (errors) {
                    return <p>Error: {errors.message}</p>; // Display the error message
                }

                    if (!blog) {
                    return <p>Blog not found</p>;
                }

        const { title, img, owner, Date, desc } = blog;


    return (
        <div className='singleblog-container'>
                <img  src={img} alt="img"  className='singleblog-img'/>
                <h1 className='singleblog-title'>{title}</h1>
                <p className='singleblog-date'><IoCalendarNumberSharp style={{fontSize:'20px',marginRight:'5px'}} />Published On: {moment(Date).fromNow()}</p>
                <p className='singleblog-desc'>{desc}</p>
                <Comments/>
                <CommentsList/>
                <Link to="/" className="buttonback flip">
                    <div className="arrow" />
                </Link>
        </div>
    )
}

export default SingleBlogs