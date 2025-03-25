import { FC, SVGProps } from "react";

type LogoProps = {
  className?: string;
} & Partial<FC<SVGProps<SVGElement>>>;

export default LogoProps;
