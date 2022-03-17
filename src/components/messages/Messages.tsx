import React, { Dispatch, SetStateAction, useMemo, useState, VoidFunctionComponent } from 'react';

import { Message } from '../../types/message';
import ChatForm from './ChatForm';
import ChatMessage from './ChatMessage';
import ProfileInformation from './ProfileInformation';

type MessagesProps = {
  messages: Message[],
  profile: string;
}

export const MessageContext = React.createContext<{
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
}>({} as never);

const Messages: VoidFunctionComponent<MessagesProps> = ({messages, profile}) => {
  const [messagesItems, setMessages] = useState<Message[]>(messages);
  const messagesList = useMemo(() =>  
  messagesItems.map(message => <ChatMessage key={message.id} message={message} />), [messagesItems]);
  return (
  <>
  <MessageContext.Provider value={{messages: messagesItems, setMessages}}>
  <div>
    <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-full min-h-[400px]">
      <ProfileInformation profile={profile} />
      <div className="px-4 pt-4 mb-2 sm:mb-0">
        <div data-testid="messages" className={"h-full flex flex-col space-y-4 p-3 overflow-y-auto scroll-bar-custom"}>
          {messagesList}
        </div>
        <ChatForm/>
      </div>
    </div>
  </div>
  </MessageContext.Provider>
</>
)
}

export default Messages;