import styled from "styled-components";
import { Form } from "formik";

import { DashboardAddWorkValuesLimit } from "../../utils/formikData";

// Components
import FormField from "../Layout/FormField";
import FormSelect from "../Layout/FormSelect";
import Option from "../Layout/Option";
import FormFileField from "../Layout/FormFileField";
import FormEditableList from "../Layout/FormEditableList";
import { DashboardButton as StyledButton } from "../Layout/DashboardButton";
import { getBase64FromFiles } from "../../utils";

export default function DashboardAddWorkForm({
  values,
  errors,
  setFieldValue,
  setFieldTouched,
  validateFeaturedImage,
  validateImages,
  featuredImageState,
  imagesState,
  setImagesState,
  isFetching,
}) {
  const SetValidImages = (event) => {
    const selectedImages = [...event.currentTarget.files];
    let validImages = selectedImages.filter((selectedImage) => {
      if (selectedImage.type?.substr(0, 5) !== "image") return;
      else if (selectedImage.size > 2000000) return;
      return selectedImage;
    });
    validImages = validImages.slice(0, 5);

    const base64Images = [];
    getBase64FromFiles(validImages, (base64) => {
      base64Images.push(base64);
      setFieldValue("images", base64Images);
      setImagesState(base64Images);
    });
  };
  return (
    <Form>
      {/* Title field */}
      <FormField
        label="Título"
        name="title"
        type="text"
        placeholder="Ejemplo: Trabajo-de-animación"
      />

      {/* Category Select */}
      <FormSelect
        label="Categoría"
        tooltip="Categoría del trabajo"
        name="category"
      >
        <Option value="" defaultValue disabled hidden>
          Selecciona una categoría
        </Option>
        <Option value="2D">2D</Option>
        <Option value="3D">3D</Option>
        <Option value="Animacion">Animación</Option>
      </FormSelect>

      {/* Slug field */}
      <FormField
        label="Slug"
        tooltip="Nombre amigable para la URL del trabajo"
        name="slug"
        type="text"
        placeholder="Ejemplo: trabajo-de-animacion"
      />

      {/* Repository field */}
      <FormField
        label="Repositorio (opcional)"
        tooltip="Enlace al repositorio del trabajo (GitHub, GitLab, etc)"
        name="repository.url"
        type="text"
        placeholder="Ejemplo: https://github.com/FOWMind/mini-guia-web"
      />

      {/* Demo field */}
      <FormField
        label="Demo (opcional)"
        tooltip="Enlace a una demostración del proyecto"
        name="repository.demoUrl"
        type="text"
        placeholder="Ejemplo: https://fowmind.github.io/mini-guia-web/"
      />

      {/* Featured Image File Selection */}
      <FormFileField
        label="Imagen destacada"
        tooltip="Una imagen que se usará de portada para el trabajo"
        fileButtonText="Seleccionar imagen"
        name="featuredImage"
        accept="image/png, image/jpeg"
        validate={validateFeaturedImage}
        onChange={(event) => {
          const imageFile = event.currentTarget.files[0];
          /* SEE: https://github.com/jaredpalmer/formik/discussions/3128#discussioncomment-958661 */
          setFieldValue("featuredImage", imageFile);
        }}
        onClick={(event) => {
          event.target.value = null;
          setFieldTouched("featuredImage", true);
        }}
      />

      {/* Featured Image Preview */}
      {featuredImageState && featuredImageState.src && (
        <DashboardImage src={featuredImageState.src} />
      )}

      {/* Secondary Images Files Selection */}
      <FormFileField
        label="Imágenes secundarias"
        tooltip="Imágenes que se podrán ver al ingresar a un trabajo."
        fileButtonText="Seleccionar imágenes"
        name="images"
        id="images"
        accept="image/png, image/jpeg"
        multiple
        validate={validateImages}
        onChange={(event) => SetValidImages(event)}
        onClick={(event) => {
          event.target.value = null;
          setFieldTouched("images", true);
        }}
      />

      {imagesState.length > 0 && (
        <ImagesPreview>
          {imagesState.map((image, index) => (
            <ImagesPreviewLink
              href={image}
              target="_blank"
              key={index}
              rel="noreferrer"
            >
              <ImagesPreviewItem src={image} alt="" />
            </ImagesPreviewLink>
          ))}
        </ImagesPreview>
      )}

      {/* Videos Editable List */}
      <FormEditableList
        label="Videos (opcional)"
        tooltip="Podrías utilizar videos demostrativos de tu trabajo. Asegúrate de que utilizas un enlace de inserción de YouTube."
        inputName="video"
        inputPlaceholder="Ejemplo: https://www.youtube.com/embed/xcJtL7QggTI"
        listName="videos"
        elements={values.videos}
        elementsError={errors.videos}
        currentElementValue={values.video}
        currentElementError={errors.video}
        listEmptyText={"No agregaste ningún video."}
        maxLength={DashboardAddWorkValuesLimit.videosMax}
      />

      {/* Notes Editable List */}
      <FormEditableList
        label="Notas (opcional)"
        tooltip="Las notas son una lista de cosas a destacar, o lo que hiciste en este trabajo"
        inputName="note"
        inputPlaceholder='Ejemplo: "Utilicé de referencia una imagen de Behance"'
        listName="notes"
        elements={values.notes}
        elementsError={errors.notes}
        currentElementValue={values.note}
        currentElementError={errors.note}
        listEmptyText={"No has agregado ninguna nota."}
        maxLength={DashboardAddWorkValuesLimit.notesMax}
      />

      <DashboardButton type="submit" disabled={isFetching}>
        Agregar
      </DashboardButton>
    </Form>
  );
}

const DashboardButton = styled(StyledButton)`
  margin-top: 0.5rem;
`;

const DashboardImage = styled.img`
  width: 100%;
  max-width: 400px;
  display: block;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  object-fit: contain;
  margin-bottom: 0.5rem;
`;

const ImagesPreview = styled.div`
  margin: 0.5rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  background-color: #eee;
  border-radius: 10px;
`;

const ImagesPreviewLink = styled.a`
  width: 33%;

  @media screen and (min-width: 800px) {
    width: 20%;
  }
`;

const ImagesPreviewItem = styled.img`
  max-width: 100%;
  padding: 0.25rem;
  object-fit: contain;
  margin: 0 auto;
  display: block;
`;
