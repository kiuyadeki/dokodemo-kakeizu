import type { AppProps } from 'next/app';

const Myapp = ( { Component, pageProps}: AppProps) => {
  return (
      <Component {...pageProps} />
  )
}

export default Myapp;