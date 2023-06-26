import React from "react";

function Header() {
  return (
    <div className="Header">
      <div className="headerTitle">SmartFace</div>
      <div className="headerLinks">
        <a href="/">Home</a>
        <a href="/login">Login</a>
        <a href="/profile">Profile</a>
      </div>
    </div>
  );
}

export default Header;
