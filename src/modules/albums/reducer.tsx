import { Album, User } from "../../helpers/interface"
import {
  GET_ALBUMS,
  GET_ALBUMS_SUCCESS,
  GET_ALBUMS_FAILED,
  SET_FILTERED_ALBUMS,
  CLEAR_FILTERED_ALBUMS,
} from "../constants"

const initialState = {
  isLoading: false,
  hasError: false,
  errorMessage: "",
  data: [],
  dataFiltered: [],
}

export default (state = initialState, action: any) => {
  switch (action.type) {
    case GET_ALBUMS:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    case GET_ALBUMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
      }
    case GET_ALBUMS_FAILED:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        errorMessage: action.payload.errorMessage,
      }
    case SET_FILTERED_ALBUMS:
      return {
        ...state,
        dataFiltered:
          // action.payload.mode === 0
          //   ?
          state.data.filter(
            (item: Album) =>
              item.title
                .toLowerCase()
                .indexOf(action.payload.value.toLowerCase()) > -1
          ),
        // : action.payload.getState().users.map((user: User) => {
        //     if (
        //       user.username.toString() === action.payload.value.toString()
        //     ) {
        //       return state.data.filter(
        //         (item: Album) =>
        //           item.userId.toString() === user.id.toString()
        //       )
        //     }
        //   }),
      }
    case CLEAR_FILTERED_ALBUMS:
      return {
        ...state,
        dataFiltered: [],
      }
    default:
      return state
  }
}
