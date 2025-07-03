import { Panel } from "@/layouts/panel";
import { Row } from "@/layouts/row/row.component";
import styled from "styled-components";
import { hoverBgColor } from "../style.helpers";

export const Container = styled("div")`
  display: block;

  & .stick-top {
    position: sticky;
    position: -webkit-sticky;
    top: 0px;
  }

  & .hide-overflow {
    overflow: hidden;
  }

  & .hide-overflow-x {
    overflow-x: hidden;
  }

  & .hide-overflow-y {
    overflow-y: hidden;
  }

  & .location-tab-button {
    width: 100% !important;
    height: 30px !important;
    justify-content: flex-start;
    border-color: ${hoverBgColor} !important;

    &.GreenevilleBJJ-hover {
      background-color: ${hoverBgColor} !important;
      border-color: ${hoverBgColor} !important;
      color: var(--color-primary) !important;
    }

    &.GreenevilleBJJ-group-active {
      background-color: var(--color-primary) !important;
      color: var(--color-white) !important;
    }

    &[data-disabled="true"] {
      background-color: var(--color-gray-light6) !important;
      border-color: var(--color-gray-light6) !important;
      color: var(--color-gray-light4) !important;
    }
  }

  & .no-click {
    pointer-events: none !important;
    touch-action: none !important;
    cursor: default !important;
  }

  & .loading-container {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 2;
    background-color: var(--color-white);
  }
`;
export const BasePadding = styled(Panel)`
  display: block;
  position: relative;
  padding: 16px 10px;
`;

export const BaseListBodyWithHeader = styled(Row)`
  height: calc(100% - 46px);
  gap: 10px;
`;

export const BaseLeftBodyContainer = styled(Panel)`
  width: 100%;
  height: 100%;
`;

export const BaseLeftBodyContent = styled("div")`
  padding: 2px;
  height: calc(100% - 70px);
  overflow: auto;
`;

export const BaseBodyContainer = styled(Panel)`
  width: 100%;
  height: 100%;
`;

export const BaseBodyContent = styled("div")`
  padding: 6px;
  width: calc(100% - 12px);
  height: calc(100% - 12px);

  & .row-location-divider {
    display: block;
    padding-left: 6px;
    padding-right: 6px;
    position: relative;
  }

  & .toggle_primary_header {
    & span {
      background-color: var(--color-white) !important;
    }

    & span::before {
      background-color: var(--color-primary) !important;
    }
  }
`;
