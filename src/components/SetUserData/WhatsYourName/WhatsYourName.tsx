import { useEffect, useState } from "react";
import { useSetFullNameMutation } from "../../../api/user";
import { isErrorWithMessage } from "../../../utils/errorParser";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setUser } from "../../../redux/user/authSlice";
import { useEnterKeyHandler } from "../../../hooks/useEnterKeyHandler";
import { Alert, AlertData } from "../../Alert";
import { UserModel } from "../../../models/user";

export const WhatsYourName = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [name, setName] = useState<string>("");
  const [alert, setAlert] = useState<AlertData | null>(null);
  const [setFullNameRequest] = useSetFullNameMutation();
  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(
    name.length === 0
  );
  const setFullName = async (name: string) => {
    try {
      const newName = await setFullNameRequest(name).unwrap();
      if (user) {
        const updatedUser: UserModel = {
          ...user,
          client: {
            ...user.client,
            name: newName,
          },
        };
        if (user.client.email) {
          dispatch(setUser(updatedUser));
          return navigate("/me");
        } else {
          dispatch(setUser(updatedUser));
        }
      }
      return navigate("/");
    } catch (err) {
      const error = isErrorWithMessage(err);
      console.log(err);
      if (error) {
        const { message } = err;
        setAlert({ message, isError: true });
      } else {
        setAlert({ message: "Unknown error", isError: true });
      }
    }
  };
  useEffect(() => {
    setIsButtonDisabled(name.length === 0);
  }, [name]);
  useEnterKeyHandler(async () => {
    setIsButtonDisabled(true);
    await setFullName(name);
    setIsButtonDisabled(false);
  });
  return (
    <div className="whats-your-name">
      <div className="container">
        <Alert
          data={alert}
          onClose={() => {
            setAlert(null);
          }}
        ></Alert>
        <div className="whats-your-name__inner-content">
          <div className="whats-your-name__title-container">
            <h4 className="default-title">Let’s get to know you</h4>
          </div>
          <input
            className="default-input whats-your-name__input-name"
            placeholder="What's your name?"
            onChange={handleNameInput}
          ></input>
          <div className="whats-your-name__button-container">
            <button
              className="default-button"
              disabled={isButtonDisabled}
              onClick={async () => {
                await setFullName(name);
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
