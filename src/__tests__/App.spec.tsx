import { render, screen } from '@testing-library/react';
import React from 'react';

import App from '../pages/index.page';

describe('App', () => {
  it('should render correctly App', () => {
    render(<App />);
    expect(screen.getByText(/Welcome/)).toBeInTheDocument();
  });
});
