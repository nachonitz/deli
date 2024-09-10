import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Page = ({ children }: Props) => {
  return (
    <div className="w-full flex justify-center min-h-[calc(100vh-theme(space.header)-theme(space.footer))]">
      <div className="w-[90%] max-w-page">{children}</div>
    </div>
  );
};

export default Page;
