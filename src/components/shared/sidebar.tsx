import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar, {
  NavbarItemDefinition,
  NavbarSectionDefinition,
} from "components/navbar";
import { listProfilePageRouteName } from "modules/list-profile/index.page";
import { useAppDispatch } from "store";
import { toggleSideBar } from "store/global-components";
import { typographyPageRouteName } from "modules/design-system/typography/index.page";
import { colorsPageRouteName } from "modules/design-system/colors/index.page";
import { buttonPageRouteName } from "modules/design-system/button/index.page";
import { formFieldPageRouteName } from "modules/design-system/form-field/index.page";
import { iconPageRouteName } from "modules/design-system/icon/index.page";
import { tablesPageRouteName } from "modules/design-system/tables/index.page";

interface SidebarProps {
  active: boolean;
}

const createItems = (
  sectionId: string,
  baseRoute: string,
  count = 5,
): NavbarItemDefinition[] =>
  Array.from({ length: count }, (_, index) => ({
    id: `${sectionId}-user-${index + 1}`,
    title: "User Management",
    path: `${baseRoute}/user-${index + 1}`,
  }));

const navSections: NavbarSectionDefinition[] = [
  {
    id: "components",
    title: "Components",
    items: [
      {
        id: `typography`,
        title: 'Typography',
        path: typographyPageRouteName,
      },
      {
        id: `colors`,
        title: 'Colors',
        path: colorsPageRouteName,
      },
      {
        id: `buttons`,
        title: 'Buttons',
        path: buttonPageRouteName,
      },
      {
        id: `form-fields`,
        title: 'Form Fiels',
        path: formFieldPageRouteName,
      },
      {
        id: `icons`,
        title: 'Icons',
        path: iconPageRouteName,
      },
      {
        id: `tables`,
        title: "Tables",
        path: tablesPageRouteName,
      },
    ],
  },
  {
    id: "main",
    title: "MAIN",
    items:
      [
        {
          id: `main-${listProfilePageRouteName}`,
          title: "User Management",
          path: listProfilePageRouteName,
        }
      ],
  },
  {
    id: "master-data",
    title: "MASTER DATA",
    items: createItems("master-data", "/master-data"),
  },
  {
    id: "support",
    title: "SUPPORT",
    items: createItems("support", "/support"),
  },
];

const allNavItems = navSections.flatMap((section) => section.items);

const Sidebar: React.FC<SidebarProps> = ({ active }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const activeItemId = allNavItems.find((item) =>
    item.path ? location.pathname.startsWith(item.path) : false,
  )?.id;

  const handleItemClick = (item: NavbarItemDefinition) => {
    if (!item.path) {
      return;
    }
    if (window.innerWidth < 1024) {
      dispatch(toggleSideBar());
    }
    navigate(item.path);
  };

  return (
    <aside
      className={`z-[998] max-h-screen h-screen overflow-auto relative top-0 transition-all bg-white border-r border-border shadow-lg ${active ? "left-0 w-[20%]" : "-left-[20%] w-[0%]"
        }`}
    >
      <Navbar
        sections={navSections}
        activeItemId={activeItemId}
        onItemClick={handleItemClick}
        className="h-full"
      />
    </aside>
  );
};

export default Sidebar;
