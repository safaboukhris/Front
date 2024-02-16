import React ,{useEffect, useState}from 'react';
import "./home.css";
import 'hint.css/hint.min.css';
import caroussel3 from "../../assets/caroussel3.PNG";
import {getallblogs,setCurrentPage} from '../../redux/slices/blogSlice';
import {useDispatch , useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import ScrolToTopButton from '../../components/buttonScroll/ScrolToTopButton';
import Pagination from '../../components/pagination/Pagination';
import { GiFireFlower } from "react-icons/gi";
import Heart from '../../components/Heart';
import Like from '../../components/Like';



const Home = () => {
  
            const[blogs,setBlogs]=useState([]);
            const {isAuth,_id} = useSelector((state)=>({...state.user}));
            const { currentPage,numberOfPages} = useSelector((state) => ({...state.blog}));
            const userId = isAuth?.result?._id  || isAuth?.result?.googleId;
            const dispatch=useDispatch();
              useEffect(() => {
                  dispatch(getallblogs(currentPage));
                  }, [dispatch,currentPage]);
                  const blogList = useSelector(state => state.blog.blogList);
                  console.log(blogList)
                  useEffect(() => {
                    console.log("Blog List from Redux:", blogList);
                    setBlogs(blogList || []);
                  }, [blogList]);



  return (
    <div>
        <div className='homeINtroduction'>
          <div className='home-introduction'>
            <h1>Where Nature Blooms</h1>
            <h6>Explore the Green World of Our Plant Nursery Blog!</h6>
          </div>
          <img  className="imghome" src={caroussel3} alt='pepiniere-safa'/>
        </div>
        <div className='Paragraph'>
          <p className='h6paragraphe'>Welcome to our plant paradise!</p>
          <p className='paragraphe'>
            Explore the vibrant world of our nursery blog, where green dreams come to life.<br/> Discover plant care tips, beauty in every leaf, and the stories behind each blossom.<br/> Our blog section is your gateway to a world where every leaf has a story. Read, learn, and be inspired by our collection of green narratives.<br/> Feel free to contribute your own tales, update us on your plant journeys, and connect with fellow plant enthusiasts.<br/> Welcome to a space where the language of leaves unfolds, and your green story awaits.
          </p>
        </div>
        

        <h1 className='bloggtitle'><GiFireFlower  style={{marginRight:'10px'}}/>Welcome to our blogs<GiFireFlower style={{marginLeft:'10px'}} /> </h1>
        <div><p className='bloggNumber'>number of blogs:{blogs.length}</p></div>
      <div className='containerCardBlog'>
        {blogs !== null && blogs.map((blog) => (
              <div className="card-container">
                  <div className='image-container'>
                      {blog.img &&(<img src={blog.img} alt="blog" className="img" />)}
                  </div>
                  <div className='homeIconCard'>
                        <Heart/>
                        <Like/>
                      </div>
                  <div className='card-content'>
                      <div className='card-title'>
                          <h3>{blog.title}</h3>
                      </div>
                      <div className='card-body'>
                          <p className="date" style={{fontStyle:"italic"}}>Published on:{blog.Date}</p>
                          <p>{blog.desc}</p>
                      </div>
                    </div>
                    <Link to={`/blog/${blog._id}`} className='readmorelink'><p className='readmore'>Read More</p></Link>
              </div>
          ))}
        </div>
        <Pagination 
          setCurrentPage={setCurrentPage}
          numberOfPages={numberOfPages}
          currentPage={currentPage}
          dispatch={dispatch}/>
        <ScrolToTopButton/>
    </div>
  )
}

export default Home
