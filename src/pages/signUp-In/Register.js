import { React,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,Link} from 'react-router-dom';
import { signup } from '../../redux/slices/userSlice';
import "./style.css";
import { FcGoogle } from "react-icons/fc";
import { SiGnuprivacyguard } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import 'hint.css/hint.min.css';


const Register = () => {

    const {isAuth, errors: err } = useSelector(state => state.user)
      console.log("isAuth", isAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {console.log(data);
        dispatch(signup(data))
      }
      console.log("errors", errors);

    useEffect(() => {
        if(isAuth) navigate('/')
    }, [isAuth, navigate])


  return (
      <form  onSubmit={handleSubmit(onSubmit)} className='formRegister'>
          <SiGnuprivacyguard  className='logoRegister'/><br/>
          <h1 className='registerationTitle'>Registration</h1>
          <p className='registerTitle'>Choose a regististration method</p>
        <div className="wrapper">
          <div className='left'>
            <input  className='inputRegistar'type="text" placeholder="name" {...register("name", {required: true, min: 10, maxLength: 20})} />
            <p className='error'>{errors.name && "name is required"}</p>
            <input className='inputRegistar' type="email" placeholder="email" {...register("email", {required: true, max: 20, min: 10, maxLength: 30})} />
            <p className='error'>{errors.email && "email is not valid"}</p>
            <p className='error'>{err && "email exit, please try to login"}</p>
            <input className='inputRegistar' type="password" placeholder="password" {...register("password", {required: true, max: 20, min: 6, maxLength: 12, pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i})} /><br/>
            <p className='error'>{errors.password && "password is not valid"}</p>
            <input type='submit' className='submit' value="Send"/>
          </div>
          <div className="center">
            <div className="line" ></div>
            <div className="or">OR</div>
          </div>
          <div className='right'>
            <button className='buttonRegister google'><FcGoogle  size={32}/></button>
            <button className='buttonRegister facebook'><FaGithub  size={32}/></button>
            <p>Already a member ?<Link to="/login" className='loginlink' > Sign in </Link></p>
          </div>
        </div>
      </form>
    
  )
}

export default Register
