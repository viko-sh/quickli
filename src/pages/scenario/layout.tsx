import Head from "next/head";
import { type ReactNode } from "react";
import Nav from "~/components/Nav";

type LayoutProps = {
  children: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Quickli Scenarios" }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="View and manage your Quickli scenarios"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] p-8">
        <Nav />
        {children}
      </main>
    </>
  );
};

export default Layout;
