import Drawer from "./Drawer";
import { useState } from "react";

function Sidebar(props) {
  const [isClicked, setIsClicked] = useState(false);
  const [isClickedFavorites, setIsClickedFavorites] = useState(false);
  const [genreId, setGenreId] = useState();

  function handleClick() {
    setIsClicked(!isClicked);
      }

  function sendGenreId(genreId, genreName) {
    setIsClicked();
    props.getGenreId(genreId, genreName);
    setIsClickedFavorites(false);
    props.isClickedFavorites(false);
    
  }

  function handleClickFavorites() {
    setIsClickedFavorites((prevIsClickedFavorites) => !prevIsClickedFavorites);
    props.isClickedFavorites(!isClickedFavorites);
  }
  

  return (
    <div>
      <nav className="sidebar">
        <div className="icons">
          <div className ={isClicked ?"sidebar-icon-container" : "" }>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 sidebar-icon"
            id="sidebar-icon"
            onClick={handleClick}
            
          >
            
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
            
          </svg>
          </div>
          <div className ={isClickedFavorites ?"sidebar-icon-container" : "" }>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 sidebar-icon "
            onClick={handleClickFavorites}
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 sidebar-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>
        </div>
      </nav>
      <Drawer
        isClicked={isClicked}
        headerInfo={props}
        onGenreClick={sendGenreId}
        
      ></Drawer>
    </div>
  );
}

export default Sidebar;
