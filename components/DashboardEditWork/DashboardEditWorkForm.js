import { Form } from "formik";

import FormField from "../Layout/FormField";
import FormSelect from "../Layout/FormSelect";
import Option from "../Layout/Option";
import { DashboardButton } from "../Layout/DashboardButton";

export default function DashboardEditWorkForm({ work, isFetching }) {
  const categoryAvailable = (category) =>
    category.toLowerCase() !== work.category.toLowerCase();

  return (
    <Form>
      <FormField
        name="editedTitle"
        type="text"
        label="Título del trabajo"
        placeholder={work.editedTitle}
      />
      <FormField
        name="slug"
        type="text"
        label="Slug del trabajo"
        tooltip="Nombre para la URL del trabajo (ej.: nombre-del-trabajo)"
        placeholder={work.slug}
      />
      <FormSelect
        label={`Categoría (actual: ${work.category})`}
        name="category"
      >
        <Option value={work.category} defaultValue>
          {work.category}
        </Option>
        {categoryAvailable("2d") && <Option value="2D">2D</Option>}
        {categoryAvailable("3d") && <Option value="3D">3D</Option>}
        {categoryAvailable("animacion") && (
          <Option value="Animacion">Animación</Option>
        )}
      </FormSelect>

      <FormField
        label="Repositorio"
        name="repository.url"
        type="text"
        placeholder={work.repository?.url}
      />

      <FormField
        label="Demo"
        tooltip="Enlace de demostración del proyecto."
        name="repository.demoUrl"
        type="text"
        placeholder={work.repository?.demoUrl}
      />

      <DashboardButton type="submit" disabled={isFetching}>
        Editar
      </DashboardButton>
    </Form>
  );
}
