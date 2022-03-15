import React, { VoidFunctionComponent } from 'react';

import Svg from '../shared/Svg';

const ChatForm: VoidFunctionComponent = () => {
  return (<>

<div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      <div className="relative flex">
        <input type="text" placeholder="Write your message!" className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-3 bg-gray-200 rounded-md py-3" />
        <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">

        <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
           <Svg src="/images/attachment.svg"/>
          </button>
          <button type="button" className="inline-flex items-center justify-center rounded-full px-3 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
           <Svg src="/images/send.svg" />
          </button>
        </div>
      </div>
    </div>
</>
)
}

export default ChatForm;