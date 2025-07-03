import { Component, type ReactNode } from "react";
import { ErrorStyle } from "./error.boundary.style";
import Typography from "@mui/material/Typography";

const { Container, LogoContainer, BodyContainer } = ErrorStyle;

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log("******ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container>
          <div>
            <LogoContainer></LogoContainer>
            <BodyContainer>
              <Typography variant="h3">
                We seem to have encounted an error.
              </Typography>
              <Typography variant="body1">
                A message has been dispatched to GreenevilleBJJ Support.
              </Typography>
              <Typography variant="body1">
                You can refresh or click the back button in your browser to
                continue.
              </Typography>
            </BodyContainer>
            <details>
              <summary>Error Details</summary>
              <article>
                <pre>
                  <code>{this.state.error && this.state.error.toString()}</code>
                </pre>
              </article>
            </details>
          </div>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
