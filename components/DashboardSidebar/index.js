import styled from "styled-components";
import Link from "next/link";
import { AiOutlineUnorderedList, AiFillEdit } from "react-icons/ai";
import { IoAdd } from "react-icons/io5";
import { Logout } from "../../utils";

// Utils
import { WORK_SECTION } from "../../utils/constants";

export default function DashboardSidebar({ activeSection }) {
  return (
    <Sidebar>
      <SidebarTitle>Dashboard</SidebarTitle>
      <SidebarButtons>
        {activeSection === WORK_SECTION.VIEW_SINGLE && (
          <SidebarButton active>
            <AiOutlineUnorderedList />
            Ver trabajo
          </SidebarButton>
        )}

        <Link href="/" passHref>
          <SidebarButton active={activeSection === WORK_SECTION.VIEW}>
            <AiOutlineUnorderedList /> Ver trabajos
          </SidebarButton>
        </Link>

        <Link href="/add" passHref>
          <SidebarButton active={activeSection === WORK_SECTION.ADD}>
            <IoAdd />
            Agregar trabajo
          </SidebarButton>
        </Link>

        {activeSection === WORK_SECTION.EDIT && (
          <SidebarButton active>
            <AiFillEdit />
            Editar trabajo
          </SidebarButton>
        )}
        <SidebarButton onClick={Logout}>Cerrar sesión</SidebarButton>
      </SidebarButtons>
    </Sidebar>
  );
}

const Sidebar = styled.aside`
  background-color: #fff;
  padding: 2rem;

  @media screen and (min-width: 800px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    max-width: 25ch;
    height: 100vh;
    overflow: auto;
  }
`;

const SidebarTitle = styled.h1`
  color: #181616;
  font-weight: 700;
  font-size: 1.5rem;
  text-align: center;
  padding-top: 0.5rem;
`;

const SidebarButtons = styled.div`
  margin-top: 5rem;
`;

const SidebarButton = styled.a`
  outline: 2px solid transparent;
  border: none;
  border-radius: 10px;
  width: 100%;
  display: block;
  text-align: left;
  margin: 0 auto 1rem auto;
  padding: 0.75rem 1rem;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  background: ${({ active }) => (active ? "#000" : "none")};
  color: ${({ active }) => (active ? "#fff" : "#908F8F")};
  cursor: pointer;

  ${({ active }) =>
    !active &&
    `
    &:hover {
      background-color: #eee;
    }
  `}

  & > svg {
    vertical-align: middle;
    margin-right: 0.5rem;
  }
`;
