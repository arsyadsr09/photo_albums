import styled from "styled-components"
import { BgStyledComponent } from "../helpers/interface"

export const LoadingWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2f3542dd;
  transition: all 0.5s ease;
  opacity: 1;
  z-index: 2;

  &.hide {
    transition: all 0.5s ease;
    opacity: 0 !important;
    z-index: -1 !important;
  }
`

export const BgStyled = styled.div<BgStyledComponent>`
  background-image: url(${(props) => props.image});
`
