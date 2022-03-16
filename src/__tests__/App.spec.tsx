import { render, screen } from '@testing-library/react';
import React from 'react';

import App, {getStaticProps} from '../pages/index.page';
import { mockFetch } from '../utils/testUtils';

describe('App', () => {
  const users = [{id:1, nickname: 'Toto', token: ''}, {id:2, nickname: 'Tata', token:''}];
  mockFetch(users);
  it('should get list of users', async () => {
    const response= await getStaticProps();
    expect(response.props.users).toEqual(users);
  })
  it('should display empty message', () => {
    render(<App users={[]} />);
    expect(screen.getByText(/Users list is empty/)).toBeInTheDocument();
  });
  it('should display users list', () => {
    render(<App users={users} />);
    users.map(user => {
      expect(screen.getByText(new RegExp(user.nickname, "i"))).toBeInTheDocument();
    })
  });
});
