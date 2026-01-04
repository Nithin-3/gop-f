import React from 'react'

import Navigation from './../../landing/components/Nav'
import Main from './../../landing/components/main'
import Work from './../../landing/components/work'
import Why from './../../landing/components/why'
import Carousels from './../../landing/components/carousel'
import Today from './../../landing/components/today'
import Footer from './../../landing/components/Footer'

const Landing = props => {
	React.useEffect(() => {
		window.$zoho = window.$zoho || {};
		window.$zoho.salesiq = window.$zoho.salesiq || {
			widgetcode:
				"e1a813777c016ef97a4922aa83d278ccebde3865c51db470b1f5c24462a201d33f8ead544833d0f81a0616d8118b5110",
			values: {},
			ready: function () { },
		};
		var d = document;
		var s = d.createElement("script");
		s.type = "text/javascript";
		s.id = "zsiqscript";
		s.defer = true;
		s.src = "https://salesiq.zoho.in/widget";
		var t = d.getElementsByTagName("script")[0];
		t.parentNode.insertBefore(s, t);
	}, [])
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
