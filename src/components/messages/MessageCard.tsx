import Image from 'next/image';
import Link from 'next/link'
import React, { VoidFunctionComponent } from 'react';


const MessageCard: VoidFunctionComponent = () => {
  return (<>
<Link href="/conversation" passHref>
<div className="flex-1 hover:bg-slate-200 hover:cursor-pointer">
  <div className="flex items-start px-4 py-4">
    <div  className="mr-4 ">
      <Image className="rounded-full shadow" width="48" height="48" src="/images/profile.jpg" alt="avatar" />
    </div>
    <div className="block w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 -mt-1">Brad Adams </h2>
        <small className="text-sm text-gray-700">22h ago</small>
      </div>
      <p className="mt-3 text-gray-700 text-sm">
        Lorem ipsum, dolor sit amet conse. Saepe optio minus rem dolor sit amet!
      </p>
    </div>
  </div>
</div>
</Link>
</>
)
}

export default MessageCard;