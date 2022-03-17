import Image from 'next/image';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useContext, VoidFunctionComponent } from 'react';

import { deleteConversation } from '../../services/conversationService';
import { Conversation as ConversationType } from '../../types/conversation';
import { isConversationSender } from '../../utils/conversationUtils';
import { timeSince } from '../../utils/dateUtils';
import DeleteButton from '../shared/DeleteButton';
import Svg from '../shared/Svg';
import { ConversationContext } from './Conversation';

type ConversationCardProps = {
  conversation: ConversationType;
}

const ConversationCard: VoidFunctionComponent<ConversationCardProps> = ({conversation}) => {
  const router = useRouter();
  const {conversations, setConversations} = useContext(ConversationContext);
  const { senderId } = router.query;
  const isSender = isConversationSender(conversation, senderId as string);
  return (
    <>
      <div className="flex-1 hover:bg-slate-200 hover:cursor-pointer relative">
        <Link href={{pathname: '/message', query: { senderId, conversationId: conversation.id }}} passHref>
            <div className="flex items-center px-4 py-4">
              <div  className="mr-4 ">
                <Image className="rounded-full shadow" width="48" height="48" src="/images/profile.jpg" alt="avatar" />
              </div>
              <div className="block w-full mr-14">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 -mt-1 flex items-center">
                    <i className="h-4 w-4 mr-2"><Svg src={`/images/${isSender ? 'sent': 'received'}.svg`}/></i>
                    <span>{isSender ? conversation.recipientNickname: conversation.senderNickname}</span>
                  </h2>
                  <small className="text-sm text-gray-700">{timeSince(conversation.lastMessageTimestamp)}</small>
                </div>
              </div>
            </div>
        </Link>
        <div className="flex items-center space-x-2 absolute inset-y-0 right-4">
          <DeleteButton
                buttonClassName='bg-white inline-flex items-center justify-center rounded-lg border transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none cursor-pointer sm:mr-0 mr-4'
                apiCallback={() => deleteConversation(conversation.id.toString())}
                successCallback={() => setConversations(conversations.filter(conv => conv.id !== conversation.id))}
                iconSize={20}
              />
        </div>
      </div>
    </>
  )
}

export default ConversationCard;