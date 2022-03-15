import { InferGetStaticPropsType } from 'next';
import React, { FunctionComponent } from 'react';

import Layout from '../components/layout/Layout';
import Messages from '../components/messages/Messages';
export const getStaticProps = async () => {

  return {
    props: {},
  }
}
const MessagePage: FunctionComponent<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({
}) => {
  return <Layout title={'message'}>
    <Messages/>
  </Layout>
};
export default MessagePage