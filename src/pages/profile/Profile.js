import React,{useRef,useState,useEffect} from 'react';
import './profile.css';
import {useSelector,useDispatch}from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from "firebase/storage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {deleteUser,updateUser,getuser  } from "../../redux/slices/userSlice";
import { MdDelete } from "react-icons/md";



const Profile = () => {

        const fileRef = useRef(null);
        const dispatch = useDispatch();
        const navigate = useNavigate(); 
        const [image, setImage] = useState(undefined);
        const [formData,setFormData] = useState({})
        const [imagePerCent,setImagePerCent]=useState(0);
        const [imageError,setImageError] = useState(false);
        const [updated, setUpdated] = useState({})
        const {user,profilePicture,errors} = useSelector((state)=>(state.user))


        useEffect(()=>{
            if (image){
                handleFileUpload(image);
            }
        },[image]);
       
        const handleFileUpload = async(image)=>{
            const storage = getStorage();
            const fileName = new Date().getTime()+ image.name;  //create a unique name for the image to be stored in the firebase cloud storage bucket
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, image);
            uploadTask.on('state_changed', (snapshot) => {
                const progress =
                   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImagePerCent(Math.round(progress));
            },
            (error)=>{
                setImageError(true)
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => 
                    setFormData({...formData,profilePicture:downloadURL,_id: user._id})
            );});
        };

        const handleChange = (e)=>{
            setUpdated({...updated, [e.target.name]: e.target.value });
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }
            //delete user
        const handleDeleteUser = async () => {
            try {
                await dispatch(deleteUser(user._id));
                toast.success('user deleted successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                navigate('/login'); 
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        };

    
    return (
        <div className='profileContainer'>
            <ToastContainer/>
            <h1 className='profileHeader'>- Profile -</h1>
            <form className='profileForm'>
                <img src={formData.profilePicture || profilePicture} 
                    alt="profilepic" 
                    className='profilepic'
                    onChange={handleChange}
                    onClick={()=>fileRef.current.click()}
                />
                <input type='file' 
                    ref={fileRef} 
                    hidden accept="image/.*"
                    onChange={(e)=> setImage(e.target.files[0])}
                />
                <p className='uploadMessage'>{imageError ? (
                    <span>Error uploading image (file size must be less than 2MB)</span>) : imagePerCent>0 && imagePerCent<100 ? (<span>{`uploading:  ${imagePerCent} % `}</span>)
                    : imagePerCent ===100 ? (<span>Image upload successfully</span>) : ''}
                </p>
                <input type='text' 
                    placeholder='Username' 
                    name='name'
                    className='inputProfile' 
                    defaultValue={user.name} 
                    onChange={handleChange}
                />
                <input type='email' 
                    placeholder='email' 
                    name= 'email'
                    className='inputProfile'  
                    defaultValue={user.email} 
                    onChange={handleChange}
                />
                <input type='password' 
                    placeholder='password' 
                    name= 'password'
                    className='inputProfile' 
                    onChange={handleChange}
                />
                <button className='profileButton' onClick={()=>{dispatch(updateUser({...updated,_id:user._id}));
                        toast.success('user updated successfully!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            });
                        }}>update</button>
            </form>
           
            <div>
                <button onClick={handleDeleteUser } className='profileButton'>delete</button>
            </div>
            <p>{errors && "something went wrong  !!!!"}</p>
        </div>
    )
}

export default Profile
