import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import React, { FunctionComponent } from 'react';

import Conversation from '../components/conversation/Conversation';
import Layout from '../components/layout/Layout';
import { getConversations } from '../services/conversationService';
import { Conversation as ConversationType } from '../types/conversation';

export const getServerSideProps: GetServerSideProps<{
  conversations: ConversationType[]
}> = async ({query}: GetServerSidePropsContext) => {
  const {senderId} = query;
  if(!senderId) {
    return {
      notFound: true,
    };
  }
  const conversations = await getConversations(senderId as string);
  return {
    props: {conversations: conversations?.sort((a, b) => a.lastMessageTimestamp - b.lastMessageTimestamp)},
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