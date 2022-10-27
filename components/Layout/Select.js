import styled from 'styled-components'
import { useField } from 'formik'

// Components
import { Error } from './Error'

export default function Select({ children, ...props }) {
  const [field, meta] = useField(props)
  return (
    <>
      <StyledSelect {...field} {...props}>
        {children}
      </StyledSelect>
      {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
    </>
  )
}

const StyledSelect = styled.select`
  background-color: #f2f2f2;
  border: 2px solid transparent;
  outline: none;
  display: block;
  width: 100%;
  font-size: 0.9rem;
  font-family: inherit;
  font-weight: inherit;
  padding: 0.5rem;
  border-radius: 10px;
  margin-bottom: 0.5rem;
  cursor: pointer;

  &:focus-visible {
    border-color: lightblue;
  }
`
