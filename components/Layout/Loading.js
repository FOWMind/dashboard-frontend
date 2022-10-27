import styled from "styled-components";
import ReactLoading from "react-loading";

export default function Loading({ color }) {
  return (
    <LoadingContainer color={color}>
      <ReactLoading type="spokes" style={styles.ReactLoading} />
    </LoadingContainer>
  );
}

const LoadingContainer = styled.div`
  width: 100%;
  fill: ${({ color, theme }) => (color ? color : theme.mainClr)};
`;

const styles = {
  ReactLoading: {
    margin: "2rem auto",
    width: "80px",
  },
};
