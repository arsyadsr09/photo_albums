import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import StackGrid, { transitions } from "react-stack-grid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { faHeart as faBorderHeart } from "@fortawesome/free-regular-svg-icons"
import ModalPhoto from "../../components/ModalPhoto"
import { favoritePhoto } from "../../modules/sub_photos/action"
import { Favourite, Photo } from "../../helpers/interface"
import BgGrey from "../../assets/images/bg_grey.png"
import { BgStyled } from "../../components/universal"

export default () => {
  const state = useSelector((state: any) => state)
  const dispatch = useDispatch()
  const { scaleDown } = transitions

  const [detailShow, setDetailShow] = useState(false)
  const [selectedDetailPhoto, setSelectedDetailPhoto] = useState<Photo>({
    albumId: 0,
    id: 0,
    title: "",
    url: "",
    thumbnailUrl: "",
  })

  const getFavourite = (_photoId: number | string) => {
    const _favourite = state.subPhotos.favourites.filter(
      (item: Favourite) => item.photoId === _photoId
    )
    return _favourite.length > 0 ? _favourite[0].value : false
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
      <div className="favourite">
        <BgStyled image={BgGrey} className="header">
          <h1>Favourite Photos</h1>
        </BgStyled>
        <div className="content">
          <StackGrid
            columnWidth={300}
            appear={scaleDown.appear}
            appeared={scaleDown.appeared}
            enter={scaleDown.enter}
            entered={scaleDown.entered}
            leaved={scaleDown.leaved}
            duration={0.5}
          >
            {state.subPhotos.favourites.map((item: Favourite) => {
              return state.photos.data.map((node: Photo, i: number) => {
                if (item.photoId === node.id) {
                  return (
                    <div
                      key={i}
                      onClick={() => onDetailClicked(node)}
                      className="photo"
                      title="Click to detail!"
                    >
                      <img
                        src={node.url}
                        alt={node.title}
                        width={300}
                        height={300}
                      />
                      <div className="mask">
                        <div className="content">
                          <FontAwesomeIcon
                            title={
                              getFavourite(node.id)
                                ? "Favourite"
                                : "Unfavourite"
                            }
                            size="2x"
                            className="icon"
                            onClick={() => onLikeClicked(node.id)}
                            icon={
                              getFavourite(node.id) ? faHeart : faBorderHeart
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )
                }
              })
            })}
          </StackGrid>
        </div>
      </div>
      <ModalPhoto
        show={detailShow}
        data={selectedDetailPhoto}
        onClose={onModalClose}
      />
    </>
  )
}
