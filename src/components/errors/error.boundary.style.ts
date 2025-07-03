import { filterProps } from "@/styles/filter.props.helper";

const Container = filterProps("div")`
background: red;
`;

const LogoContainer = filterProps("div")`
background: blue;
`;
const BodyContainer = filterProps("div")`
background: green;
`;

export const ErrorStyle = {
  Container,
  LogoContainer,
  BodyContainer,
};
