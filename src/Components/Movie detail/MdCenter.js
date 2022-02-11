import { useEffect, useState } from "react";
import { baseImgURL } from "../Api";
import "./MdCenter.scss";

const MdCenter = ({ backdrops, posters }) => {
  // LOGIC ////////////////////////////////////////
  const [mainBackdrop, setMainBackdrop] = useState([]);
  const [centerPoster, setCenterPoster] = useState([]);
  const [centerBackdrop, setCenterBackdrop] = useState([]);
  const [bottomPoster, setBottomPoster] = useState([]);

  useEffect(() => {
    setMainBackdrop(backdrops?.length < 7 ? backdrops?.slice(1, 2) : backdrops?.slice(6, 7));
    setCenterBackdrop(backdrops?.length < 8 ? backdrops?.slice(2, 3) : backdrops?.slice(7, 8));
    setCenterPoster(posters.length < 5 ? posters?.slice(0, 1) : posters?.slice(1, 2));
    setBottomPoster(posters.length < 5 ? posters?.slice(1, 2) : posters?.slice(2, 3));
  }, [backdrops, posters]);

  // JSX ////////////////////////////////////////
  return centerPoster.length >= 1 && centerBackdrop.length >= 1 && bottomPoster.length >= 1 ? (
    <div className='md_center col-12 col-xxl-7'>
      {/* THE TOP BACKDROPS START */}
      <div className='col-11 mx-auto'>
        {mainBackdrop?.map((image) => {
          return <img className='col-12' src={`${baseImgURL}/${image.file_path}`} alt='movie poster' key={image.file_path} />;
        })}
      </div>
      {/* THE TOP BACKDROPS END */}

      {/* THE CENTER AND BOTTOM START */}
      <div className='col-11 mx-auto my-3 d-flex align-items-start justify-content-between'>
        {/* center left poster */}
        {centerPoster?.map((image) => {
          return <img className='col-6 me-4' src={`${baseImgURL}/${image.file_path}`} alt='movie poster' key={image.file_path} />;
        })}

        <div className='col'>
          {/* center backdrop */}
          <div className='col-12'>
            {centerBackdrop?.map((image) => {
              return (
                <img className='col-12 me-4' src={`${baseImgURL}/${image.file_path}`} alt='movie poster' key={image.file_path} />
              );
            })}
          </div>
          {/* bottom poster */}
          <div className='col-12 ms-auto mt-3'>
            {bottomPoster?.map((image) => {
              return <img className='col-12' src={`${baseImgURL}/${image.file_path}`} alt='movie poster' key={image.file_path} />;
            })}
          </div>
        </div>
      </div>
      {/* THE CENTER AND BOTTOM END */}
    </div>
  ) : (
    <div className='md_center col-12 col-xxl-7 d-flex align-items-center justify-content-center'>
      <h2 className='text-white-50 fw-light'>No poster found!</h2>
    </div>
  );
};

export default MdCenter;
