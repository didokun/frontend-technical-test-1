import React, { useMemo, VoidFunctionComponent } from 'react';

import { Conversation as ConversationType } from '../../types/conversation';
import EmptyData from '../shared/EmptyData';
import ConversationCard from './ConversationCard';

type ConversationProps = {
  conversations: ConversationType[];
}

const Conversation: VoidFunctionComponent<ConversationProps> = ({conversations}) => {
  const conversationsList = useMemo(() =>  
  (
  <div className="bg-white shadow-lg rounded flex flex-col divide-y">
    {conversations.map(conversation => <ConversationCard key={conversation.id} conversation={conversation} />)}
  </div>
  ), [conversations] );
  return (
  <>
    {conversations.length ? 
        conversationsList
      : (<EmptyData listName='Conversations'/>)
    }
  </>
)
}

export default Conversation;