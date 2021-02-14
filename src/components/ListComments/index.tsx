import React from "react"
import moment from "moment"
import PlaceholderUser from "../../assets/images/placeholder.jpg"

export default (props: any) => {
  return (
    <>
      <div className="list-comment">
        <img src={PlaceholderUser} alt="placeholder" />
        <div className="col">
          <span>
            <b>Anonymous</b>
            &nbsp;{props.data.text}
          </span>
          <small>{moment(props.data.time).fromNow()}</small>
        </div>
      </div>
    </>
  )
}
