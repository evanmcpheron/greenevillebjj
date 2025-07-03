import { filterProps } from "@/styles/filter.props.helper";

export const LoadingSpinnerContainer = filterProps("div")`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Loader = filterProps("div")`
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 4px solid rgba(200,200,200, 0.12);
    border-top-color: var(--color-primary-base);
    border-radius: 50%;
    animation: mui-spin 0.8s ease-in-out infinite;

      @keyframes mui-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
