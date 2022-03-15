import { InferGetStaticPropsType } from 'next';
import React, { FunctionComponent } from 'react';

import Conversation from '../components/conversations/Conversation';
import Layout from '../components/layout/Layout';
export const getStaticProps = async () => {

  return {
    props: {},
  }
}
const ConversationPage: FunctionComponent<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({
}) => {
  return <Layout title={'conversation'}>
    <Conversation/>
  </Layout>
};
export default ConversationPage