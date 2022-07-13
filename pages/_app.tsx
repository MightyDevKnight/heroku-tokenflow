import '../styles/globals.css'
import '../styles/toggle-switch.css';
import '../styles/figma.css';

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
