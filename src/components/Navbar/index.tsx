import React, { useEffect, useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faHeart,
  faSearch,
  faEraser,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons"
import Autocomplete from "react-autocomplete"
import { Link } from "react-router-dom"
import debounce from "lodash.debounce"
import {
  clearFilteredAlbums,
  setFilteredAlbums,
} from "../../modules/albums/action"

export const NavbarStyled = styled.div`
  padding: 2rem 5rem;
  margin: 0 2rem;
  margin-bottom: 2rem;

  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export default (props: any) => {
  const state = useSelector((state: any) => state)
  const dispatch = useDispatch()
  const [searchController, setSearchController] = useState("")
  const [searchActive, setSearchActive] = useState(false)

  //== mode 0 : name | mode 1 : user
  const [mode, setMode] = useState(0)

  useEffect(() => {}, [state.albums.dataFiltered, searchController])

  const onSearchByName = (value: string) => {
    if (value.length <= 0) {
      setSearchController("")
      dispatch(clearFilteredAlbums())
    } else {
      setSearchController(value)
      onDebounce(value)
    }
  }
  const onSelect = (value: string) => {
    setSearchController(value)
    onDebounce(value)
  }

  const onDebounce = useCallback(
    debounce((value) => {
      dispatch(setFilteredAlbums(value))
    }, 500),
    [searchController]
  )

  const onClearClicked = () => {
    setSearchController("")
    dispatch(clearFilteredAlbums())
  }

  return (
    <NavbarStyled className={`navbar ${searchActive && "selected"}`}>
      {props.home && (
        <>
          {state.albums.dataFiltered.length > 0 && (
            <div className="nav-btn" onClick={onClearClicked}>
              <FontAwesomeIcon size="lg" color="#ff4757" icon={faEraser} />
              <div className="text" style={{ color: "#ff4757" }}>
                CLEAR
              </div>
            </div>
          )}
          {/* <div className="exchange">
            <div className="text">{mode === 0 ? "Album Name" : "User name"}</div>
            <FontAwesomeIcon
              size="lg"
              className="icon"b
              color={mode === 0 ? "#1e90ff" : "#ff4757"}
              icon={faExchangeAlt}
              title={`Change to ${mode === 0 ? "User" : "Album"}`}
              onClick={() => setMode(mode === 0 ? 1 : 0)}
            />
          </div> */}
          <div className={`search ${searchActive && "active"}`}>
            <Autocomplete
              getItemValue={(item) => item.title}
              items={state.albums.data}
              menuStyle={{
                borderRadius: "0",
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
                background: "red",
                fontSize: "90%",
                position: "fixed",
                overflow: "auto",
                zIndex: 5,
                maxHeight: "15%",
              }}
              shouldItemRender={(item, value) =>
                mode === 0
                  ? item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
                  : item.username.toLowerCase().indexOf(value.toLowerCase()) >
                    -1
              }
              renderItem={(item, isHighlighted) => (
                <div
                  className="render-item-search"
                  style={{
                    background: isHighlighted ? "lightgray" : "white",
                  }}
                >
                  {item.title}
                </div>
              )}
              value={searchController}
              onChange={(e) => onSearchByName(e.target.value)}
              onSelect={(val) => onSelect(val)}
            />
          </div>
          <div
            className={`nav-btn search ${searchActive && "active"}`}
            onClick={() => {
              setSearchActive(!searchActive)
              console.log(searchActive)
              console.log("blueee")
            }}
          >
            <FontAwesomeIcon size="lg" icon={faSearch} />
            <div className="text search-text">Search</div>
          </div>
        </>
      )}
      <Link to="/favourite" className="nav-btn">
        <FontAwesomeIcon size="lg" icon={faHeart} />
        <div className="text">Favourite</div>
      </Link>
    </NavbarStyled>
  )
}
