import { type AppType } from "next/dist/shared/lib/utils";
import "~/styles/globals.css";
import 'regenerator-runtime/runtime'

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
