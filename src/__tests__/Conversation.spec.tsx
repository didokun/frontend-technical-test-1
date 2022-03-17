import { render, screen } from '@testing-library/react';
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring'
import React from 'react';


import Conversations, {getServerSideProps} from '../pages/conversations.page';
import { Conversation } from '../types/conversation';
import { isConversationSender } from '../utils/conversationUtils';
import { getCurrentTimestamps } from '../utils/dateUtils';
import { mockFetch, mockNextUseRouter } from '../utils/testUtils';


describe('Conversations', () => {
  const now = getCurrentTimestamps();
  const query = { senderId: "1" };
  const conversations: Conversation[] = [
    {id:1, recipientId: 2, senderId: 1, recipientNickname: 'Tata', senderNickname: 'Toto', lastMessageTimestamp: now},
    {id:2, recipientId: 1, senderId: 3, recipientNickname: 'Toto', senderNickname: 'Fofo', lastMessageTimestamp: now-60*60},
    {id:3, recipientId: 4, senderId: 1, recipientNickname: 'Fifi', senderNickname: 'Toto', lastMessageTimestamp: now-60*4}
  ];
  mockFetch(conversations);  
  mockNextUseRouter({query});
  it('should get list of conversations', async () => {
    const response = await getServerSideProps({query: query as ParsedUrlQuery} as GetServerSidePropsContext);
    expect("props" in response && response.props.conversations).toEqual(conversations);
  });
  it('should return not found', async () => {
    const response = await getServerSideProps({query: {} as ParsedUrlQuery} as GetServerSidePropsContext);
    expect("notFound" in response).toEqual(true);
  });
  it('should display empty message', () => {
    render(<Conversations conversations={[]} />);
    expect(screen.getByText(/Conversations list is empty/)).toBeInTheDocument();
  });
  it('should display conversations list', () => {
    render(<Conversations conversations={conversations} />);
    conversations.map(conversation => {
      expect(screen.getByText(new RegExp(isConversationSender(conversation, query.senderId) ? conversation.recipientNickname: conversation.senderNickname, "i"))).toBeInTheDocument();
    })
  });
  it('should display receiver nickname', () => {
    const conversation = conversations.find(conv => conv.id === 1);
    render(<Conversations conversations={conversations} />);
    expect(screen.getByText(new RegExp(conversation.recipientNickname, "i"))).toBeInTheDocument();
  });
  it('should display sender nickname', () => {
    const conversation = conversations.find(conv => conv.id === 2);
    render(<Conversations conversations={conversations} />);
    expect(screen.getByText(new RegExp(conversation.senderNickname, "i"))).toBeInTheDocument();
  });
  it('should display time ago', () => {
    render(<Conversations conversations={conversations} />);
    expect(screen.getByText(/hours ago/)).toBeInTheDocument();
    expect(screen.getByText(/minutes ago/)).toBeInTheDocument();
    expect(screen.getByText(/seconds ago/)).toBeInTheDocument();
  });
});
