import React from 'react';
import classes from './styles.module.css'

const Loader = props => {
    return(
        <>
            <div className={classes.mainContainer} id="loader">
                <div className={classes.spinner}>
                    
                </div>
            </div>
        </>
    )
}

export default Loader