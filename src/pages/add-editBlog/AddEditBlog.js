import React,{useState} from 'react';
import { useForm } from 'react-hook-form';
import {useDispatch,useSelector} from "react-redux";
import {  addblog} from '../../redux/slices/blogSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./addEditBlog.css"





        const AddEditBlog = () => {

                const dispatch=useDispatch();
                const [blog,setBlog]=useState();
                const [img, setImg] = useState('');
                const { register, handleSubmit, formState: { errors } } = useForm();
                const onSubmit = data => {
                    const blogData = { ...data, img:data.img.trim() };
                        dispatch(addblog(data));
                        toast.success('Blog added successfully!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        };


    return (
        <div>
            <ToastContainer/>
                {/* card to add blog */}
            <form onSubmit={handleSubmit(onSubmit)} className='addForm'>
                <h1 className='AddCardTitle'>Add Blog</h1><br/><br/>
                <input type="text" placeholder="title" {...register("title", {required: true})} className='addInput' />
                <input  type="text" placeholder="img URL"{...register("img")}    onError={(e) => e.target.src = ''} className='addInput'/>
                <textarea type="text" placeholder="desc" {...register("desc", {required: true})} className='addTextA'/>
                <input type="submit" className='addInput' />
            </form>
        </div>
        )
    }



export default AddEditBlog
