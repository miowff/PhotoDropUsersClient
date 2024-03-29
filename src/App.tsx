import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLazyGetCurrentUserQuery } from "./api/auth";
import { setUser } from "./redux/user/authSlice";
import { AppRoutes } from "./components/Routes";
import { UserModel } from "./models/user";

const App = () => {
  const [getUser] = useLazyGetCurrentUserQuery();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    getUser()
      .unwrap()
      .then((data: UserModel) => {
        if (data) {
          dispatch(setUser(data));
          if (location.pathname === "/start") {
            return navigate("/");
          }
          return navigate(location);
        }
      });
  }, []);
  return (
    <>
      <div className="wrapper">
        <AppRoutes />
      </div>
    </>
  );
};
export default App;
