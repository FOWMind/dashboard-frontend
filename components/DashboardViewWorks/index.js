import styled from "styled-components";
import { useContext } from "react";

// Contexts
import { DataContext } from "../../contexts/DataContext";

// Constants
import { LOAD_STATES } from "../../utils/constants";

// Components
import { DashboardTitle } from "../Layout/DashboardTitle";
import DashboardSingleWork from "../DashboardSingleWork";
import Loading from "../Layout/Loading";
import { Error } from "../Layout/Error";

export default function DashboardViewWorks() {
  const { data: works, loadState: worksLoadState } = useContext(DataContext);

  return (
    <Container>
      <DashboardViewWorksTitle>Trabajos</DashboardViewWorksTitle>
      <WorksContainer>
        {worksLoadState === LOAD_STATES.IN_PROGRESS && <Loading color="#000" />}

        {worksLoadState === LOAD_STATES.FINISHED &&
          works.length > 0 &&
          works.map((work, i) => (
            <DashboardSingleWork key={work.id || i} {...work} />
          ))}

        {worksLoadState === LOAD_STATES.FINISHED && works.length <= 0 && (
          <Error>No se encontraron trabajos para mostrar.</Error>
        )}
      </WorksContainer>
    </Container>
  );
}

const Container = styled.div``;

const DashboardViewWorksTitle = styled(DashboardTitle)`
  margin-bottom: 1rem;
`;

const WorksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;
