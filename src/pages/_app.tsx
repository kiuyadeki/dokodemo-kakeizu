import type { AppProps } from 'next/app';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import amplifyconfig from '../amplifyconfiguration.json';
import { WithAuthenticatorProps, withAuthenticator } from '@aws-amplify/ui-react';

Amplify.configure(amplifyconfig);

const Myapp = ( { Component, pageProps, signOut, user}: AppProps & WithAuthenticatorProps) => {
  return (
      <Component {...pageProps} />
  )
}

export default withAuthenticator(Myapp);