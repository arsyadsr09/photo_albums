import { GET_USERS, GET_USERS_SUCCESS, GET_USERS_FAILED } from "../constants"

const initialState = {
  isLoading: false,
  hasError: false,
  errorMessage: "",
  data: [],
}

export default (state = initialState, action: any) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    case GET_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
      }
    case GET_USERS_FAILED:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        errorMessage: action.payload.errorMessage,
      }
    default:
      return state
  }
}
