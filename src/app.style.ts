import { filterProps } from "@/styles/filter.props.helper";

const Container = filterProps("div")`
background: var(--color-background-base);
color: var(--color-text-primary);
width: 100vw;
min-height: 100vh;
padding: var(--space-4);
`;

export const AppStyle = {
  Container,
};
