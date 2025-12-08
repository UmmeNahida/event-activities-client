import { NavSection } from "@/types/dashboard.interface";
import { IUserInfo } from "@/types/user.interface";

interface DashboardMobileSidebarProps {
  userInfo: IUserInfo;
  navItems: NavSection[];
  dashboardHome: string;
}

const DashboardMobileSidebar = ({
  userInfo,
  navItems,
  dashboardHome,
}: DashboardMobileSidebarProps) => {
  return (
    <div>DashboardMobileSidebar</div>
  )
}

export default DashboardMobileSidebar