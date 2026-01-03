import React from "react";
import Navigation from "./../../landing/components/Nav";
//import { capitalizeFirstLetter } from "/../../../utils/util";
import classes from "./styles.module.css";
import Blob1 from "../../assets/image/verification_blob.svg";
import Blob2 from "../../assets/image/verification_blob2.svg";
import Svg from "../../assets/image/Mar-Business_18 1.svg";
import { getRole } from "../../utils/util";


const VerifyEmailConfirmation = (props) => {
  const value = getRole();
  return (
    <main className={classes.verification_page}>
      <Navigation />
      <div className={classes.verification_section}>
        <img src={Blob2} alt="Blob" className={classes.up_blob} />
        <img src={Blob1} alt="Blob" className={classes.down_blob} />
        <div className={classes.left_section}>
          {props.emailVerified ? (
            <>
              <h2>Your Account has been verified</h2>
            </>
          ) : (
            <>
              <h2>
                Your account has been <br /> successfully created!
              </h2>
              <h4>
                Account activation link has been sent to your email, kindly check and login to your {value} dashboard.
                <br />
                {value === "student" ? "Enjoy learning" : "Enjoy teaching!"}
              </h4>
            </>
          )}
        </div>
        <div className={classes.right_section}>
          <img src={Svg} alt="Svg" />
        </div>
      </div>
    </main>
  );
};

export default VerifyEmailConfirmation;
