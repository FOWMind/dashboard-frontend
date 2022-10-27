## To run the project, you may need some variables in a `.env` file at the root path of the project.

### Endpoints:

**Endpoints variables must not have the first or the last `/`**

- `API_URL` - API host URL (example: https://myapi.com)
- `API_KEY` - Same as dashboard backend API_KEY
- `API_LOGIN` - The API login endpoint (example: "login")
- `API_VIEW_WORKS` - The API work list endpoint (example: "api/work")
- `API_CREATE_SINGLE_WORK` - The API single work creation endpoint (example: "api/works")
- `API_VIEW_SINGLE_WORK` - The API single work endpoint (example: "api/single-work")
- `API_VIEW_SINGLE_WORK_BY_ID` - The API single work by ID endpoint (example: "api/single-work/id")
- `API_EDIT_WORK_BY_ID` - The API edit work by ID endpoint (example: "api/single-work")
- `API_DELETE_WORK_BY_ID` - The API delete work by ID endpoint (example: "api/single-work")

### JWT

- `JWT_USER_COOKIE_NAME` - The name for the cookie that will be saved in the client after login
- `JWT_USER_SECRET` - The same JWT token as the backend
