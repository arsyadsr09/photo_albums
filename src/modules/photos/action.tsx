import { GET_PHOTOS, GET_PHOTOS_SUCCESS, GET_PHOTOS_FAILED } from "../constants"
import { API_URL } from "../../configs"
import axios from "axios"
import { store } from "react-notifications-component"

export const getPhotos = () => async (
  dispatch: (arg0: {
    type: string
    payload?: { data: any } | { errorMessage: any }
  }) => void
) => {
  dispatch({
    type: GET_PHOTOS,
  })
  try {
    const response = await axios.get(`${API_URL}/photos`)

    const { data } = response

    dispatch({
      type: GET_PHOTOS_SUCCESS,
      payload: {
        data: data,
      },
    })
  } catch (e) {
    store.addNotification({
      title: "Error Fetch!",
      message: e,
      type: "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    })
    dispatch({
      type: GET_PHOTOS_FAILED,
      payload: {
        errorMessage: e,
      },
    })
  }
}
