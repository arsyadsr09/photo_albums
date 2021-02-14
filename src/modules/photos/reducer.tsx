import { GET_PHOTOS, GET_PHOTOS_SUCCESS, GET_PHOTOS_FAILED } from "../constants"

const initialState = {
  isLoading: false,
  hasError: false,
  errorMessage: "",
  data: [],
}

export default (state = initialState, action: any) => {
  switch (action.type) {
    case GET_PHOTOS:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    case GET_PHOTOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
      }
    case GET_PHOTOS_FAILED:
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
