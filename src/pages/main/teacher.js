import React from 'react'

import Navigation from './../../landing/components/Nav'
import TeacherComponent from './../../landing/components/Teacher'
import Footer from './../../landing/components/Footer'


const Teacher = props => {
	return (
		<>
			<Navigation />
			<TeacherComponent />
			<Footer />
		</>
	)
}

export default Teacher