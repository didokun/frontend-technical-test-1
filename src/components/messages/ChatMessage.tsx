import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { VoidFunctionComponent } from 'react';

import { Message } from '../../types/message';
import { timeSince } from '../../utils/dateUtils';
import { mergeClassNames } from '../../utils/reactUtils';
import Tooltip from '../shared/Tooltip';

type ChatMessageProps = {
  message: Message;
}

const ChatMessage: VoidFunctionComponent<ChatMessageProps> = ({message}) => {
  const router = useRouter();
  const { senderId } = router.query;
  const isSender = message.authorId === Number(senderId);
  return (
  <>
    <div className={mergeClassNames(["flex items-end mt-3", isSender && 'justify-end'])}>
      <div className={mergeClassNames(["flex flex-col space-y-2 text-xs max-w-xs mx-2", !isSender ? 'order-2 items-start': 'order-1 items-end'])}>
        <div>
          <Tooltip innerText={timeSince(message.timestamp)}>
            <span className={mergeClassNames(["px-4 py-2 rounded-lg inline-block", !isSender ? 'rounded-bl-none bg-gray-300 text-gray-600': 'rounded-br-none bg-blue-600 text-white'])}>
              {message.body}
            </span>
          </Tooltip>
        </div>
      </div>
      <div  className={mergeClassNames([!isSender? 'order-1': 'order-2'])}>
        <Image className="w-6 h-6 rounded-full" src="/images/profile.jpg" width="24" height="24" alt="profile picture"/>
      </div>
    </div>
  </>
)
}

export default ChatMessage;