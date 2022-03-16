import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import React, { FunctionComponent } from 'react';

import Layout from '../components/layout/Layout';
import Messages from '../components/messages/Messages';
import { getConversation } from '../services/conversationService';
import { getMessages } from '../services/messageService';
import { getUser } from '../services/userService';
import { Message } from '../types/message';
import { isConversationSender } from '../utils/conversationUtils';

export const getServerSideProps: GetServerSideProps<{
  messages: Message[],
  profile: string
}> = async ({query}: GetServerSidePropsContext) => {
  const {senderId, conversationId} = query as Record<string, string>;
  if(!senderId ||!conversationId) {
    return {
      notFound: true,
    };
  }
  try{
    const conversation = await (await getConversation(conversationId)).shift();
    const user =  await (await getUser(senderId)).shift();
    const messages = await (await getMessages(conversationId)).sort((a, b) => a.timestamp - b.timestamp);
    if(!conversation || !user || !messages ) {
      throw Error;
    }
    const profile = isConversationSender(conversation, senderId) ? conversation.recipientNickname : conversation.senderNickname;
    return {
      props: {
        messages,
        profile
      },
    }
  } catch(error) {
    console.log({error});
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