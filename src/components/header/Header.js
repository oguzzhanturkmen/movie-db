import React from "react";
import HeaderLeft from "./HeaderLeft";
import HeaderUserProfile from "./HeaderUserProfile";
import HeaderUnsigned from "./HeaderUnsigned";

const isSignedIn = false;

function Header(props) {
const getSearchResults = (searchQuery) => {
  props.searchTerm(searchQuery);
}

  return (
    <div>
    <header className="header">
      <div className="header-layout  ">
        <HeaderLeft getSearchResults = {getSearchResults}> </HeaderLeft>
        {isSignedIn ? <HeaderUserProfile> </HeaderUserProfile> : <HeaderUnsigned></HeaderUnsigned>}
        
      </div>
    </header>
    </div>
  );
}

export default Header;
