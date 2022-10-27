const API = {
  URL: process.env.API_URL,
  KEY: process.env.API_KEY,
  ENDPOINTS: {
    VIEW_WORKS: process.env.API_VIEW_WORKS,
    VIEW_SINGLE_WORK: process.env.API_VIEW_SINGLE_WORK,
    VIEW_SINGLE_WORK_BY_ID: process.env.API_VIEW_SINGLE_WORK_BY_ID,
    CREATE_SINGLE_WORK: process.env.API_CREATE_SINGLE_WORK,
    EDIT_WORK_BY_ID: process.env.API_EDIT_WORK_BY_ID,
    DELETE_WORK_BY_ID: process.env.API_DELETE_WORK_BY_ID,
    LOGIN: process.env.API_LOGIN,
  },
};

const LOAD_STATES = {
  DEFAULT: "idle",
  IDLE: "idle",
  IN_PROGRESS: "inProgress",
  FINISHED: "finished",
};

const WORK_SECTION = {
  VIEW: "view-works",
  VIEW_SINGLE: "view-single-work",
  ADD: "add-work",
  EDIT: "edit-work",
  DELETE: "delete-work",
};

export { API, LOAD_STATES, WORK_SECTION };
