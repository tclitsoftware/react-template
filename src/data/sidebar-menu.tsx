import { ManagementType } from "_interfaces/collaborator.interfaces";

interface SubMenuItem {
  name: string;
  path: string;
}
interface MenuItem {
  name: string;
  path: string;
  child?: SubMenuItem[];
  expand?: boolean;
  role: ManagementType[];
}

const menuItems: MenuItem[] = [
  {
    name: "Product Management",
    path: "/product",
    role: [ManagementType.Admin, ManagementType.Collaborator],
  },
  {
    name: "Campaign",
    path: "#",
    role: [ManagementType.Admin],
    child: [
      {
        name: "Campaign Users",
        path: "/campaign-user",
      },
      {
        name: "Campaign Messages",
        path: "/campaign-messages",
      },
    ]
  },
];

export { menuItems };
export type { MenuItem };
