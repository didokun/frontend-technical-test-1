import React, { Dispatch, SetStateAction, useMemo, useState, VoidFunctionComponent } from 'react';

import { Conversation as ConversationType } from '../../types/conversation';
import EmptyData from '../shared/EmptyData';
import ConversationCard from './ConversationCard';

type ConversationProps = {
  conversations: ConversationType[];
}

export const ConversationContext = React.createContext<{
  conversations: ConversationType[];
  setConversations: Dispatch<SetStateAction<ConversationType[]>>;
}>({} as never);

const Conversation: VoidFunctionComponent<ConversationProps> = ({conversations}) => {
  const [conversationsItems, setConversations] = useState<ConversationType[]>(conversations);
  const conversationsList = useMemo(() =>  
  (
  <div className="bg-white shadow-lg rounded flex flex-col divide-y">
    {conversationsItems.map(conversation => <ConversationCard key={conversation.id} conversation={conversation} />)}
  </div>
  ), [conversationsItems] );
  return (
  <>
    <ConversationContext.Provider value={{conversations: conversationsItems, setConversations}}>
      {conversations.length ? 
          conversationsList
        : (<EmptyData listName='Conversations'/>)
      }
    </ConversationContext.Provider>
  </>
)
}

export default Conversation;