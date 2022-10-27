import styled from 'styled-components'
import { useField } from 'formik'

// Components
import { Error } from './Error'

export default function Input({ hidden, innerRef, ...props }) {
  const [field, meta] = useField(props)
  return (
    <>
      <StyledInput {...field} {...props} ref={innerRef} hidden={hidden} />
      {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
    </>
  )
}

const StyledInput = styled.input`
  outline: none;
  border: 2px solid transparent;
  border-radius: 10px;
  height: 35px;
  padding: 0 1rem;
  font: inherit;
  font-size: 0.9rem;
  font-weight: 500;

  display: ${({ hidden }) => (hidden ? 'none' : 'block')};
  width: 100%;
  background-color: #f2f2f2;
  color: #181616;
  margin-bottom: 0.5rem;

  &::placeholder {
    color: #777;
  }

  &:focus-visible {
    border-color: lightblue;
  }
`
