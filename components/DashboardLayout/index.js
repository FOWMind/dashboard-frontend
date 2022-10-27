import Head from "next/head";
import styled from "styled-components";
import { useAuthenticated } from "../../hooks";

// Components
import DashboardLogin from "../DashboardLogin";

export default function DashboardLayout({ children }) {
  const { authenticated } = useAuthenticated();
  return (
    <Layout>
      {authenticated === false && (
        <>
          <Head>
            <title>Iniciar sesión</title>
          </Head>
          <DashboardLogin />
        </>
      )}
      {authenticated === true && children}
    </Layout>
  );
}

const Layout = styled.div`
  position: relative;
  font-family: "Montserrat", -apple-system, sans-serif;
  background-color: #fff;
  min-height: 100vh;
`;
