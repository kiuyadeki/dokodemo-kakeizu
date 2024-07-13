import type { AppProps } from 'next/app';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import amplifyconfig from '../amplifyconfiguration.json';
import { WithAuthenticatorProps, withAuthenticator } from '@aws-amplify/ui-react';
import { RecoilRoot } from 'recoil';

Amplify.configure(amplifyconfig);

const Myapp = ( { Component, pageProps, signOut, user}: AppProps & WithAuthenticatorProps) => {
  return (
    <RecoilRoot>
      <Component {...pageProps} signOut={signOut} user={user} />
    </RecoilRoot>
  )
}

export default withAuthenticator(Myapp);