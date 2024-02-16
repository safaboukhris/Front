import React ,{useState, useEffect} from 'react';
import {useDispatch,useSelector} from "react-redux";
import{Link,useNavigate} from "react-router-dom";
import { getblogs, deleteblog} from '../../redux/slices/blogSlice';
import Spinner from '../../components/Spinner';
import "./dashboard.css";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import ScrolToTopButton from '../../components/buttonScroll/ScrolToTopButton';
import { IoCalendarNumberSharp } from "react-icons/io5";


const Dashboard = () => {

    const navigate = useNavigate();
    const[blog,setBlog]=useState([]);
    const dispatch=useDispatch();
    const {blogList,isLoading}=useSelector(state => state.blog)
    const {user}=useSelector(state => state.user)
    

    useEffect(() => {
        dispatch(getblogs());
    }, [dispatch]);
            console.log(isLoading);
            console.log(blogList);

                // Navigate to the edit page with the blog id as a parameter 
            const handleUpdateClick = (id) => {
                navigate(`/editblog/${id}`);
            };

    return (
        <div>
            <p className='dashboardTitle'>Dashboard of :<span className='usernameDashboard'>{user?.name}</span></p>
            <div><p className='dashboarCount'>Number of blog:{blogList.length}</p></div>
            {isLoading && <Spinner/>}
                {Array.isArray(blogList) && blogList.map(el=>
            <div >
                    {/* card for blog created */}
                    <div className="blog-container">
                        <div className='image-blog-container'>
                            {el.img &&(<img src={el.img} alt="blog" className="img-blog" />)}
                        </div>
                        <div className='blog-content'>
                            <div className='blog-title'>
                                <h3>{el.title}</h3>
                            </div>
                            <div className='blog-body'>
                                <p className="date-blog"><IoCalendarNumberSharp style={{fontSize:'15px',marginRight:'5px'}} />Published on:{el.Date}</p>
                                <p className='date-blog'>Posted by : {user.name}</p>
                                <p className='text-blog'>{el.desc}</p>
                                <Link to={`/blog/${el._id}`}><span className='btn-readmore'>Read More</span></Link>
                            </div>
                        </div>
                        <button onClick={()=>dispatch(deleteblog(el))} className='btn-delete'><MdDelete style={{ color: '#F5C61E', fontSize: '2em' }}/></button>
                        <button onClick={() => handleUpdateClick(el._id)} className='btn-edit'><BiEdit style={{ color: '#679936', fontSize: '2em' }} /></button>
                    </div>
            </div>
            )}  
            <ScrolToTopButton/>
        </div>
) 
}

export default Dashboard

