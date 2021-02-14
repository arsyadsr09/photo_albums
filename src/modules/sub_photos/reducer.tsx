import { POST_COMMENTS, DELETE_COMMENTS, FAVOURITE_PHOTO } from "../constants"
import shortid from "shortid"
import { favoritePhoto } from "./action"
import { Favourite, PhotoComment } from "../../helpers/interface"

const initialState = {
  isLoading: false,
  hasError: false,
  errorMessage: "",
  favourites: [],
  comments: [],
}

export default (state = initialState, action: any) => {
  switch (action.type) {
    case FAVOURITE_PHOTO:
      let exist: any = state.favourites.filter(
        (item: Favourite) => item.photoId === action.payload.id
      )
      console.log(exist)
      if (exist.length > 0) {
        exist[0].value = !exist[0].value
      } else {
        exist = [
          {
            photoId: action.payload.id,
            value: true,
          },
        ]
      }

      return {
        ...state,
        favourites: state.favourites.concat(exist),
      }
    case POST_COMMENTS:
      return {
        ...state,
        comments: [
          ...state.comments,
          {
            id: shortid.generate(),
            photoId: action.payload.photoId,
            text: action.payload.text,
            time: new Date(),
          },
        ],
      }
    case DELETE_COMMENTS:
      return {
        ...state,
        comments: state.comments.filter(
          (node: PhotoComment) => node.photoId !== action.payload.id
        ),
      }
    default:
      return state
  }
}
