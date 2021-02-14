import { combineReducers } from "redux"

import users from "./users/reducer"
import albums from "./albums/reducer"
import photos from "./photos/reducer"
import subPhotos from "./sub_photos/reducer"

export const rootReducer = combineReducers({ albums, photos, subPhotos, users })
