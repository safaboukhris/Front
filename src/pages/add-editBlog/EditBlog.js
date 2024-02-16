import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from "react-redux";
import { useParams } from 'react-router-dom';
import { updateblog } from '../../redux/slices/blogSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./addEditBlog.css"

const EditBlog = () => {



        const { id } = useParams();
        const dispatch=useDispatch();
               //get the blog data from redux store.
        const { blogList} = useSelector((state) => state.blog);
        const blog = blogList.find((blog) => blog._id === id) || {};
        const [updated,setupdateblog]=useState({})
        useEffect(() => {
          setupdateblog(blog);
      }, [blog]);
        const handleChange = (e) => {
            setupdateblog((prevUpdated) => ({ ...prevUpdated, [e.target.name]: e.target.value }));
              console.log(setupdateblog, 'update');
            };


  return (
    <div className='container-editblog'>
      <ToastContainer/>
      <br/>
            <h1 className='editBlogTitle'>Update Blog</h1><br/><br/>
            <input className='editInput' type='text' placeholder='add name' name='title'onChange={handleChange}></input>
            <input  className='editInput' type="text" placeholder="img URL" name='img' onChange={handleChange} ></input>
            <textarea className='editTextA'type='text' placeholder='add desc' name='desc'onChange={handleChange}></textarea>
            <button className='editButton' onClick={() => {dispatch(updateblog({ ...updated, _id: blog._id }));
                      toast.success('Blog updated successfully!', {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                      });
                  }}>Updating</button>
    </div>
  )
}

export default EditBlog


