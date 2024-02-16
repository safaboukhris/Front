import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import styled from "styled-components";
import'./contact.css';
import  contactImgg from "../../assets/contactImgg.jpg";
import { IoLocationSharp } from "react-icons/io5";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdWatchLater } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_1lh9hpp', 
                        'template_bgkiyjr', 
                        form.current, 
                        'YbOeYYrYvKsgplsNc'
                        )
        .then((result) => {
            console.log(result.text);
            console.log("message sent with succes")
            toast.success('email received !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }, (error) => {
            console.log(error.text);
        });
    };

return (
    <div>
        <div className='containerContact'>
        <ToastContainer/>
            <div className='box'>
                <img src={contactImgg} alt='flower' className='contactImg'/>
            </div>

            <div className='formContact'>
                <h1>Get in touch</h1>
                <p>Feel free to contact us if you have any questions or need help.</p>
                <StyledContactForm>
                    <form ref={form} onSubmit={sendEmail} >
                        <label>Name</label>
                        <input type="text" name="user_name" />
                        <label>Email</label>
                        <input type="email" name="user_email" />
                        <label>Message</label>
                        <textarea name="message" />
                        <input type="submit" value="Send" />
                    </form>
                </StyledContactForm>
            </div>

        </div>
        <div className='containerDiv'>
            <div className='contactInfo'>
                <h4><BsFillTelephoneFill />Call us</h4>
                <p>(+216)73000000<br/>(+216)73100100</p>
            </div>
            <div className='contactInfo'>
                <h4><IoLocationSharp />Location</h4>
                <p>5090-Monastir-Tunis</p>
            </div>
            <div className='contactInfo'>
                <h4><MdWatchLater />Hours</h4>
                <p>Mon-Fri:9am-5pm<br/>Sat-Sun:9am-3pm</p>
            </div>

        </div>
    </div>
    )

}

//style the contact page using styled components
const StyledContactForm = styled.div`
width: 400px;
display:flex;
justify-content:center;


form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 16px;

input {
    width: 100%;
    height: 35px;
    padding: 7px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(220, 220, 220);

    &:focus {
        border: 2px solid #628F07;
    }
}
textarea {
    max-width: 100%;
    min-width: 100%;
    width: 100%;
    max-height: 100px;
    min-height: 100px;
    padding: 7px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(220, 220, 220);

    &:focus {
        border: 2px solid #628F07;
    }
}

label {
    margin-top: 1rem;
    color:#64023b;
}

input[type="submit"] {
    margin-top: 2rem;
    cursor: pointer;
    background: #e7db2d;
    color: white;
    border: none;
    }
}
`;

export default Contact
