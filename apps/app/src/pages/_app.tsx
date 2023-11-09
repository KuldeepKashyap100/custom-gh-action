/* eslint-disable react/prop-types */
import "~/styles/globals.css";
import "@design-system/react/styles.css";
import type { AppType } from "next/app";
import { Inter } from "@next/font/google";

import { MainLayout } from "~/components/Layout";
import { api } from "~/services/api";

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
        <Layout>
          <Component />
        </Layout>
      </div>
  );
};

export default api.withTRPC(MyApp);
