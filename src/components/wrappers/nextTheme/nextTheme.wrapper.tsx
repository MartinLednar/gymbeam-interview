"use client";

import { FC } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type Props = {
  children?: React.ReactNode;
};

export const ThemeProvider: FC<Props> = ({ children }) => {
  return (
    <NextThemesProvider
      enableSystem
      attribute="className"
      defaultTheme="system"
    >
      {children}
    </NextThemesProvider>
  );
};
