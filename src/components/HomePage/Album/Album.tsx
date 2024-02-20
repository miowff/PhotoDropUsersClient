import { useNavigate } from "react-router-dom";
import { AlbumModel } from "../../../models/albums";
import { useState } from "react";
import { PhotoResponse } from "../../../models/photo";

interface AlbumProps {
  album: AlbumModel;
  preview: PhotoResponse;
}
export const Album = ({ album, preview }: AlbumProps) => {
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  return (
    <div
      className="album"
      onClick={() => {
        navigate(`/album/${album.id}`);
      }}
    >
      <div className="album-content">
        <img
          className="album-background-image"
          src={isImageLoaded ? preview.url : preview.preview}
          loading="lazy"
          onLoad={() => {
            setIsImageLoaded(true);
          }}
        />
      </div>
      <h6 className="album-title">{album.name}</h6>
    </div>
  );
};
