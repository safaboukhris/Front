import {Link ,useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { logout } from '../../redux/slices/userSlice';
import {searchBlog} from '../../redux/slices/blogSlice';
import "./menu.css"
import 'hint.css/hint.min.css';
import dark from "../../assets/dark.png"
import lightPep from "../../assets/light-pep.png"
import light from "../../assets/light.png"
import pepiniere from "../../assets/pepiniere.png"
import { FaSearch } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";



const Menu = ({theme,setTheme}) => {
    const { isAuth,user,userList,profilePicture  } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate= useNavigate()

    const toggle_mode = ()=>{
        theme == 'light'? setTheme("dark") : setTheme("light");
    }
    
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const[search,setSearch]=useState('');

    const handleSubmit=(e)=>{
        e.preventDefault();
        if (search.trim()){
            dispatch(searchBlog(search))
            navigate(`/search?searchQuery=${search}`)
        }else{
            navigate("/home");
        }
    }

    const toggleDropdown = () => setDropdownVisible(!dropdownVisible);
            //navbar sticky
    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const stickyThreshold = 50; 
        setIsSticky(scrollPosition > stickyThreshold);
    };
    
        useEffect(() => {
            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }, []);
    return (
        <div className={`formnavbar ${isSticky ? 'sticky' : ''}`}>
            <img src={theme === "light" ? pepiniere : lightPep } alt="pepiniere" className='logo'/>
            <Link to="/home" className='logoTitleLink'><span className='logoTitle'>Plant Nursery</span></Link>
            <img onClick={()=>{toggle_mode()}} src={theme =="light" ? dark : light} alt="" className='toggle-icon'/>
            <ul>
                
                {!isAuth ? <>
                        <Link to="/"><li>Home</li></Link>
                        <Link to="/login"><li>Login</li></Link>
                    </> :
                    <div className='nav-dropdown'>
                        <Link to="/" className='link'><li>Home</li></Link>
                        <Link to="/dashboard" ><li>Dashboard</li></Link>
                        <Link  to="/addblog"><li>Add blog</li></Link>
                        <Link  to="/contact"><li>Contact</li></Link>
                        <div className='searchDivv'>
                            <input type='text' placeholder='Search Blog ' value={search} onChange={e=>setSearch(e.target.value)} className='searchInput'  />
                            <button onClick={handleSubmit} className='searchButton'><FaSearch style={{fontSize:"22px", color:"green"}} /></button>
                        </div>
                        {isAuth && user && (
                        <span className='userNamee'><Link  to="/profile" className='link'><img src={profilePicture} style={{width:'20px', height:'20px'}} className='hint--bottom' aria-label="Logged As"/>{user.name}</Link></span>)}
                        <Link to="/login" onClick={() => dispatch(logout())} className='logoutIcon'><RiLogoutCircleRLine  style={{fontSize:"28px", color:"green"}}/></Link>
                    </div>
                    }
            </ul>
        </div>
    )
}

export default Menu
