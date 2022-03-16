import Image from 'next/image';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { VoidFunctionComponent } from 'react';

import { Conversation as ConversationType } from '../../types/conversation';
import { isConversationSender } from '../../utils/conversationUtils';
import { timeSince } from '../../utils/dateUtils';
import Svg from '../shared/Svg';

type ConversationCardProps = {
  conversation: ConversationType;
}

const ConversationCard: VoidFunctionComponent<ConversationCardProps> = ({conversation}) => {
  const router = useRouter();
  const { senderId } = router.query;
  const isSender = isConversationSender(conversation, senderId as string);
  return (
    <>
    <Link href={{pathname: '/message', query: { senderId, conversationId: conversation.id }}} passHref>
      <div className="flex-1 hover:bg-slate-200 hover:cursor-pointer">
        <div className="flex items-center px-4 py-4">
          <div  className="mr-4 ">
            <Image className="rounded-full shadow" width="48" height="48" src="/images/profile.jpg" alt="avatar" />
          </div>
          <div className="block w-full">
            <div className="flex items-center justify-between">
              
              <h2 className="text-lg font-semibold text-gray-900 -mt-1 flex items-center">
                <i className="h-4 w-4 mr-2"><Svg src={`/images/${isSender ? 'sent': 'received'}.svg`}/></i>
                <span>{isSender ? conversation.recipientNickname: conversation.senderNickname}</span>
              </h2>
              <small className="text-sm text-gray-700">{timeSince(conversation.lastMessageTimestamp)}</small>
            </div>
          </div>
        </div>
      </div>
    </Link>
    </>
  )
}

export default ConversationCard;