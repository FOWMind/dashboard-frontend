import styled from "styled-components";

const DashboardTitle = styled.h2.attrs((props) => ({
  ...props,
}))`
  color: #181616;
  font-size: 3rem;
  font-weight: 700;
`;

export { DashboardTitle };
