import React from 'react'

import Navigation from './../../landing/components/Nav'
import CookiePolicyComponent from './../../landing/components/CookiePolicy'
import Footer from './../../landing/components/Footer'


const CookiePolicy = props => {
	return (
		<>
			<Navigation />
			<CookiePolicyComponent />
			<Footer />
		</>
	)
}

export default CookiePolicy