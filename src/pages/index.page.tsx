import { InferGetStaticPropsType } from 'next';
import React, { FunctionComponent } from 'react';

import Login from '../components/auth/Login';
import Layout from '../components/layout/Layout';
import { getUserList } from '../services/userService';

export const getStaticProps = async () => {
  const users = await getUserList();
  return {
    props: {users},
    revalidate: 3600
  }
}
const IndexPage: FunctionComponent<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({
  users
}) => {
  return <Layout title={"Login"} onlyHeader>
    <Login users={users}/>
  </Layout>
}

export default IndexPage;