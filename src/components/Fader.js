import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../App.css";

const Fader = ({ text, on }) => {
  const [fadeProp, setFadeProp] = useState({
    fade: "fade",
  });
  const [op, setOp] = useState(1);

  return (
    <>
      <p className="fade" style={{ opacity: on }}>
        {text}
      </p>
    </>
  );
};

Fader.defaultProps = {
  text: "Hello World!",
  on: 0,
};

Fader.propTypes = {
  text: PropTypes.string,
  on: PropTypes.bool,
};

export default Fader;
