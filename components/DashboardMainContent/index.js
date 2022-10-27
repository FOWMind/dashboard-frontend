import styled from "styled-components";

import { WORK_SECTION } from "../../utils/constants";

// Components
import DashboardViewWorks from "../DashboardViewWorks";
import DashboardViewSingleWork from "../DashboardViewSingleWork";
import DashboardAddWork from "../DashboardAddWork";
import DashboardEditWork from "../DashboardEditWork";

export default function DashboardMainContent({ activeSection }) {
  return (
    <Main>
      {activeSection === WORK_SECTION.VIEW && <DashboardViewWorks />}
      {activeSection === WORK_SECTION.VIEW_SINGLE && (
        <DashboardViewSingleWork />
      )}
      {activeSection === WORK_SECTION.ADD && <DashboardAddWork />}
      {activeSection === WORK_SECTION.EDIT && <DashboardEditWork />}
      {activeSection === WORK_SECTION.DELETE && <h1>Eliminando trabajo</h1>}
    </Main>
  );
}

const Main = styled.main`
  padding: 2rem;
  background-color: #fff;
  min-height: 100vh;

  @media screen and (min-width: 800px) {
    padding-left: 30ch;
    padding-right: 5ch;
  }
`;
