import { PublicFooter } from "@/components/shared/PublicFooter";
import PublicNavbar from "@/components/shared/PublicNavbar";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { IUserInfo } from "@/types/user.interface";

import React from "react";

export const dynamic = "force-dynamic";

const CommonLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const userInfo = (await getUserInfo()) as IUserInfo;
  console.log("userInfo", userInfo);
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar role={userInfo?.role} />
      <div className="grow">{children}</div>
      <PublicFooter />
      {/* <Toaster position="top-center" richColors /> */}
    </div>
  );
};

export default CommonLayout;
