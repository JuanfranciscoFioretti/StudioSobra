import { AppProps } from 'next/app';
import i18n from '../i18n'; // Import the initialized i18n

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;