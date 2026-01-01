import React from 'react'
import PropTypes from 'prop-types'
import classes from './styles.module.css'

const RadioButton = ({ onChange, id, name, value, label, icon, ...rest}) => {
    
    return (
            <label htmlFor={id} className={classes.radio_label}>
                <input onChange={onChange} type="radio" value={value} name={name} id={id}/>
                    <span className={icon?classes.radio_container:`${classes.radio_container} ${classes.radio_container_withoutIcon}`}>
                    { icon&& <img className={classes.radio_img} src={icon} alt={label} />}
                        <h2>{label}</h2>
                    </span>
            </label>
    )
}

RadioButton.propTypes={
    id:PropTypes.string.isRequired, 
    name:PropTypes.string.isRequired,
    value:PropTypes.string.isRequired,
    label:PropTypes.string.isRequired,
    icon:PropTypes.string,
    iconHeight:PropTypes.string,
    iconWidth:PropTypes.string
}

export default RadioButton
