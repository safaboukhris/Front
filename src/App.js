import './App.css';
import 'hint.css/hint.min.css';
import {Routes,Route} from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/signUp-In/Register";
import Login from "./pages/signUp-In/Login";
import Menu from './components/menu/Menu';
import Footer from './components/footer/Footer';
import { useEffect, useState } from 'react';
import Contact from './pages/contact/Contact';
import AddEditBlog from './pages/add-editBlog/AddEditBlog';
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/profile/Profile';
import SingleBlogs from './pages/singleBlog/SingleBlogs';
import EditBlog from './pages/add-editBlog/EditBlog';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import ScrollToTop from './components/ScrollToTop';

function App() {

    const current_theme = localStorage.getItem('current_theme');
    const [theme,setTheme]= useState(current_theme ? 
      current_theme : 'light');

      useEffect(()=>{
          localStorage.setItem('current_theme',theme)
      },[theme])



  return (
    <div className={`App ${theme}`}>
      <header className="App-header">
        <Menu theme={theme} setTheme={setTheme} />
        <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/search" element={<Home/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/contact" element={ <PrivateRoute><Contact/></PrivateRoute>}/>
          <Route path="/addblog" element={<PrivateRoute><AddEditBlog/></PrivateRoute>}/>
          <Route path="/editblog/:id" element={<PrivateRoute><EditBlog/></PrivateRoute>}/>
          <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
          <Route path="/blog/:id" element={<PrivateRoute><SingleBlogs/></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        <Footer theme={theme}/>
      </header>
    </div>
  );
}

export default App;

