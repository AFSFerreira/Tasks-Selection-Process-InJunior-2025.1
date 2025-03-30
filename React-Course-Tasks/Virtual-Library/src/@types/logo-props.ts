import { FC, SVGProps } from "react";

type LogoProps = {
  className?: string;
  onMouseEnter?: (event) => void;
} & Partial<FC<SVGProps<SVGElement>>>;

export default LogoProps;
