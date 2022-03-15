import React, { VoidFunctionComponent } from 'react';

import MessageCard from './MessageCard';

const Messages: VoidFunctionComponent = () => {
  const elements: number[] = [...Array(10)];
  return (<>
    <div className="bg-white shadow-lg rounded flex flex-col-reverse divide-y divide-y-reverse">
  {elements.map(index => (<MessageCard key={index} />))}  
  </div>  
</>
)
}

export default Messages;