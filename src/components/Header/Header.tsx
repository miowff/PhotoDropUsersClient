import PhotoDropLogo from "/images/PhotoDropLogo.png";
import NoProfilePicture from "/images/NoProfilePicture.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
export const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useSelector((state: RootState) => state.auth.user);
  const [profilePicLink, setProfilePicLink] = useState(NoProfilePicture);
  useEffect(() => {
    if (user) {
      const { selfieUrl } = user.client;
      if (selfieUrl) {
        setProfilePicLink(selfieUrl);
      }
    }
  }, [user]);
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <a className="header__inner-logo">
            <img
              src={PhotoDropLogo}
              alt="logo"
              onClick={() => {
                navigate("/");
              }}
            ></img>
          </a>
        </div>
        {(pathname === "/" ||
          pathname === "/privacy-policy" ||
          pathname === "/terms-of-use") && (
          <a className="header__profile-thumb">
            <img
              src={profilePicLink}
              alt="profile thumbnail"
              onClick={() => {
                navigate("/me");
              }}
            ></img>
          </a>
        )}
      </div>
    </header>
  );
};
