import styled from 'styled-components'

export default function Label(props) {
  return <StyledLabel {...props} />
}

const StyledLabel = styled.label`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
  display: block;
`
