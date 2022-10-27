import styled from "styled-components";
import { IoAdd, IoRemove } from "react-icons/io5";
import { FieldArray } from "formik";

// Components
import Input from "./Input";
import { DashboardButton } from "./DashboardButton";
import { Error } from "./Error";

export default function EditableList({
  inputName,
  inputPlaceholder,
  listName,
  elements,
  elementsError,
  currentElementValue,
  currentElementError,
  listEmptyText,
  maxLength,
}) {
  return (
    <FieldArray name={listName}>
      {(arrayHelpers) => (
        <>
          <ElementContainer>
            <InputContainer>
              <Input name={inputName} placeholder={inputPlaceholder} />
            </InputContainer>
            <InputButton
              type="button"
              onClick={() => {
                const validElement = currentElementValue.trim();
                if (
                  !validElement ||
                  currentElementError ||
                  elements.length > maxLength - 1
                )
                  return;

                // check for repeated element
                for (let i = 0; i <= elements.length; i++) {
                  if (elements[i] === validElement) return;
                }
                return arrayHelpers.push(validElement);
              }}
            >
              <IoAdd />
            </InputButton>
          </ElementContainer>

          <ElementsList>
            {elementsError && <Error>{elementsError}</Error>}
            {elements && elements.length > 0 ? (
              elements.map((item, index) => (
                <ListElementContainer key={index}>
                  <ListElement>{item}</ListElement>
                  <IconButton
                    type="button"
                    onClick={() => arrayHelpers.remove(index)}
                  >
                    <IoRemove />
                  </IconButton>
                </ListElementContainer>
              ))
            ) : (
              <ListEmptyText>
                {listEmptyText ? listEmptyText : "No hay ningún elemento."}
              </ListEmptyText>
            )}
          </ElementsList>
        </>
      )}
    </FieldArray>
  );
}

const ElementContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const InputContainer = styled.div`
  width: 100%;
`;

const InputButton = styled(DashboardButton)`
  color: #fff;
  font-size: 1.5rem;
  vertical-align: middle;
  line-height: 35px;
  margin-top: 0;
  padding: 0 0.25rem;
  margin-left: 0.5rem;
`;

const ElementsList = styled.ul`
  list-style-type: none;
  background-color: #f2f2f2;
  border-radius: 10px;
  padding: 1rem;
`;

const ListElementContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const ListElement = styled.li`
  font-size: 0.9rem;
  font-family: inherit;
  font-weight: 500;
`;

const IconButton = styled(InputButton)`
  padding: 0;
  margin: 0;
  height: 30px;
  line-height: 33px;
`;

const ListEmptyText = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  font-family: inherit;
`;
