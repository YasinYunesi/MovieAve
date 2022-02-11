import { useEffect, useState } from "react";
import { baseImgURL } from "../Api";
import "./MdLeft.scss";

const MdLeft = ({ cast, reviews }) => {
  // LOGIC /////////////////////////////
  const [cast1, setCast1] = useState([]);
  const [cast2, setCast2] = useState([]);
  const [mainReviews, setMainReviews] = useState([]);

  useEffect(() => {
    // grouping the casts
    setCast1(cast?.slice(0, 3));
    setCast2(cast?.slice(3, 6));

    // grouping the reviews
    setMainReviews(reviews?.slice(0, 2));
  }, [cast, reviews]);

  // the truncate func for banner discription
  function truncate(text, n) {
    return text?.length > n ? text.substr(0, n) + "..." : text;
  }

  // JSX /////////////////////////////
  return (
    <div className='md_left col-12 col-xl-6 mb-5 mb-xl-0'>
      {/* THE CAST START */}
      <div className='md_left_casts'>
        {/* the title */}
        <div className='md_left_line row pb-4'>
          <h1 className='col-2 me-4'>Starring</h1>
          <hr className='col-7 col-md-9 col-xl-8 col-xxl-9 mx-auto mx-md-0 mx-xl-auto my-auto' />
        </div>
        {/* the casts */}
        {cast1.length < 1 && cast2.length < 1 ? (
          <div className='col-5 mx-auto'>
            <h2 className='mt-3 text-center text-white-50'>No cast found!</h2>
          </div>
        ) : (
          <div className='md_left_casts_list d-md-flex'>
            <div className='d-flex col-12 col-md-6'>
              {cast1?.map((actor) => {
                return (
                  <div className='col-3 mx-auto me-4' key={actor.name}>
                    {actor.profile_path ? (
                      <div>
                        <div className='md_cast_img mb-2'>
                          <img className='w-100 h-100' src={`${baseImgURL}/${actor.profile_path}`} alt='cast pic' />
                        </div>
                        <h6>{actor.name}</h6>
                      </div>
                    ) : (
                      <div className='md_cast_empty h-100 w-100'>
                        <p className='p-3 h-75'>No image found !</p>
                        <h6 className='d-flex align-items-end'>{actor.name}</h6>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className='d-flex col-12 col-md-6'>
              {cast2?.map((actor) => {
                return (
                  <div className='col-3 mx-auto me-4' key={actor.name}>
                    {actor.profile_path ? (
                      <div>
                        <div className='md_cast_img mb-2'>
                          <img className='w-100 h-100' src={`${baseImgURL}/${actor.profile_path}`} alt='cast pic' />
                        </div>
                        <h6>{actor.name}</h6>
                      </div>
                    ) : (
                      <div className='md_cast_empty h-100 w-100'>
                        <p className='p-3 h-75'>No image found !</p>
                        <h6 className='d-flex align-items-end'>{actor.name}</h6>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {/* THE CAST END */}

      {/* THE REVIEWS START */}
      {/* the title */}
      <div className='md_left_line row pb-4 mt-5 pt-4'>
        <h1 className='col-2 me-4'>Reviews</h1>
        <hr className='col-7 col-md-9 col-xl-8 col-xxl-9 mx-auto mx-md-0 mx-xl-auto my-auto' />
      </div>
      <div className='md_left_reviews d-lg-flex justify-content-between'>
        {mainReviews?.length > 0 ? (
          mainReviews?.map((review) => {
            return (
              <div className='md_review col-12 col-lg-6 mb-3 mb-lg-0 me-3 p-4 rounded' key={review.id}>
                {/* the title and img */}
                <div className='d-flex align-items-end mb-3'>
                  <img
                    className='col-2 rounded-circle me-2'
                    src={
                      review.author_details.avatar_path?.includes("http") || !review.author_details.avatar_path
                        ? "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
                        : `${baseImgURL}/${review.author_details.avatar_path}`
                    }
                    alt='User profile'
                  />
                  <h3>{review.author}</h3>
                </div>
                <h6>{review.created_at?.substr(0, 10).replaceAll("-", " / ") || "2020"}</h6>
                <p className='mt-4 pt-2'>{truncate(review.content, 210)}</p>
                <a href={review.url} target='_blank' rel='noreferrer'>
                  <span>See full review</span>
                  <i className='fa fa-arrow-right ms-2'></i>
                </a>
              </div>
            );
          })
        ) : (
          <div className='col-5 mx-auto'>
            <h1 className='mt-3 text-center text-white-50'>No reviews found about this movie!</h1>
          </div>
        )}
      </div>
      {/* THE REVIEWS END */}
    </div>
  );
};

export default MdLeft;
