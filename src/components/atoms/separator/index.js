import React from 'react'
import PropTypes from 'prop-types'

import classes from './styles.module.css'

const Separator = ({text}) => {
    return (
        <div className={classes.divider}>
            {text}
        </div>
    )
}

Separator.prototype={
    text:PropTypes.string
}

export default Separator
