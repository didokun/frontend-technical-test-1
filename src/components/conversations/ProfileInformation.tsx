import Image from 'next/image';
import Link from 'next/link';
import React, { VoidFunctionComponent } from 'react';

import Svg from '../shared/Svg';

const ProfileInformation: VoidFunctionComponent = () => {
  return (<>
    <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
      <div className="relative flex items-center space-x-4">
        <div className="relative">
          <span className="absolute text-green-500 right-0 bottom-0 z-10">
            <svg width={20} height={20}>
              <circle cx={8} cy={8} r={8} fill="currentColor" />
            </svg>
          </span>
          <Image className="w-10 sm:w-16 h-10 sm:h-16 rounded-full z-1" src="/images/profile.jpg" height="64" width="64" alt="Profile Picture" />
        </div>
        <div className="flex flex-col leading-tight">
          <div className="text-2xl mt-1 flex items-center">
            <span className="text-gray-700 mr-3">Anderson Vanhron</span>
          </div>
          <span className="text-lg text-gray-600">Junior Developer</span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Link href="/messages" passHref>
          <div className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none cursor-pointer sm:mr-0 mr-4">
            <Svg src="/images/close.svg" />
          </div>
        </Link>
      </div>
    </div>
</>
)
}

export default ProfileInformation;