import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import OwlCarousel from "react-owl-carousel"
import Loader from "react-loader-spinner"

import BgHome from "../../assets/images/bg_home.jpg"
import ChevronLeft from "../../assets/images/chevron-left.png"
import ChevronRight from "../../assets/images/chevron-right.png"

import { getAlbums } from "../../modules/albums/action"
import AlbumCard from "../../components/AlbumCard"
import Navbar from "../../components/Navbar"
import { LoadingWrapper } from "../../components/universal"
import { getPhotos } from "../../modules/photos/action"
import { getUsers } from "../../modules/users/action"

const BgStyled = styled.div`
  background: url(${BgHome});
  width: 100vw;
  min-height: 100vh;
`

export default () => {
  const state = useSelector((state: any) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    if (
      state.albums.data.length <= 0 ||
      state.photos.data.length <= 0 ||
      state.users.data.length <= 0
    ) {
      dispatch(getAlbums())
      dispatch(getPhotos())
      dispatch(getUsers())
    }
  }, [])

  useEffect(() => {}, [state.albums.dataFiltered])

  return (
    <>
      <LoadingWrapper
        className={
          state.albums.isLoading && state.photos.isLoading ? "" : "hide"
        }
      >
        <Loader type="Puff" color="#ff7f50" height={200} width={200} />
      </LoadingWrapper>
      <BgStyled>
        <Navbar home />
        <OwlCarousel
          style={{ width: "100%" }}
          stagePadding={50}
          dots={false}
          loop={state.albums.dataFiltered.length > 0 ? false : true}
          autoWidth
          nav
          navText={[
            `<img src="${ChevronLeft}">`,
            `<img src="${ChevronRight}">`,
          ]}
          responsive={{
            0: {
              items: 2,
            },
            320: {
              items: 3,
            },
            600: {
              items: 4,
            },
            1000: {
              items: 8,
            },
          }}
        >
          {state.albums.dataFiltered.length > 0
            ? state.albums.dataFiltered.map((item: any, i: number) => {
                console.log(state.albums.dataFiltered)
                if (i === 0) {
                  return (
                    <>
                      <AlbumCard key={i} item={item} />

                      <div className="owl-panel-item title">
                        <div>
                          <h2>RESULTS.</h2>
                        </div>
                      </div>
                    </>
                  )
                } else {
                  return <AlbumCard key={i} item={item} />
                }
              })
            : state.albums.data.map((item: any, i: number) => {
                if (i === 0) {
                  return (
                    <>
                      <AlbumCard key={i} item={item} />

                      <div className="owl-panel-item title">
                        <div>
                          <h2>OUR</h2>
                          <h2>ALBUMS.</h2>
                        </div>
                      </div>
                    </>
                  )
                } else {
                  return <AlbumCard key={i} item={item} />
                }
              })}
        </OwlCarousel>
      </BgStyled>
    </>
  )
}
