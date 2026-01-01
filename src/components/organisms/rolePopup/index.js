import React from 'react'
import classes from './styles.module.css'


import Text from '../../atoms/text'
import RoleContainer from '../../molecules/roleContainer'


const RolePopup = ({shownStatus, popupSetter, clicked}) => {


	const popupClass = shownStatus? [classes.popupContainer, classes.show].join(' '):classes.popupContainer


    return (
        <div className={popupClass} onClick={clicked}>
            <div className={classes.popup}>
                <div className={classes.popupTitle}>
                    <Text title="Welcome" theme='heading1' color="main" />
                </div>
                <div className={classes.popupBody}>
                    <Text title="Choose your role to get started" theme='title1' color="black" />
                </div>
                    <RoleContainer popupSetter={popupSetter} /> 
            </div>
            
        </div>
    )
}

export default RolePopup;
