"use client";

import * as React from "react";
import {
  LayoutPanelLeft,
  LayoutDashboard,
  Mail,
  CheckSquare,
  MessageCircle,
  Calendar,
  Shield,
  AlertTriangle,
  Settings,
  HelpCircle,
  CreditCard,
  LayoutTemplate,
  Users,
  RectangleCircle,
  CalendarCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/logo";
import { SidebarNotification } from "@/components/sidebar-notification";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { useMe } from "@/app/auth/api/hooks";
import { isAdmin } from "@/lib/scopes";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Ploshtadka.BG",
    email: "store@example.com",
    avatar: "",
  },
  navGroups: [
    {
      label: "Табла",
      items: [
        {
          title: "Табло",
          url: "/dashboard",
          icon: LayoutDashboard,
        },
        // {
        //   title: "Dashboard 2",
        //   url: "/dashboard-2",
        //   icon: LayoutPanelLeft,
        // },
      ],
    },
    {
      label: "Приложения",
      items: [
        {
          title: "Потребители",
          url: "/users",
          icon: Users,
          adminOnly: true,
        },
        {
          title: "Обекти",
          url: "/venues",
          icon: RectangleCircle,
        },
        {
          title: "Резервации",
          url: "/bookings",
          icon: CalendarCheck,
        },
      ],
    },
    {
      label: "Страници",
      items: [
        {
          title: "Начална страница",
          url: "/landing",
          target: "_blank",
          icon: LayoutTemplate,
        },
        {
          title: "Автентикация",
          url: "#",
          icon: Shield,
          items: [
            {
              title: "Вход",
              url: "/auth/sign-in",
            },
            {
              title: "Регистрация",
              url: "/auth/sign-up",
            },
            {
              title: "Забравена парола",
              url: "/auth/forgot-password",
            },
          ],
        },
        {
          title: "Грешки",
          url: "#",
          icon: AlertTriangle,
          items: [
            {
              title: "Неоторизиран",
              url: "/errors/unauthorized",
            },
            {
              title: "Забранен достъп",
              url: "/errors/forbidden",
            },
            {
              title: "Не е намерено",
              url: "/errors/not-found",
            },
            {
              title: "Вътрешна сървърна грешка",
              url: "/errors/internal-server-error",
            },
            {
              title: "В поддръжка",
              url: "/errors/under-maintenance",
            },
          ],
        },
        // {
        //   title: "Settings",
        //   url: "#",
        //   icon: Settings,
        //   items: [
        //     {
        //       title: "User Settings",
        //       url: "/settings/user",
        //     },
        //     {
        //       title: "Account Settings",
        //       url: "/settings/account",
        //     },
        //     {
        //       title: "Plans & Billing",
        //       url: "/settings/billing",
        //     },
        //     {
        //       title: "Appearance",
        //       url: "/settings/appearance",
        //     },
        //     {
        //       title: "Notifications",
        //       url: "/settings/notifications",
        //     },
        //     {
        //       title: "Connections",
        //       url: "/settings/connections",
        //     },
        //   ],
        // },
        // {
        //   title: "FAQs",
        //   url: "/faqs",
        //   icon: HelpCircle,
        // },
        // {
        //   title: "Pricing",
        //   url: "/pricing",
        //   icon: CreditCard,
        // },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: me } = useMe();
  const admin = me ? isAdmin(me.scopes) : false;

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Logo size={24} className="text-current" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Ploshtadka.BG</span>
                  <span className="truncate text-xs">
                    Административен панел
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {data.navGroups.map((group) => {
          const items = admin
            ? group.items
            : group.items.filter((item) => !item.adminOnly);
          return (
            <NavMain key={group.label} label={group.label} items={items} />
          );
        })}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
