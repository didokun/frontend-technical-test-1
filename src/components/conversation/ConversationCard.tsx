import Image from 'next/image';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState, VoidFunctionComponent } from 'react';

import { deleteConversation } from '../../services/conversationService';
import { Conversation as ConversationType } from '../../types/conversation';
import { isConversationSender } from '../../utils/conversationUtils';
import { timeSince } from '../../utils/dateUtils';
import Alert, { AlertState } from '../shared/Alert';
import ConfirmationModal from '../shared/ConfirmationModal';
import Svg from '../shared/Svg';
import { ConversationContext } from './Conversation';

type ConversationCardProps = {
  conversation: ConversationType;
}

const ConversationCard: VoidFunctionComponent<ConversationCardProps> = ({conversation}) => {
  const router = useRouter();
  const {conversations, setConversations} = useContext(ConversationContext);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [showAlert, setAlert] = useState<AlertState>({open: false, message: '', type: 'success'});
  const { senderId } = router.query;
  const isSender = isConversationSender(conversation, senderId as string);
  useEffect(() => {
    return () => setModalOpen(false);
  }, []);
  return (
    <>
      <ConfirmationModal 
        isOpen={isModalOpen}
        closeModal={() => setModalOpen(false)}
        confirmationMessage="Are you sure to delete this conversation ?"
        agreeButtonTitle='Yes'
        refuseButtonTitle='No'
        agreeAction={async () => {
          const {error} = await deleteConversation(conversation.id.toString());
          if(!error) {
            setAlert({open: true, message: 'Deleted with success !', type: 'success'});
            setConversations(conversations.filter(conv => conv.id !== conversation.id));
          } else {
              setAlert({open: true, message: error.toString(), type: 'error'});
              setModalOpen(false);
          }}}
      />
      <Alert {...showAlert} closeAlert={() => setAlert({...showAlert, open:false})} />
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
          <button 
            type="button"
            className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none cursor-pointer sm:mr-0 mr-4"
            onClick={() => setModalOpen(true)}>
              <Svg src="/images/close.svg" />
          </button>
        </div>
      </div>
    </>
  )
}

export default ConversationCard;