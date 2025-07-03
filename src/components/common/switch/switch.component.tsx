import { Children, isValidElement } from "react";
import type { CaseProps, DefaultProps, SwitchProps } from "./switch.types";

const Switch: React.FC<SwitchProps> & {
  Case: React.FC<CaseProps>;
  Default: React.FC<DefaultProps>;
} = ({ children }) => {
  let match = false;

  const cases = Children.map(children, (child: React.ReactNode) => {
    if (!isValidElement(child)) return null;
    if (child.type === Switch.Case && (child.props as CaseProps).condition) {
      match = true;
      return child;
    }
    if (child.type === Switch.Default && !match) {
      return child;
    }
    return null;
  });

  return <>{cases}</>;
};

Switch.Case = ({ condition, children }: CaseProps) =>
  condition ? <>{children}</> : null;

Switch.Default = ({ children }: DefaultProps) => <>{children}</>;

export { Switch };
