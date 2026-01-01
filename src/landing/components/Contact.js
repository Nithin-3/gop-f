import React from 'react';
import { useWindowDimensions } from '../../utils/util';

import {getInTouch} from '../../store/actions/main/authAction';

function ContactScreen() {
    const { width } = useWindowDimensions();

    // const [name, setName] = React.useState('');
    // const [email, setEmail] = React.useState('');
    // const [message, setMessage] = React.useState('');

    const submitData = (e) => {
        e.preventDefault();
        var d = new Date();

        console.log("qqq", e.target[0].value, e.target[1].value, e.target[2].value, d);

        var body = {
            name: e.target[0].value,
            email: e.target[1].value,
            message: e.target[2].value,
            time: d
        }

        getInTouch(body);
    }

    return (
        <div style={{ height: width >= 992 ? '90vh' : width >= 700 ? '110vh' : '130vh', display: 'flex', alignItems: 'center' }}>
            <div style={{ margin: '0 auto' }}>
                <h2 style={{ textAlign: 'center', color: '#FF1849', fontSize: '30px', marginBottom: '20px' }}>Get in touch</h2>

                <div style={{ fontSize: '20px', width: '80vw', margin: '0 auto', display: 'flex', flexDirection: width >= 992 ? 'row' : 'column', justifyContent: 'space-between' }}>
                    <div style={{ width: width >= 992 ? '45%' : '100%', marginBottom: width >= 992 ? '' : '20px', }}>
                        <form onSubmit={submitData}>
                            <div style={{ marginBottom: '10px' }}>
                                <label htmlFor='name' style={{ fontSize: '18px' }}>Name</label>
                                <br />
                                <input id='name' type='text' placeholder='Name'
                                    style={{ outline: 'none', marginTop: '-5px', border: '1px solid #FF1849', borderRadius: '10px', width: '100%', padding: '10px' }}
                                />
                            </div>

                            <div style={{ marginBottom: '10px' }}>
                                <label htmlFor='email' style={{ fontSize: '18px' }}>Email</label>
                                <br />
                                <input id="email" type="email" placeholder='Email'
                                    style={{ outline: 'none', marginTop: '-5px', border: '1px solid #FF1849', borderRadius: '10px', width: '100%', padding: '10px' }}
                                />
                            </div>

                            <div style={{ marginBottom: '10px' }}>
                                <label htmlFor='message' style={{ fontSize: '18px' }}>Message</label>
                                <textarea rows='4' id='message' placeholder='Message'
                                    style={{ backgroundColor: 'transparent', outline: 'none', marginTop: '-5px', border: '1px solid #FF1849', borderRadius: '10px', width: '100%', padding: '10px' }}>
                                </textarea>
                            </div>

                            <button type="submit" style={{ all: 'unset',cursor: 'pointer', backgroundColor: '#FF1849', width: '100%', borderRadius: '10px', padding: '10px 0', color: '#fff', textAlign: 'center' }}>
                                Send
                            </button>
                        </form>
                    </div>


                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px', width: width >= 992 ? '45%' : '100%' }}>
                        <div style={{ padding: '30px', borderRadius: '10px', boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom :'20px' }}>
                                <div style={{ color: '#FF1849', fontSize: '25px' }}>
                                    <i class="fa-solid fa-location-dot"></i>
                                </div>
                                <div style={{ padding: '0 20px' }}>
                                    <h3 style={{ color: '#FF1849', marginBottom: '10px' }}>
                                        Mobile
                                    </h3>
                                    <h6>
                                        +91 8008888869
                                    </h6>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }}>
                                <div style={{ color: '#FF1849', fontSize: '25px' }}>
                                    <i class="fa-solid fa-location-dot"></i>
                                </div>
                                <div style={{ padding: '0 20px' }}>
                                    <h3 style={{ color: '#FF1849', marginBottom: '10px' }}>
                                        Mail
                                    </h3>
                                    <h6>
                                        support@neurolingua.in
                                    </h6>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <div style={{ color: '#FF1849', fontSize: '25px' }}>
                                    <i class="fa-solid fa-location-dot"></i>
                                </div>
                                <div style={{ padding: '0 20px' }}>
                                    <h3 style={{ color: '#FF1849', marginBottom: '10px' }}>
                                        Adress
                                    </h3>
                                    <h6>
                                        Neuro Education Research Institute Road No-7, Near: Vidya Mandir High School, Vidyanagar, Serilingamapally, Rangareddy, Telangana-500050, India
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px', width: width >= 992 ? '45%' : '100%' }}>
                        <div style={{ padding: '30px', borderRadius: '10px', boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ color: '#FF1849', fontSize: '25px' }}>
                                        <i class="fa-solid fa-location-dot"></i>
                                    </div>
                                    <div style={{ padding: '0 20px' }}>
                                        <h3 style={{ color: '#FF1849', marginBottom: '10px' }}>
                                            Mobile
                                        </h3>
                                        <h6>
                                            +91 8008888869
                                        </h6>
                                    </div>
                                </div>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div style={{ color: '#FF1849', fontSize: '25px' }}>
                                            <i class="fa-solid fa-location-dot"></i>
                                        </div>
                                        <div style={{ padding: '0 20px' }}>
                                            <h3 style={{ color: '#FF1849', marginBottom: '10px' }}>
                                                Mail
                                            </h3>
                                            <h6>
                                                support@neurolingua.in
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ color: '#FF1849', fontSize: '25px' }}>
                                        <i class="fa-solid fa-location-dot"></i>
                                    </div>
                                    <div style={{ padding: '0 20px' }}>
                                        <h3 style={{ color: '#FF1849', marginBottom: '10px' }}>
                                            Adress
                                        </h3>
                                        <h6>
                                            Neuro Education Research Institute Road No-7, Near: Vidya Mandir High School, Vidyanagar, Serilingamapally, Rangareddy, Telangana-500050, India
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default ContactScreen;