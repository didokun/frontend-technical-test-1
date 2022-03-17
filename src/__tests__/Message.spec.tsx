import { waitFor } from '@testing-library/dom';
import { render, screen } from '@testing-library/react';
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

import Message, {getServerSideProps} from '../pages/message.page';
import { Conversation } from '../types/conversation';
import { Message as MessageType } from '../types/message';
import { getCurrentTimestamps } from '../utils/dateUtils';
import { mockFetch, mockNextUseRouter } from '../utils/testUtils';

describe('Message', () => {
  const now = getCurrentTimestamps();
  const messages: MessageType[] = [
    {id: 2, conversationId: 1, timestamp: now, authorId: 1, body: "Bonjour c'est le second message de la première conversation"},
    {id: 3, conversationId: 1, timestamp: now-60*4, authorId: 2, body: "Bonjour c'est le troisième message de la première conversation"}
  ];
  const profile = 'Tata';
  const query = { senderId: "1", conversationId: "1" };
  mockNextUseRouter({query});
  mockFetch(messages);
  it('should get list of messages', async () => {
    const response = await getServerSideProps({query: query as ParsedUrlQuery} as GetServerSidePropsContext);
    expect("props" in response && response.props.messages).toEqual(messages);
  });
  it('should return not found where no query params', async () => {
    const response = await getServerSideProps({query: {} as ParsedUrlQuery} as GetServerSidePropsContext);
    expect("notFound" in response).toEqual(true);
  });
  it('should return not found where query params is invalid', async () => {
    const response = await getServerSideProps({query: { senderId: "100", conversationId: "100" } as ParsedUrlQuery} as GetServerSidePropsContext);
    expect("notFound" in response).toEqual(true);
  });
  it('should display empty message', async() => {
    const { getByTestId } = render(<Message messages={[]} profile={profile} />);
    await waitFor(() => {
      expect(getByTestId('messages')).toBeEmptyDOMElement();
    });
  });
  it('should display messages list', () => {
    render(<Message messages={messages} profile={profile} />);
    messages.map(message => {
      expect(screen.getByText(new RegExp(message.body, "i"))).toBeInTheDocument();
    })
  });
  // it('should display time ago', () => {
  //   render(<Message messages={messages} profile={profile} />);
  //   expect(screen.getByText(/minutes ago/)).toBeInTheDocument();
  //   expect(screen.getByText(/seconds ago/)).toBeInTheDocument();
  // });
});
