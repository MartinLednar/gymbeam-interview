import { AnchorHTMLAttributes, FC } from "react";
import NextLink from "next/link";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {}

const Link: FC<Props> = ({ href = "", className, children }) => {
  return (
    <NextLink href={href} className={className}>
      {children}
    </NextLink>
  );
};

export default Link;
