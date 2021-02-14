import { POST_COMMENTS, DELETE_COMMENTS, FAVOURITE_PHOTO } from "../constants"

export const favoritePhoto = (id: string | number) => async (
  dispatch: (arg0: { type: string; payload?: { id: string | number } }) => void
) => {
  dispatch({
    type: FAVOURITE_PHOTO,
    payload: {
      id,
    },
  })
}

export const postCommentPhoto = (
  photoId: string | number,
  text: string
) => async (
  dispatch: (arg0: {
    type: string
    payload?: { photoId: string | number; text: string }
  }) => void
) => {
  dispatch({
    type: POST_COMMENTS,
    payload: {
      photoId,
      text,
    },
  })
}

export const deleteCommentPhoto = (
  id: string | number,
  photoId: string | number
) => async (
  dispatch: (arg0: {
    type: string
    payload?: { id: string | number; photoId: string | number }
  }) => void
) => {
  dispatch({
    type: DELETE_COMMENTS,
    payload: {
      id,
      photoId,
    },
  })
}
