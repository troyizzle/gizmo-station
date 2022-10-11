import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function ({ children }: LayoutProps) {
  return (
    <div className="p-2">
      {children}
    </div>
  );
}
