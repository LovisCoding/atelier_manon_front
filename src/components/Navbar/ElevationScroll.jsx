import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useScrollTrigger } from "@mui/material";

export default function ElevationScroll({ children, setNavbarState, window }) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  useEffect(() => {
    setNavbarState({
      bgNavbar: trigger ? "primary.dark" : "transparent",
      textColor: trigger ? "text.white" : "text.primary",
      scrolled: trigger,
    });
  }, [trigger, setNavbarState]);

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  setNavbarState: PropTypes.func.isRequired,
  window: PropTypes.func,
};