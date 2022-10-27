import styled from "styled-components";

export const Image = styled.img.attrs((props) => ({
  ...props,
}))`
  border-right: 0;
  object-fit: cover;
  display: block;
  width: 100%;
`;
