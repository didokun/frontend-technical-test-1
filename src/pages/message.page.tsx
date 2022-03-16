import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import React, { FunctionComponent } from 'react';

import Layout from '../components/layout/Layout';
import Messages from '../components/messages/Messages';
import { getConversation } from '../services/conversationService';
import { getMessages } from '../services/messageService';
import { getUser } from '../services/userService';
import { isConversationSender } from '../utils/conversationUtils';

export const getServerSideProps = async ({query}: GetServerSidePropsContext) => {
  const {senderId, conversationId} = query as Record<string, string>;
  if(!senderId ||!conversationId) {
    return {
      notFound: true,
    };
  }
  try{
    const conversation = await (await getConversation(conversationId)).shift();
    const user =  await (await getUser(senderId)).shift();
    const messages = await getMessages(conversationId);
    if(!conversation || !user || !messages ) {
      throw Error;
    }
    return {
      props: {
        messages: messages?.sort((a, b) => a.timestamp - b.timestamp) ?? [],
        profile: isConversationSender(conversation, senderId) ? conversation.recipientNickname : conversation.senderNickname
      },
    }
  } catch(error) {
    console.error({error});
    return {
      notFound: true,
    };
  }
}
const MessagePage: FunctionComponent<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({
  messages,
  profile
}) => {
  return <Layout title={'message'}>
  <Messages messages={messages} profile={profile}/>
  </Layout>
};
export default MessagePage