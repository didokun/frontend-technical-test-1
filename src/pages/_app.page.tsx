import type { AppProps } from 'next/app';
import React from 'react';

import { getLoggedUserId } from '../utils/getLoggedUserId';
import '../styles/globals.css';

// Default way to get a logged user
export const loggedUserId = getLoggedUserId();

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;