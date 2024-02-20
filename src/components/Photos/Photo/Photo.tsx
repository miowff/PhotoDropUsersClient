import { useState } from "react";
import { PhotoResponse } from "../../../models/photo";

interface PhotoProps {
  photo: PhotoResponse;
  setPhoto: React.Dispatch<React.SetStateAction<PhotoResponse | null>>;
  setPopUpPhotoVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Photo = ({
  photo,
  setPhoto,
  setPopUpPhotoVisible,
}: PhotoProps) => {
  const { url, preview } = photo;
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  return (
    <div
      className="photo"
      onClick={() => {
        setPopUpPhotoVisible(true);
        setPhoto(photo);
      }}
    >
      <img
        className={"photo-img"}
        src={isLoaded ? url : preview}
        loading="lazy"
        onLoad={() => {
          setIsLoaded(true);
        }}
      />
    </div>
  );
};
