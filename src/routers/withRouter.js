import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const withRouter = (Component) => {
	const Wrapper = (props) => {
		const navigate = useNavigate();
		const location = useLocation();
		return <Component navigate={navigate} {...props} location={location} />;
	};
	return Wrapper;
};
export default withRouter;
