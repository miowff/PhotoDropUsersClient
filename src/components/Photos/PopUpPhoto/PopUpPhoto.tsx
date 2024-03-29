import { useEffect, useState } from "react";
import { PhotoButtonsGroup } from "../PhotoButtonsGroup/PhotoButtonsGroup";
import { PaymentPopUp } from "../../PaymentPopUp/PaymentPopUp";
import { Alert, AlertData } from "../../Alert";
import { PhotoExample, PhotoResponse } from "../../../models/photo";

interface PopUpPhotoProps {
  photo: PhotoResponse | PhotoExample;
  albumTitle: string;
  setPopUpPhotoVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export const PopUpPhoto = ({
  photo,
  albumTitle,
  setPopUpPhotoVisible,
}: PopUpPhotoProps) => {
  const { paid, id, albumId, url } = photo;
  const [isPaymentPopUpVisible, setPaymentPopUpVisible] =
    useState<boolean>(false);
  const [alert, setAlert] = useState<AlertData | null>(null);
  useEffect(() => {
    const closePopUpOnClickOutside = (event: MouseEvent) => {
      const popUpContainer = document.querySelector(
        ".pop-up-photo-container__image"
      );
      if (popUpContainer && popUpContainer === event.target) {
        setPopUpPhotoVisible(false);
      }
    };
    document.addEventListener("click", closePopUpOnClickOutside);
    return () => {
      document.removeEventListener("click", closePopUpOnClickOutside);
    };
  }, [setPopUpPhotoVisible]);
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
    };
    document.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="pop-up-photo-container container-with-bg">
      <Alert
        data={alert}
        onClose={() => {
          setAlert(null);
        }}
      />
      {isPaymentPopUpVisible && (
        <PaymentPopUp
          albumTitle={albumTitle}
          albumId={albumId.toString()}
          setPaymentPopUpVisible={setPaymentPopUpVisible}
        />
      )}
      <span
        className="pop-up-photo-container__close"
        onClick={() => setPopUpPhotoVisible(false)}
      ></span>
      <div className="container">
        <div className="pop-up-photo-container__image">
          <img
            className="pop-up-photo-container__photo"
            src={url}
            alt="full photo"
          />
        </div>
      </div>
      {paid ? (
        <div className="pop-up-photo-container__buttons">
          <PhotoButtonsGroup
            downloadPhotoUrl={url}
            photoName={id}
            setAlert={setAlert}
          />
        </div>
      ) : (
        <>
          {!isPaymentPopUpVisible && (
            <div className="pop-up-photo-container__button">
              <button
                className="pop-up-photo-container__unlock"
                onClick={() => {
                  setPaymentPopUpVisible(true);
                }}
              >
                Unlock photos
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
