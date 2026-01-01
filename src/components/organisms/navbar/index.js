import React from 'react'
import Text from './../../atoms/text/index'
import logo from '../../../assets/images/logo.JPG'
// import menu from './../../../assets/landing assets/menu.png'
const style = require("./styles.module.css");


const Navbar = props => {

	return (
		<div className={style.navbarInner}>
            <div className={style.navbarInnerLeft}>
                <img src={logo} className={style.navbarInnerLeftlogo} alt=""/>
            </div>



            <div className={style.navbarInnerRight}>
                <div className={style.navbarInnerRightFindTeacher}>
                    <Text 
                        title="Find a Teacher"
                        theme="title1"
                        color="black"
                    />
                </div>
                <div className={style.navbarInnerRightLogin}>
                    <Text 
                        title="Log In"
                        theme="title1"
                        color="black"
                    />
                </div>
                <div className={style.navbarInnerRightSignup}>
                    <Text 
                        title="Sign Up"
                        theme="title1"
                        color="white"
                    />
                </div>
            </div>


            {/* <div className={style.navbarInnerRightMobile}>
                <img src={menu} className={style.navbarInnerRightMobileMenu} alt=""/>
            </div> */}

		</div>
	)
}

export default Navbar