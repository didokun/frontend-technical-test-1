import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import React, { FunctionComponent } from 'react';

import Conversation from '../components/conversation/Conversation';
import Layout from '../components/layout/Layout';
import { getConversations } from '../services/conversationService';

export const getServerSideProps = async ({query}: GetServerSidePropsContext) => {
  const {senderId} = query;
  if(!senderId) {
    return {
      notFound: true,
    };
  }
  const conversations = await getConversations(senderId as string);
  return {
    props: {conversations: conversations?.sort((a, b) => a.lastMessageTimestamp - b.lastMessageTimestamp) ?? []},
  }
}
const ConversationPage: FunctionComponent<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({
  conversations
}) => {
  return <Layout title={'message'}>
    <Conversation conversations={conversations}/>
  </Layout>
};
export default ConversationPage