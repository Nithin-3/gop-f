import React from "react";
import PropTypes from "prop-types";

import classes from "./styles.module.css";

// import IconContainer from "../../molecules/iconContainer";
import LoginInputContainer from "../../molecules/LoginInputContainer";
import SignupInputContainer from "../../molecules/SignupInputContainer";
import Separator from "../../atoms/separator";
import AuthFooter from "../../molecules/authFooter";
import { getRole } from "../../../utils/util";

const AuthForm = ({ type, typeSetter }) => {
  const role = getRole();
  return (
    <div className={classes.container}>
      {/*<IconContainer role={role} />*/}
      {/*<Separator text="or" />*/}
      {type ? <SignupInputContainer type={type} role={role} /> : <LoginInputContainer type={type} role={role} /> }
      <Separator />
      <AuthFooter type={type} typeSetter={typeSetter} />
    </div>
  );
};

AuthForm.prototype = {
  type: PropTypes.bool,
};

export default AuthForm;
