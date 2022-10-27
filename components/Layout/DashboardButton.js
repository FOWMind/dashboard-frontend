import styled from "styled-components";

const DashboardButton = styled.button`
  outline: none;
  border: 2px solid transparent;
  border-radius: 10px;
  line-height: 35px;
  padding: 0.5rem 1rem;
  font: inherit;
  font-size: 0.9rem;
  font-weight: 500;

  display: inline-block;
  background-color: #000;
  color: #fff;
  opacity: ${({ disabled }) => (disabled ? "50%" : "initial")};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};

  &:hover,
  &:active,
  &:focus,
  &:focus-visible {
    background-color: #333;
  }
`;

export { DashboardButton };
