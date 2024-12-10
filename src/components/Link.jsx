

import React from "react";
import { Link as MuiLink } from "@mui/material";
import { Link as ReactRouterLink } from "react-router-dom";

const Link = React.forwardRef(function Link(props, ref) {
  const { href, ...other } = props;
  return <MuiLink component={ReactRouterLink} ref={ref} to={href ?? "#"} {...other} />;
});

export default Link;
