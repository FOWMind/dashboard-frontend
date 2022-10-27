import styled from "styled-components";
import { useState, useRef } from "react";
import { Formik } from "formik";

// Components
import { FormContainer } from "../Layout/FormContainer";
import { DashboardTitle } from "../Layout/DashboardTitle";
import { Error } from "../Layout/Error";
import DashboardAddWorkForm from "./DashboardAddWorkForm";

// Utils
import { checkLogged, getBase64FromFile } from "../../utils";

// Formik values
import {
  DashboardAddWorkInitialValues,
  DashboardAddWorkValidationSchema,
} from "../../utils/formikData";

export default function DashboardAddWork() {
  const [featuredImageState, setFeaturedImageState] = useState();
  const [imagesState, setImagesState] = useState([]);
  const [isFetching, setFetching] = useState(false);
  const [addWorkError, setAddWorkError] = useState();
  const formikRef = useRef();

  const validateFeaturedImage = (featuredImage) => {
    let error;

    if (!featuredImage) {
      error = "Imagen requerida.";
    } else {
      if (featuredImage.type?.substr(0, 5) !== "image") {
        error = "El archivo debe ser una imagen.";
      } else if (featuredImage.size > 2000000) {
        error = "La imagen no puede tener un peso mayor a 2MB.";
      }
    }

    if (!error) {
      getBase64FromFile(featuredImage, (base64) => {
        setFeaturedImageState({ file: featuredImage, src: base64 });
      });
    } else {
      setFeaturedImageState({});
    }

    return error;
  };

  const validateImages = (images) => {
    let error;

    if (!images || images.length <= 0) {
      error = "Debe haber alguna imagen.";
    }
    return error;
  };

  const handleSubmit = async (values, actions) => {
    const logged = await checkLogged();
    if (!logged) {
      return window.location.replace("/");
    }
    if (isFetching) return;
    setFetching(true);
    getBase64FromFile(values.featuredImage, (base64) => {
      const newValues = {
        ...values,
        featuredImageRaw: base64,
      };
      setImagesState([]);
      fetch("/api/works", {
        method: "post",
        body: JSON.stringify(newValues),
      })
        .then((response) => {
          if (response.ok) {
            formikRef.current.resetForm();
            setAddWorkError(null);
            return window.location.replace("/");
          }
          return setAddWorkError(
            "No se pudo agregar el trabajo, intenta de nuevo más tarde."
          );
        })
        .finally(() => setFetching(false));
    });
    actions.setSubmitting(false);
  };

  return (
    <FormContainer>
      <DashboardAddWorkTitle>Agregar trabajo</DashboardAddWorkTitle>
      <Formik
        innerRef={formikRef}
        initialValues={DashboardAddWorkInitialValues}
        onSubmit={handleSubmit}
        validationSchema={DashboardAddWorkValidationSchema}
      >
        {({ values, errors, setFieldValue, setFieldTouched }) => (
          <>
            <DashboardAddWorkForm
              values={values}
              errors={errors}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              validateFeaturedImage={validateFeaturedImage}
              validateImages={validateImages}
              featuredImageState={featuredImageState}
              imagesState={imagesState}
              setImagesState={setImagesState}
              isFetching={isFetching}
            />
            {addWorkError && !isFetching && (
              <WorkError>{addWorkError}</WorkError>
            )}
          </>
        )}
      </Formik>
    </FormContainer>
  );
}

const DashboardAddWorkTitle = styled(DashboardTitle)`
  margin-bottom: 1rem;
`;

const WorkError = styled(Error)`
  margin-top: 0.5rem;
`;
