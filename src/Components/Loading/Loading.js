import "./Loading.scss";

const Loading = () => {
  return (
    <div className='loading px-3 py-1'>
      <div className='sk-chase mx-auto'>
        <div className='sk-chase-dot'></div>
        <div className='sk-chase-dot'></div>
        <div className='sk-chase-dot'></div>
        <div className='sk-chase-dot'></div>
        <div className='sk-chase-dot'></div>
        <div className='sk-chase-dot'></div>
      </div>
    </div>
  );
};

export default Loading;
