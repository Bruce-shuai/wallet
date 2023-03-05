import { WagmiConfig } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
// import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { Layout } from "../components/Layout/Layout";
import { chains, client } from "../lib/wagmi";
import { options } from "../lib/swr";
import "@rainbow-me/rainbowkit/styles.css";
import "../styles/simplebar.min.css";
import "../styles/globals.css";
import { GTag } from "../components/Gtag";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();
  // 首页不能使用Layout布局
  const useLayout = router.route !== "/";
  const ILayout = useLayout
    ? Layout
    : (props: any) => <Fragment>{props.children}</Fragment>;

  console.log('chains', chains)
  console.log('client', client)
  return (
    // <SessionProvider session={session}>
      <WagmiConfig client={client}>
        <RainbowKitProvider chains={chains}>
          <ChakraProvider>
            <SWRConfig value={options}>
              <ILayout useWallet={(Component as any).useWallet}>
                <GTag />
                <Component {...pageProps} />
              </ILayout>
            </SWRConfig>
          </ChakraProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    // </SessionProvider>
  );
}
