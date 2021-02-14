import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faPaperPlane,
  faComments,
  faHeart,
  faTimes,
} from "@fortawesome/free-solid-svg-icons"
import { faHeart as faBorderHeart } from "@fortawesome/free-regular-svg-icons"
import {
  favoritePhoto,
  postCommentPhoto,
} from "../../modules/sub_photos/action"
import PlaceholderUser from "../../assets/images/placeholder.jpg"
import ListComments from "../ListComments"
import { Album, Favourite, PhotoComment, User } from "../../helpers/interface"

export default (props: any) => {
  const state = useSelector((state: any) => state)
  const dispatch = useDispatch()
  const [commentController, setCommentController] = useState("")
  const [userDetail, setUserDetail] = useState<User>({
    id: 0,
    name: "",
    email: "",
    username: "",
    address: {},
    phone: "",
    website: "",
    company: {},
  })
  const [albumDetail, setAlbumDetail] = useState<Album>({
    userId: 0,
    id: 0,
    title: "",
    thumbnailUrl: "",
  })

  const getAlbumDetail = (_id: number | string) => {
    const _albumDetail = state.albums.data.filter(
      (item: Album) => item.id.toString() === _id.toString()
    )
    setAlbumDetail(_albumDetail[0])
  }

  const getUserDetail = (_userId: number | string) => {
    const _userDetail = state.users.data.filter(
      (item: User) => item.id === _userId
    )
    setUserDetail(_userDetail[0])
  }

  useEffect(() => {
    getAlbumDetail(props.data.albumId)
    console.log(props.data)
    if (albumDetail) {
      getUserDetail(albumDetail.id)
    }
  }, [props.data, albumDetail])

  const getFavourite = (_photoId: number | string) => {
    const _favourite = state.subPhotos.favourites.filter(
      (item: Favourite) => item.photoId === _photoId
    )
    return _favourite.length > 0 ? _favourite[0].value : false
  }

  const onLikeClicked = () => {
    dispatch(favoritePhoto(props.data.id))
  }

  const onSendComment = () => {
    try {
      dispatch(postCommentPhoto(props.data.id, commentController))
    } catch (e) {
      console.log(e)
    } finally {
      setCommentController("")
      console.log(state.subPhotos.comments)
    }
  }

  useEffect(() => {}, [state.subPhotos.favourites, state.subPhotos.comments])

  return (
    <div className={`modal-photo-bg ${props.show ? "" : "hide"}`}>
      <div className="close-area" onClick={props.onClose} />
      <div className="modal-photo">
        <FontAwesomeIcon
          className="close"
          onClick={props.onClose}
          icon={faTimes}
        />
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-5">
            <img
              src={props.data.url}
              alt={props.data.title}
              width="100%"
              height="100%"
            />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
            <h1>{props.data.title}</h1>
            <div className="row detail">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                <div className="label">Album</div>
                {albumDetail && <h5>{albumDetail.title}</h5>}
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                <div className="label">Upload by</div>
                {userDetail && (
                  <Link to={`/users/${userDetail.id}`}>
                    <h5>
                      {userDetail.name} - {userDetail.email}
                    </h5>
                  </Link>
                )}
              </div>
            </div>
            <div className="sub-top">
              <div className="favourite" onClick={() => onLikeClicked()}>
                <FontAwesomeIcon
                  size="2x"
                  title={
                    getFavourite(props.data.id) ? "Unfavourite" : "Favourite"
                  }
                  color={getFavourite(props.data.id) ? "#ff4757" : "#57606f"}
                  className="icon"
                  icon={getFavourite(props.data.id) ? faHeart : faBorderHeart}
                />
                <span
                  style={{
                    color: getFavourite(props.data.id) ? "#ff4757" : "#57606f",
                  }}
                >
                  Favourite
                </span>
              </div>

              <div className="comments">
                <FontAwesomeIcon
                  size="2x"
                  title="Comments"
                  color="#57606f"
                  className="icon"
                  // onClick={() => onLikeClicked(props.data.id)}
                  icon={faComments}
                />
                <span>Comments</span>
              </div>
            </div>
            <div className="sub-bottom">
              {state.subPhotos.comments.map((item: PhotoComment) => {
                if (item.photoId === props.data.id) {
                  return <ListComments data={item} />
                }
              })}
            </div>
            <div className="post-comment">
              <img src={PlaceholderUser} alt="placeholder" />
              <input
                type="text"
                name="comment"
                id="comment"
                placeholder="Comment as Anonymous"
                value={commentController}
                onChange={(e: any) => setCommentController(e.target.value)}
              />
              <div className="layer-icon" onClick={() => onSendComment()}>
                <FontAwesomeIcon
                  size="1x"
                  title="Send It!"
                  color="#FFF"
                  className="icon"
                  icon={faPaperPlane}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
