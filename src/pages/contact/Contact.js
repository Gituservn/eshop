import React from 'react';
import './Contact.module.scss'
import stewie from '../../assets/stewie.png'

const stewieStyle={
    width:'100%'
}
const Contact = () => {
    return (
        <div>
            <img style={stewieStyle} src={stewie} alt=""/>
        </div>
    );
};

export default Contact;
