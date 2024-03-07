import { useEffect, useState } from "react";
import { Album } from "../Album/Album";
import { PopUpPhoto } from "../../Photos/PopUpPhoto/PopUpPhoto";
import { usePreventVerticalScroll } from "../../../hooks/useHorizontalScroll";
import { handleScroll } from "../../../hooks/useHandleHorizontalScroll";
import { PhotosGroup } from "../../Photos/PhotosGroup/PhotosGroup";
import { AlbumModel } from "../../../models/albums";
import { PhotoResponse } from "../../../models/photo";

interface UserContentProps {
  albums: AlbumModel[];
  photos: PhotoResponse[];
}

export const UserContent = ({ albums, photos }: UserContentProps) => {
  const [photo, setPhoto] = useState<PhotoResponse | null>(null);
  const [isPopUpPhotoVisible, setPopUpPhotoVisible] = useState<boolean>(false);
  const [isScrollable, setIsScrollable] = useState<boolean>(false);
  useEffect(() => {
    if (window.innerWidth > 1200) {
      if (albums.length > 5) {
        setIsScrollable(true);
      } else {
        setIsScrollable(false);
      }
    } else {
      if (albums.length > 3) {
        setIsScrollable(true);
      } else {
        setIsScrollable(false);
      }
    }
  }, [albums]);
  usePreventVerticalScroll(".user-content__albums-container", isScrollable);

  return (
    <section className="user-content">
      {isPopUpPhotoVisible && (
        <PopUpPhoto
          albumTitle={
            albums.find((album) => {
              if (album.id === photo?.albumId) {
                return album;
              }
            })?.name as string
          }
          photo={photo as PhotoResponse}
          setPopUpPhotoVisible={setPopUpPhotoVisible}
        />
      )}
      <div className="container">
        <div className="user-content__inner">
          <div className="user-content__albums">
            <p className="default-bold-text user-content__title">Albums</p>
            <div
              className="user-content__albums-container"
              onWheel={(event) => handleScroll(event)}
            >
              {albums.map((album, index) => {
                const preview = photos.find((photo) => {
                  if (photo.albumId === album.id) {
                    return photo;
                  }
                });

                return (
                  <div key={index}>
                    <Album album={album} preview={preview as PhotoResponse} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="user-content__photos">
        <div className="container">
          <p className="default-bold-text user-content__title">All photos</p>
        </div>
        <div>
          <PhotosGroup
            photos={photos}
            setPopUpPhotoVisible={setPopUpPhotoVisible}
            setPhoto={setPhoto}
          />
        </div>
      </div>
    </section>
  );
};
