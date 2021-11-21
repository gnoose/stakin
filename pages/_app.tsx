import type {AppProps} from 'next/app'

import {DialogProvider} from '../components/ui-kit/dialog/dialog-context';

import '../styles/globals.css'
import '../styles/layout.css';

function MyApp({Component, pageProps}: AppProps) {
  return <DialogProvider>
    <Component {...pageProps} />
  </DialogProvider>
}

export default MyApp
