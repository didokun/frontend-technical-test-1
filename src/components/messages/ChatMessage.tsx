import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext, VoidFunctionComponent } from 'react';

import { deleteMessage } from '../../services/messageService';
import { Message } from '../../types/message';
import { timeSince } from '../../utils/dateUtils';
import { mergeClassNames } from '../../utils/reactUtils';
import DeleteButton from '../shared/DeleteButton';
import Tooltip from '../shared/Tooltip';
import { MessageContext } from './Messages';

type ChatMessageProps = {
  message: Message;
}

const ChatMessage: VoidFunctionComponent<ChatMessageProps> = ({message}) => {
  const router = useRouter();
  const { senderId } = router.query;
  const isSender = message.authorId === Number(senderId);
  const {messages, setMessages} = useContext(MessageContext);
  return (
  <>
    <div className={mergeClassNames(["flex items-end mt-3", isSender && 'justify-end'])}>
      <div className={mergeClassNames(["flex flex-col space-y-2 text-xs max-w-xs mx-2", !isSender ? 'order-2 items-start': 'order-1 items-end'])}>
        <div>
          <Tooltip innerText={timeSince(message.timestamp)}>
            <span className={mergeClassNames(["px-4 py-2 rounded-lg inline-block", !isSender ? 'rounded-bl-none bg-gray-300 text-gray-600': 'rounded-br-none bg-blue-600 text-white'])}>
              {message.body}
            </span>
            <div className="flex items-center space-x-2 absolute -top-2 -right-2">
              <DeleteButton 
                buttonClassName='bg-white inline-flex items-center justify-center rounded-lg border transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none cursor-pointer sm:mr-0 mr-4'
                apiCallback={() => deleteMessage(message.id.toString())}
                successCallback={() => setMessages(messages.filter(msg => msg.id !== message.id))}
                iconSize={12}
              />
            </div>
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