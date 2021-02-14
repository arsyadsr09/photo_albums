import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, Redirect, Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronUp, faHeart } from "@fortawesome/free-solid-svg-icons"
import { faHeart as faBorderHeart } from "@fortawesome/free-regular-svg-icons"
import StackGrid, { transitions } from "react-stack-grid"

import styled from "styled-components"
import { LoadingWrapper } from "../../components/universal"
import Loader from "react-loader-spinner"
import { getPhotos } from "../../modules/photos/action"
import { getUsers } from "../../modules/users/action"
import ModalPhoto from "../../components/ModalPhoto"
import { favoritePhoto } from "../../modules/sub_photos/action"
import { Album, Favourite, Photo, User } from "../../helpers/interface"

interface FilterPhotosComponent {
  image: string
}

const { scaleDown } = transitions
const HeaderFull = styled.div<FilterPhotosComponent>`
  background: url(${(props: any) => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  width: 100vw;
  min-height: 100vh;
  padding: 0 10vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

export default (props: any) => {
  const state = useSelector((state: any) => state)
  const dispatch = useDispatch()
  const { id }: { id: string } = useParams()
  const [albumDetail, setAlbumDetail] = useState<Album>({
    userId: 0,
    id: 0,
    title: "",
    thumbnailUrl: "",
  })
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([])
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
  const [isLoading, setIsLoading] = useState(false)
  const [detailShow, setDetailShow] = useState(false)
  const [selectedDetailPhoto, setSelectedDetailPhoto] = useState<Photo>({
    albumId: 0,
    id: 0,
    title: "",
    url: "",
    thumbnailUrl: "",
  })

  const getAlbumDetail = (_id: number | string) => {
    const _albumDetail = state.albums.data.filter(
      (item: Album) => item.id.toString() === _id
    )
    setAlbumDetail(_albumDetail[0])
  }

  const getFilteredPhotos = (_id: number | string) => {
    const _filteredPhotos = state.photos.data.filter(
      (item: Photo) => item.albumId.toString() === _id
    )
    setFilteredPhotos(_filteredPhotos)
  }

  const getUserDetail = (_userId: number | string) => {
    const _userDetail = state.users.data.filter(
      (item: User) => item.id === _userId
    )
    setUserDetail(_userDetail[0])
  }

  const getFavourite = (_photoId: number | string) => {
    const _favourite = state.subPhotos.favourites.filter(
      (item: Favourite) => item.photoId === _photoId
    )
    return _favourite.length > 0 ? _favourite[0].value : false
  }

  const init = (id: number | string) => {
    setIsLoading(true)
    try {
      getAlbumDetail(id)
      getFilteredPhotos(id)
    } catch (e) {
      console.error("Get Init: ", e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (state.photos.data.length <= 0 || state.users.data.length > 0) {
      dispatch(getPhotos())
      dispatch(getUsers())
      const idFromPath = props.location.pathname.split("/")
      if (idFromPath.length > 0) {
        init(idFromPath[2])
      }
    } else {
      init(id)
    }
  }, [id])

  useEffect(() => {}, [state.subPhotos.favourites])

  useEffect(() => {
    getUserDetail(albumDetail.userId)
  }, [albumDetail])

  const onScrollClicked = () => {
    window.scrollTo({
      top: document.body.offsetHeight,
      left: 100,
      behavior: "smooth",
    })
  }

  const onLikeClicked = (id: string | number) => {
    dispatch(favoritePhoto(id))
  }

  const onDetailClicked = (item: Photo) => {
    document.body.style.overflowY = "hidden"
    setSelectedDetailPhoto(item)
    setDetailShow(true)
  }

  const onModalClose = async () => {
    document.body.style.overflowY = "scroll"
    setDetailShow(false)
  }

  return (
    <>
      {!id ? (
        <Redirect to="/" />
      ) : (
        <>
          <LoadingWrapper className={isLoading ? "" : "hide"}>
            <Loader type="Puff" color="#ff7f50" height={200} width={200} />
          </LoadingWrapper>
          <div
            className="albums"
            style={detailShow ? { overflowY: "hidden" } : {}}
          >
            <HeaderFull image={albumDetail.thumbnailUrl}>
              <div />
              <div>
                <h1 className="album-title">{albumDetail.title}</h1>

                {userDetail && (
                  <Link
                    to={`/users/${userDetail.id}`}
                    className="border-subtitle"
                  >
                    <h6 className="subtitle">
                      <>
                        {userDetail.name} - {userDetail.email}
                      </>
                    </h6>
                  </Link>
                )}
              </div>
              <div className="btn-next" onClick={onScrollClicked}>
                <FontAwesomeIcon color="#2f3542" icon={faChevronUp} />
              </div>
            </HeaderFull>
            <div className="container-grid">
              {filteredPhotos.length > 0 && (
                <StackGrid
                  columnWidth={150}
                  gutterWidth={15}
                  gutterHeight={15}
                  appear={scaleDown.appear}
                  appeared={scaleDown.appeared}
                  enter={scaleDown.enter}
                  entered={scaleDown.entered}
                  leaved={scaleDown.leaved}
                  duration={0.5}
                >
                  {filteredPhotos.map((item: Photo, i: number) => {
                    return (
                      <div
                        key={i}
                        onClick={() => onDetailClicked(item)}
                        className="photo"
                        title="Click to detail!"
                      >
                        <img
                          src={item.thumbnailUrl}
                          alt={item.title}
                          width={150}
                          height={150}
                        />
                        <div className="mask">
                          <div className="content">
                            <FontAwesomeIcon
                              title={
                                getFavourite(item.id)
                                  ? "Favourite"
                                  : "Unfavourite"
                              }
                              className="icon"
                              onClick={() => onLikeClicked(item.id)}
                              icon={
                                getFavourite(item.id) ? faHeart : faBorderHeart
                              }
                            />

                            {/* <FontAwesomeIcon
                              title={
                                item.favourite ? "Unfavourite" : "Favourite"
                              }
                              className="icon"
                              onClick={() => onLikeClicked(item.id)}
                              icon={item.favourite ? faHeart : faBorderHeart}
                            /> */}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </StackGrid>
              )}
            </div>
          </div>
          <ModalPhoto
            show={detailShow}
            data={selectedDetailPhoto}
            onClose={onModalClose}
          />
        </>
      )}
    </>
  )
}
