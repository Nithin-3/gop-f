import React from 'react';
import Navigation from './../../landing/components/Nav';
import ContactScreen from './../../landing/components/Contact';
import Footer from './../../landing/components/Footer';

function Contact() {
    return (
        <>
            <div style={{ height: '10vh' }}>
                <Navigation />
            </div>
            <ContactScreen />
            <div>
                <Footer />
            </div>
        </>
    )
}

export default Contact;