import "react-international-phone/style.css";
import {
  StageContent,
  setCurrentStage,
} from "../../../redux/letsGetStarted/letsGetStartedSlice";
import { PhoneNumberUtil } from "google-libphonenumber";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEnterKeyHandler } from "../../../hooks/useEnterKeyHandler";
import { useRequestCode } from "../../../hooks/useRequestCode";
import { Alert, AlertData } from "../../Alert";
import { PhoneInput } from "react-international-phone";

const phoneUtil = PhoneNumberUtil.getInstance();
const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};
export const NumberInput = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlePhoneNumberInput = (newStage: StageContent) => {
    dispatch(setCurrentStage(newStage));
  };
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [alert, setAlert] = useState<AlertData | null>(null);
  const { handleRequest: requestCode } = useRequestCode({ setAlert });
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const handleNextAction = async () => {
    setIsButtonDisabled(true);
    await requestCode(phoneNumber);
    handlePhoneNumberInput({
      enteredNumber: phoneNumber,
    });
    setIsButtonDisabled(false);
    navigate(`/code-input/${phoneNumber}`);
  };
  useEnterKeyHandler(() => {
    if (!isButtonDisabled) {
      handleNextAction();
    }
  });

  return (
    <section className="number-input">
      <div className="container">
        <Alert
          data={alert}
          onClose={() => {
            setAlert(null);
          }}
        ></Alert>
        <div className="number-input__inner">
          <div className="number-input__title-container">
            <h4 className="default-title number-input__title">
              Let’s get started
            </h4>
          </div>
          <div className="number-input__content">
            <p className="number-input__text">Enter your phone number</p>
            <PhoneInput
              defaultCountry="us"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e);
                setIsButtonDisabled(!isPhoneValid(e));
              }}
              className="number-input__input"
              style={
                {
                  "--react-international-phone-flag-width": "30px",
                  "--react-international-phone-flag-height": "25px",
                  "--react-international-phone-height": "40px",
                  "--react-international-phone-country-selector-background-color":
                    "#F4F4F4",
                  "--react-international-phone-font-size": "16px",
                } as React.CSSProperties
              }
              inputStyle={{
                width: "330px",
                marginLeft: "10px",
                backgroundColor: "#F4F4F4",
                borderRadius: "10px",
                border: "1px solid #EEEEEE",
              }}
              countrySelectorStyleProps={{
                buttonStyle: {
                  backgroundColor: "#F4F4F4",
                  width: "70px",
                  borderRadius: "10px",
                  border: "1px solid #EEEEEE",
                },

                dropdownArrowStyle: {
                  width: "13.5px",
                  height: "6.5px",
                  background: "url(/images/DownArrow.svg) no-repeat",
                  backgroundSize: "cover",
                  "--react-international-phone-country-selector-arrow-size":
                    "0px",
                } as React.CSSProperties,
                dropdownStyleProps: {
                  style: {
                    outline: "none",
                  },
                },
              }}
            ></PhoneInput>

            <div className="number-input__button-container">
              <button
                className="default-button"
                disabled={isButtonDisabled}
                onClick={async () => {
                  await handleNextAction();
                }}
              >
                Create account
              </button>
            </div>

            <div className="number-input__privacy-policy">
              <div className="number-input__text-container">
                <p>
                  By proceeding, you consent to get WhatsApp or SMS messages,
                  from PhotoDrop and its affiliates to the number provided. Text
                  “STOP” to 89203 to opt out.
                </p>
              </div>
              <div className="number-input__privacy-policy-container">
                <p>
                  By continuing, you indicate that you have read and agree to
                  our{" "}
                  <a
                    onClick={() => {
                      navigate("/terms-of-use");
                    }}
                  >
                    Terms of Use
                  </a>{" "}
                  &{" "}
                  <a
                    onClick={() => {
                      navigate("/privacy-policy");
                    }}
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
