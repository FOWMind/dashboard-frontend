import * as Yup from "yup";
import styled from "styled-components";
import { Formik, Form } from "formik";
import { useState } from "react";

// Regex
import { emailRegex } from "../../utils/regex";

// Components
import FormField from "../Layout/FormField";
import { DashboardTitle } from "../Layout/DashboardTitle";
import { DashboardButton } from "../Layout/DashboardButton";
import { Error } from "../Layout/Error";

export default function DashboardLogin() {
  const [loginError, setLoginError] = useState();
  const [isFetching, setFetching] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .matches(emailRegex, "Ingresa un correo válido.")
      .required("El correo es necesario."),
    password: Yup.string().required("La contraseña es necesaria."),
  });

  const handleSubmit = (values) => {
    if (isFetching) return;
    setFetching(true);
    fetch("/api/login", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (response.ok) {
          setLoginError(null);
          return location.reload();
        }
        return response.json();
      })
      .then((data) => {
        if (data?.status === 404) {
          setLoginError("No se encontró un usuario con esos datos.");
        }
      })
      .finally(() => setFetching(false));
  };

  return (
    <FormContainer>
      <FormTitle>Inicia sesión</FormTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormField name="email" type="text" label="Correo electrónico" />
          <FormField name="password" type="password" label="Contraseña" />
          <DashboardButton type="submit" disabled={isFetching}>
            Ingresar
          </DashboardButton>
          {loginError && !isFetching && (
            <LoginErrorText>{loginError}</LoginErrorText>
          )}
        </Form>
      </Formik>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  width: 90%;
  max-width: 500px;
  margin: 2rem auto;
`;

const FormTitle = styled(DashboardTitle)`
  margin-bottom: 1rem;
`;

const LoginErrorText = styled(Error)`
  margin-top: 0.5rem;
`;
