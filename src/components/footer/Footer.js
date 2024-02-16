import React from 'react';
import "./footer.css";
import {Link} from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { MdPlace } from "react-icons/md";

const Footer = ({theme,setTheme}) => {

    const toggle_mode = ()=>{
        theme == 'light'? setTheme("dark") : setTheme("light");
    }
    
    return (
        <div className = {`footer ${theme === 'dark' ? 'dark-mode' : ''}`}>
            <div className='sb_footer section_padding'>
                <div className='sb_footer_links'>
                    <div className="sb_footer_links_div">
                        <h4>About us</h4>
                        <p>Nurturing nature's elegance, our nursery is a haven for blossoming blooms, bringing joy and vitality to every garden.</p>
                        <div className='icons'>
                            <Link className="iconss" to="https://www.facebook.com"><FaFacebook /></Link>
                            <Link className="iconss" to="https://www.messenger.com"><FaFacebookMessenger /></Link>
                            <Link className="iconss" to="https://www.instagram.com"><FaInstagramSquare /></Link>
                            <Link className="iconss" to="https://www.youtube.com"><FaYoutube /></Link>
                        </div>
                    </div>
                    <div className="sb_footer_links_div">
                        <h4> Quick Links</h4>
                        <Link className="linkk" to="/">Home</Link>
                        <Link className="linkk" to="/register">blog</Link>
                        <Link className="linkk" to="/register">contact</Link>
                        <Link className="linkk" to="/register">register</Link>
                        <Link className="linkk" to="/login">login</Link>
                    </div>
                    <div className="sb_footer_links_div">
                        <h4>Contact us</h4>
                        <p><BsFillTelephoneFill />: +216 73 000 000</p>
                        <p><MdEmail />: Nursery@yahoo.fr </p>
                        <p><MdPlace />: 5090 rue thapsus </p>
                    </div>
                </div>
                <hr></hr>
                <div className='sb_footer_below'>
                    <div className='sb_footer_copyright'>
                        <p>@{new Date().getFullYear()} <span>plant Nursery</span>. All right reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
