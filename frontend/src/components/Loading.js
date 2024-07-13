import React from 'react';

const Loading = () => {
  return (
    <div className='flex flex-row justify-center h-full w-full m-4'>
    <div className="flex flex-col h-[50%] w-[30%] justify-center items-center">
      <img src="" className='rounded-full'/>
      <h1 className='text-3xl text-white font-bold text-orange-500'>Loading...</h1>
    </div>
    </div>
  );
};

export default Loading;