import React from 'react'
import classes from "./styles.module.css"
import rightImg from '../../../../assets/icons/rightImg.svg'
import AuthForm from '../../../organisms/authForm'
import Navigation from './../../../../landing/components/Nav'

import Text from '../../../atoms/text'

const Auth = ({ type, typeSetter, roleModal, path }) => {
	return (
		<div style={{ maxHeight: '100vh' }}>
			<div>
				<Navigation roleModal={roleModal} />
			</div>

			<div className={classes.mainContainer}>
				<div className={classes.leftContainer}>
					<div className={classes.form}>
						<Text title={type ? "Sign up" : "Log in"} theme='title1' />
						<AuthForm type={type} typeSetter={typeSetter} />
					</div>
				</div>
				<div className={classes.rightContainer}>
					<img src={rightImg} alt="login_img" style={{}} />
				</div>
			</div>
		</div>
	)
}

export default Auth