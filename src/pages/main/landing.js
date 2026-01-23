import React from 'react'

import Navigation from './../../landing/components/Nav'
import Main from './../../landing/components/main'
import Work from './../../landing/components/work'
import Why from './../../landing/components/why'
import Carousels from './../../landing/components/carousel'
import Today from './../../landing/components/today'
import Footer from './../../landing/components/Footer'

const Landing = props => {

	return (
		<>
			<Navigation />
			<Main />
			<Work />
			<Why />
			<Carousels />
			<Today />
			<Footer />
		</>
	)
}

export default Landing
