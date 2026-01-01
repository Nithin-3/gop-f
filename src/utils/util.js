import React from 'react';

export const getRole = () => {
  return JSON.parse(localStorage.getItem("userRole"))?.role;
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const validateEmail = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const getWindowDimensions = () => {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height
	};
}

export const useWindowDimensions = () => {
	const [windowDimensions, setWindowDimensions] = React.useState(
		getWindowDimensions()
	);

	React.useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowDimensions;
}