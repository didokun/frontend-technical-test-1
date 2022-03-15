import Image from 'next/image';
import React, { VoidFunctionComponent } from 'react';

import { mergeClassNames } from '../../utils/reactUtils';

type ChatMessageProps = {
  isReceived?: boolean;
}

const ChatMessage: VoidFunctionComponent<ChatMessageProps> = ({isReceived}) => {
  return (<>
  <div className={mergeClassNames(["flex items-end mt-3", !isReceived && 'justify-end'])}>
      <div className={mergeClassNames(["flex flex-col space-y-2 text-xs max-w-xs mx-2", isReceived ? 'order-2 items-start': 'order-1 items-end'])}>
        <div><span className={mergeClassNames(["px-4 py-2 rounded-lg inline-block", isReceived ? 'rounded-bl-none bg-gray-300 text-gray-600': 'rounded-br-none bg-blue-600 text-white'])}>Your error message says permission denied, npm global installs must be given root privileges.</span></div>
      </div>
      <div  className={mergeClassNames([isReceived? 'order-1': 'order-2'])}>
      <Image className="w-6 h-6 rounded-full" src="/images/profile.jpg" width="24" height="24" alt="profile picture"/>
      </div>
    </div>
</>
)
}

export default ChatMessage;