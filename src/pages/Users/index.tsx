import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, Redirect } from "react-router-dom"
import GoogleMapReact from "google-map-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapPin } from "@fortawesome/free-solid-svg-icons"
import Loader from "react-loader-spinner"
import { getAlbums } from "../../modules/albums/action"
import { getUsers } from "../../modules/users/action"
import { LoadingWrapper } from "../../components/universal"
import AlbumCard from "../../components/AlbumCard"
import OwlCarousel from "react-owl-carousel"
import ChevronLeft from "../../assets/images/chevron-left.png"
import ChevronRight from "../../assets/images/chevron-right.png"
import BgContainer from "../../assets/images/container_bg.png"
import { Album, User } from "../../helpers/interface"
import { BgStyled } from "../../components/universal"

export default (props: any) => {
  const state = useSelector((state: any) => state)
  const dispatch = useDispatch()
  const { id }: { id: string } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [userDetail, setUserDetail] = useState<User>({
    id: 0,
    name: "",
    username: "",
    email: "",
    address: {},
    phone: "",
    website: "",
    company: {},
  })
  const [filteredAlbums, setfilteredAlbums] = useState<Album[]>([])
  const [latLng, setLatLng] = useState({
    lat: 59.95,
    lng: 30.33,
  })

  const getUserDetail = (_userId: number | string) => {
    const _userDetail = state.users.data.filter(
      (item: User) => item.id.toString() === _userId.toString()
    )
    setUserDetail(_userDetail[0])
    setLatLng({
      lat: parseFloat(_userDetail[0].address.geo.lat),
      lng: parseFloat(_userDetail[0].address.geo.lng),
    })
  }

  const getFilteredAlbums = (_userId: number | string) => {
    const _filteredAlbums = state.albums.data.filter(
      (item: Album) => item.userId.toString() === _userId
    )
    setfilteredAlbums(_filteredAlbums)
  }

  const init = (id: number | string) => {
    setIsLoading(true)
    try {
      getUserDetail(id)
      getFilteredAlbums(id)
    } catch (e) {
      console.error("Get Filtered Albums", e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (state.photos.data.length <= 0 || state.users.data.length > 0) {
      dispatch(getAlbums())
      dispatch(getUsers())
      const idFromPath = props.location.pathname.split("/")
      if (idFromPath.length > 0) {
        init(idFromPath[2])
      }
    } else {
      init(id)
    }
    console.log(userDetail)
  }, [id])

  const Marker = (props: any) => (
    <FontAwesomeIcon color="#ff4757" size="3x" icon={faMapPin} />
  )

  return (
    <>
      {!id ? (
        <Redirect to="/" />
      ) : (
        <>
          <LoadingWrapper className={isLoading ? "" : "hide"}>
            <Loader type="Puff" color="#ff7f50" height={200} width={200} />
          </LoadingWrapper>

          <BgStyled className="users" image={BgContainer}>
            <div className="row profile">
              {userDetail && (
                <>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <h1>{userDetail.name}</h1>
                    <div className="row">
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                        <div className="label">Username</div>
                        <h5>{userDetail.username}</h5>
                      </div>
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                        <div className="label">Email</div>
                        <h5>{userDetail.email}</h5>
                      </div>
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                        <div className="label">Phone</div>
                        <h5>{userDetail.phone}</h5>
                      </div>
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                        <div className="label">Website</div>
                        <h5>{userDetail.website}</h5>
                      </div>
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                        <div className="label">Company</div>
                        <h5>{userDetail.company.name}</h5>
                        <small>({userDetail.company.catchPhrase})</small>
                      </div>
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                        <div className="label">Address</div>
                        <h5>
                          {userDetail.address.street},&nbsp;
                          {userDetail.address.suite},&nbsp;
                          {userDetail.address.city}
                          <br />({userDetail.address.zipcode})
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="maps">
                      <GoogleMapReact
                        bootstrapURLKeys={{
                          key: "AIzaSyBP9z4LaL8c5Ve9SXQvA_2wwX2mfbrHa-k",
                        }}
                        defaultCenter={latLng}
                        defaultZoom={11}
                      >
                        <Marker lat={latLng.lat} lng={latLng.lng} />
                      </GoogleMapReact>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="row">
              <div className="col-12">
                <OwlCarousel
                  style={{ width: "100%" }}
                  stagePadding={50}
                  dots={false}
                  loop
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
                  {filteredAlbums.map((item: any, i: number) => {
                    if (i === 0) {
                      return (
                        <>
                          <AlbumCard user key={i} item={item} />

                          <div className="owl-panel-item title">
                            <div>
                              <h2>MY</h2>
                              <h2>ALBUMS.</h2>
                            </div>
                          </div>
                        </>
                      )
                    } else {
                      return <AlbumCard user key={i} item={item} />
                    }
                  })}
                </OwlCarousel>
              </div>
            </div>
          </BgStyled>
        </>
      )}
    </>
  )
}
