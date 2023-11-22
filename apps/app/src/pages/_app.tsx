/* eslint-disable react/prop-types */
import "~/styles/globals.css";
import "@design-system/react/styles.css";
import type { AppType } from "next/app";
import { Inter } from "@next/font/google";

import { MainLayout } from "~/components/Layout";
import { api } from "~/services/api";
import Head from "next/head";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

type MyAppType = AppType;

const MyApp: MyAppType = ({
  Component,
}) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const Layout = Component.layout || MainLayout;

  return (
      <div className={inter.className}>
          <Script id="intercom">
            {`(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/uyr0cc7g';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();`}
          </Script>
          <Script id="intercom-init">
            {`
              window.Intercom("boot", {
                api_base: "https://api-iam.intercom.io",
                app_id: "uyr0cc7g",
                name: "John Doe", 
                email: "test-1242423423423432434532@gmail.com",
                created_at: "1312182000"
              })
            `}
          </Script>
        <Layout>
          <Component />
        </Layout>
      </div>
  );
};

export default api.withTRPC(MyApp);
