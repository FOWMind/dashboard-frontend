import * as Yup from "yup";

// RegExp
import { websiteRegex, youtubeURLRegex } from "./regex";

const DashboardAddWorkInitialValues = {
  title: "",
  category: "",
  slug: "",
  repository: {
    url: "",
    demoUrl: "",
  },
  featuredImage: {},
  image: "",
  images: [],
  video: "",
  videos: [],
  note: "",
  notes: [],
};

const DashboardAddWorkValuesLimit = {
  titleMin: 3,
  titleMax: 100,
  noteMin: 5,
  noteMax: 100,
  notesMax: 15,
  videosMax: 5,
};

const DashboardAddWorkValidationSchema = Yup.object({
  title: Yup.string()
    .min(
      DashboardAddWorkValuesLimit.titleMin,
      `El título debe tener al menos ${DashboardAddWorkValuesLimit.titleMin} caracteres.`
    )
    .max(
      DashboardAddWorkValuesLimit.titleMax,
      `El título debe tener como máximo ${DashboardAddWorkValuesLimit.titleMax} caracteres.`
    )
    .required("El título es requerido."),
  category: Yup.string().required("Debes elegir una categoría"),
  slug: Yup.string().required("El slug es requerido."),
  repository: Yup.object()
    .shape({
      url: Yup.string()
        .matches(websiteRegex, "El repositorio debe ser un enlace.")
        .notRequired(),
      demoUrl: Yup.string()
        .matches(websiteRegex, "La demo debe ser un enlace.")
        .notRequired(),
    })
    .notRequired(),
  video: Yup.string()
    .trim()
    .typeError("Video inválido")
    .matches(youtubeURLRegex, "El video debe ser un enlace de YouTube.")
    .notRequired(),
  videos: Yup.array()
    .max(
      DashboardAddWorkValuesLimit.videosMax,
      `No puedes agregar más de ${DashboardAddWorkValuesLimit.videosMax} videos.`
    )
    .notRequired(),
  note: Yup.string()
    .trim()
    .typeError("Nota inválida.")
    .min(
      DashboardAddWorkValuesLimit.noteMin,
      `La nota debe contener al menos ${DashboardAddWorkValuesLimit.noteMin} caracteres.`
    )
    .max(
      DashboardAddWorkValuesLimit.noteMax,
      `La nota debe tener como máximo ${DashboardAddWorkValuesLimit.noteMax} caracteres.`
    )
    .notRequired(),
  notes: Yup.array()
    .max(
      DashboardAddWorkValuesLimit.notesMax,
      `No se pueden agregar más de ${DashboardAddWorkValuesLimit.notesMax} notas.`
    )
    .notRequired(),
});

const DashboardEditWorkInitialValues = (
  editedTitle,
  category,
  slug,
  repositoryUrl,
  repositoryDemoUrl
) => ({
  editedTitle,
  category,
  slug,
  repository: {
    url: repositoryUrl,
    demoUrl: repositoryDemoUrl,
  },
});

export {
  DashboardAddWorkInitialValues,
  DashboardAddWorkValidationSchema,
  DashboardAddWorkValuesLimit,
  DashboardEditWorkInitialValues,
};
