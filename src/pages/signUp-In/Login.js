import { React,useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signin } from '../../redux/slices/userSlice';
import "./style.css";
import { SiGnuprivacyguard } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";


const Login = () => {
    const {isAuth ,userList} = useSelector(state => state.user)
        console.log("isAuth", isAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data =>{console.log(data);
      dispatch(signin(data))
    }
    console.log("errors", errors);

      useEffect(() => {
        if(isAuth) navigate('/')
      }, [isAuth])


  return (
    <div className="container">
      <div className='wrapperlogin'>
        <div className='first'>
            <SiGnuprivacyguard  size={32} className='logologin' />
            <h1>Login</h1>
            <div className='socialmediaLogin'>
              <button className='buttonlogin google'><FcGoogle  size={30}/></button>
              <button className='buttonlogin facebook'><FaGithub  size={30}/></button>
            </div>
        </div>
        <div className="center2">
            <div className="line2" ></div>
        </div>
        <div className='second'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input className='inputRegistar' type="email" placeholder="email" {...register("email", {required: true, max: 20, min: 10, maxLength: 30})} /><br/>
                <p>{errors.email && "email is not valid"}</p>
              <input className='inputRegistar' type="password" placeholder="password" {...register("password", {required: true, max: 20, min: 6, maxLength: 12, pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i})} /><br/>
                <p>{errors.password && "password is not valid"}</p>
              <input type='submit' value="Send" className='submit'/>
                <p>Not a member ?<Link to="/register" className='loginlink'> Sign up Now </Link></p>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Login
