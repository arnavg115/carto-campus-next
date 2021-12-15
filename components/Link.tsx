import Link from "next/link";
import React, { FC } from "react";
import { colors } from "../lib/Constants";

interface NextLinkProps {
  href: string;
  text: string;
}

const NextLink: FC<NextLinkProps> = ({ href, text }) => {
  return (
    <Link href={href}>
      <span style={{ color: colors.primary.light, cursor: "pointer" }}>
        {text}
      </span>
    </Link>
  );
};

export default NextLink;
