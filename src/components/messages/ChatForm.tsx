import { useRouter } from 'next/router';
import React, { useContext, useState, VoidFunctionComponent } from 'react';

import { createMessage } from '../../services/messageService';
import { Message } from '../../types/message';
import { getCurrentTimestamps } from '../../utils/dateUtils';
import { mergeClassNames } from '../../utils/reactUtils';
import Alert, { AlertState } from '../shared/Alert';
import Svg from '../shared/Svg';
import { MessageContext } from './Messages';

const ChatForm: VoidFunctionComponent = () => {
  const router = useRouter();
  const {messages, setMessages} = useContext(MessageContext);
  const [messageText, setMessageText] = useState('');
  const [showAlert, setShowAlert] = useState<Pick<AlertState, 'open' | 'message'>>({open: false, message: ''});
  const { conversationId, senderId } = router.query;
  const submitMessage = async() => {
    if(messageText.length && conversationId) {
      const {data, error} = await createMessage(conversationId as string, {
          timestamp: getCurrentTimestamps(), 
          body: messageText,
          conversationId: Number(conversationId),
          authorId: Number(senderId)
        });
      if(!error && data) {
        const message: Message = {...data, conversationId: Number(conversationId), authorId: Number(senderId)};
        setMessages([...messages, message]);
      } else {
        setShowAlert({open: true, message: error.toString()});
      }
      setMessageText('');
    }
  }
  return (
  <>
      <Alert {...showAlert} closeAlert={() => setShowAlert({...showAlert, open:false})} type="error" />
      <div className="relative flex">
        <input 
          type="text"
          placeholder="Write your message!"
          className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-3 bg-gray-200 rounded-md py-3"
          onChange={(e) => setMessageText(e.target.value)}
          value={messageText}
          onKeyDown={(e) => e.key ==='Enter' ? submitMessage(): null}
        />
        <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
          <button 
            type="button" 
            className={
              mergeClassNames([
                "inline-flex items-center justify-center rounded-full px-3 py-3 transition duration-500 ease-in-out text-white focus:outline-none",
                messageText.length ? 'bg-blue-500 hover:bg-blue-400': 'bg-gray-500 hover:bg-gray-400'
              ])}
            onClick={() => submitMessage()}
            disabled={!messageText.length}
            aria-label="Send message"
          >
            <Svg src="/images/send.svg" />
          </button>
        </div>
      </div>
  </>
)
}

export default ChatForm;