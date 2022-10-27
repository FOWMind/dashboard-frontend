import styled from "styled-components";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Formik } from "formik";

import { DashboardEditWorkInitialValues } from "../../utils/formikData";

import { FormContainer } from "../Layout/FormContainer";
import { DashboardTitle } from "../Layout/DashboardTitle";
import { Error } from "../Layout/Error";
import DashboardEditWorkForm from "./DashboardEditWorkForm";

export default function DashboardEditWork() {
  const { id } = useRouter().query;
  const [work, setWork] = useState({});
  const [isFetching, setFetching] = useState(false);
  const [editError, setEditError] = useState();

  useEffect(() => {
    if (id) {
      fetch(`/api/work/${id}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return setWork(undefined);
        })
        .then((data) => setWork(data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  const handleSubmit = (values) => {
    if (isFetching) return;

    setFetching(true);
    fetch(`/api/works/${work._id}`, {
      method: "PUT",
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (response.ok) {
          setEditError(null);
          return window.location.replace(`/work/${work._id}`);
        }
        return setEditError(
          "Ocurrió un error al editar el trabajo. Intenta recargar la página y probar de nuevo."
        );
      })
      .finally(() => setFetching(false));
  };

  return (
    <>
      {work === undefined && (
        <>
          <Head>
            <title>Trabajo no encontrado - Dashboard</title>
          </Head>
          <h1>Trabajo no encontrado</h1>
        </>
      )}

      {work && Object.entries(work).length > 0 && (
        <>
          <Head>
            <title>Editando {work.editedTitle} - Dashboard</title>
          </Head>
          <FormContainer>
            <EditWorkTitle>Edita el trabajo</EditWorkTitle>
            <Formik
              initialValues={DashboardEditWorkInitialValues(
                work.editedTitle,
                work.category,
                work.slug,
                work.repository?.url,
                work.repository?.demoUrl
              )}
              onSubmit={handleSubmit}
            >
              <DashboardEditWorkForm work={work} isFetching={isFetching} />
            </Formik>
            {editError && !isFetching && <EditError>{editError}</EditError>}
          </FormContainer>
        </>
      )}
    </>
  );
}

const EditWorkTitle = styled(DashboardTitle)`
  margin-bottom: 1rem;
`;

const EditError = styled(Error)`
  margin-top: 0.5rem;
`;
