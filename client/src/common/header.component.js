import React from "react";

function Header(props) {
  return (
    <div className="card-header text-center">
      <h3>{props.headerText}</h3>
    </div>
  );
}

export default Header;
