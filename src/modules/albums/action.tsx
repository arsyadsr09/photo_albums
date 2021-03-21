import {
  GET_ALBUMS,
  GET_ALBUMS_SUCCESS,
  GET_ALBUMS_FAILED,
  SET_FILTERED_ALBUMS,
  CLEAR_FILTERED_ALBUMS,
} from "../constants"
import { API_URL } from "../../configs"
import { flatDesignBackground } from "../../configs/static_variables"
import axios from "axios"
import { store } from "react-notifications-component"

export const getAlbums = () => async (
  dispatch: (arg0: {
    type: string
    payload?: { data: any } | { errorMessage: any }
  }) => void
) => {
  dispatch({
    type: GET_ALBUMS,
  })
  try {
    const response = await axios.get(`${API_URL}/albums`)

    const { data } = response

    console.log(data)

    const getRandomInt = (max: number) => {
      return Math.floor(Math.random() * Math.floor(max))
    }

    const _dataInjected = data.map((item: any) => {
      return { ...item, thumbnailUrl: flatDesignBackground[getRandomInt(6)] }
    })

    console.log()

    dispatch({
      type: GET_ALBUMS_SUCCESS,
      payload: {
        data: _dataInjected,
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
      type: GET_ALBUMS_FAILED,
      payload: {
        errorMessage: e,
      },
    })
  }
}

export const setFilteredAlbums = (value: string | number) => (
  dispatch: (arg0: {
    type: string
    payload?: { value: string | number }
  }) => void
) => {
  dispatch({
    type: SET_FILTERED_ALBUMS,
    payload: {
      value,
    },
  })
}

export const clearFilteredAlbums = () => (
  dispatch: (arg0: { type: string }) => void
) => {
  dispatch({
    type: CLEAR_FILTERED_ALBUMS,
  })
}
