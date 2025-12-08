""
import { NavSection } from "@/types/dashboard.interface";
// import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);

    return [
        {
            items: [
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard",
                    roles: ["USER", "HOST", "ADMIN"],
                },
                {
                    title: "My Profile",
                    href: `/my-profile`,
                    icon: "User",
                    roles: ["USER", "HOST", "ADMIN"],
                },

            ]
        },
        {
            title: "Settings",
            items: [
                {
                    title: "Change Password",
                    href: "/change-password",
                    icon: "Settings", // ✅ String
                    roles: ["USER"],
                },
            ],
        },
    ]
}

export const hostNavItems: NavSection[] = [
  {
    title: "Events Management",
    items: [
      {
        title: "My Events",
        href: "/host/dashboard/my-events",
        icon: "Calendar",
        roles: ["HOST"]
      },
      {
        title: "Create Event",
        href: "/host/dashboard/create-event",
        icon: "PlusCircle",
        roles: ["HOST"]
      },
      {
        title: "Participants Review",
        href: "/host/dashboard/participants-review",
        icon: "Users",
        roles: ["HOST"]
      },
      {
        title: "Payments/Earnings",
        href: "/host/dashboard/payments",
        icon: "DollarSign",
        roles: ["HOST"]
      }
    ]
  }
]

export const userNavItems: NavSection[] = [
    {
        title: "Events",
        items: [
            {
                title: "My Joined Events",
                href: "/user/dashboard/joined-events",
                icon: "Calendar",
                roles: ["USER"]
            },
            {
                title: "Saved Events",
                href: "/user/dashboard/saved-events",
                icon: "Bookmark",
                roles: ["USER"]
            },
            {
                title: "Past Events",
                href: "/user/dashboard/past-events",
                icon: "Clock",
                roles: ["USER"]
            }
        ]
    },
    {
        title: "Reviews",
        items: [
            {
                title: "Reviews Given",
                href: "/user/dashboard/reviews",
                icon: "Star",
                roles: ["USER"]
            }
        ]
    },
    {
        title: "Payments",
        items: [
            {
                title: "My Payments",
                href: "/user/dashboard/payments",
                icon: "CreditCard",
                roles: ["USER"]
            }
        ]
    }
]


export const adminNavItems: NavSection[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Manage Admins",
        href: "/admin/dashboard/admins",
        icon: "Shield",
        roles: ["ADMIN"]
      },
      {
        title: "Manage Hosts",
        href: "/admin/dashboard/hosts",
        icon: "UserCog",
        roles: ["ADMIN"]
      },
      {
        title: "Manage Users",
        href: "/admin/dashboard/users",
        icon: "Users",
        roles: ["ADMIN"]
      }
    ]
  },
  {
    title: "Event Management",
    items: [
      {
        title: "All Events",
        href: "/admin/dashboard/events",
        icon: "CalendarCheck",
        roles: ["ADMIN"]
      },
      {
        title: "Reports / Flags",
        href: "/admin/dashboard/reports",
        icon: "AlertTriangle",
        roles: ["ADMIN"]
      },
      {
        title: "Payments Overview",
        href: "/admin/dashboard/payments",
        icon: "CreditCard",
        roles: ["ADMIN"]
      }
    ]
  }
];


export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "ADMIN":
            return [...commonNavItems, ...adminNavItems];
        case "HOST":
            return [...commonNavItems, ...hostNavItems];
        case "USER":
            return [...commonNavItems, ...userNavItems];
        default:
            return [];
    }
}