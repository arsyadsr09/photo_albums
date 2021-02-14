import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import ExpandWhiteIcon from "../../assets/images/expand-plus-white.png"
import { User } from "../../helpers/interface"

export default (props: any) => {
  const state = useSelector((state: any) => state)
  const [userDetail, setUserDetail] = useState<User>({
    id: 0,
    username: "",
    email: "",
    name: "",
    address: {},
    phone: "",
    website: "",
    company: {},
  })

  const getUserDetail = (_userId: number) => {
    const _userDetail = state.users.data.filter(
      (item: User) => item.id === _userId
    )
    setUserDetail(_userDetail[0])
  }

  useEffect(() => {
    getUserDetail(props.item.userId)
  }, [])

  return (
    <Link
      className={`owl-panel-item regular`}
      style={{
        backgroundImage: `url(${props.item.thumbnailUrl})`,
      }}
      title={props.item.title.toUpperCase()}
      to={`/albums/${props.item.id}`}
    >
      <div className="mask">
        <div className="plus">
          <img
            className="button-expand"
            src={ExpandWhiteIcon}
            alt="expand-button"
          />
        </div>
        <label className="foot">{props.item.title} </label>
        <div className="banner">
          <div className="bottom">
            <div className="title">
              <h4>{props.item.title.toUpperCase()}.</h4>
              {!props.user && (
                <div className="user">
                  <span>by</span>
                  <br />
                  <span>{userDetail.username}</span>
                </div>
              )}
            </div>
            <label>
              <span style={{ lineHeight: 1.1 }}>View Albums</span> &nbsp;
              <FontAwesomeIcon icon={faChevronRight} />
            </label>
          </div>
        </div>
      </div>
    </Link>
  )
}
