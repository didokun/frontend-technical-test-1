import React, { VoidFunctionComponent } from 'react';

import { mergeClassNames } from '../../utils/reactUtils';
import ChatForm from './ChatForm';
import ChatMessage from './ChatMessage';
import style from './Conversation.module.css'
import ProfileInformation from './ProfileInformation';

const Conversation: VoidFunctionComponent = () => {
  const elements: number[] = [...Array(10)];
  return (<>
  <div>
  <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
    <ProfileInformation />
    <div id="messages" className={mergeClassNames(["h-full flex flex-col flex-col-reverse space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch", style.messageContainer])}>
      {elements.map((_e, index) => <ChatMessage key={index} isReceived={index%2 === 0} />)}
    </div>
    <ChatForm/>
  </div>
</div>
</>
)
}

export default Conversation;