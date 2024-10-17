import {
  LayoutDashboard,
  Plus,
  Shapes,
  ShoppingBag,
  Tag,
  UsersRound,
} from "lucide-react";

export const navLinks = [
  {
    url: "/",
    icon: <LayoutDashboard />,
    label: "Dashboard",
  },
  {
    url: "/collections",
    icon: <Shapes />,
    label: "Collections",
  },
  {
    url: "/products",
    icon: <Tag />,
    label: "Products",
  },
  {
    url: "/orders",
    icon: <ShoppingBag />,
    label: "Orders",
  },
  {
    url: "/customers",
    icon: <UsersRound />,
    label: "Customers",
  },
  {
    url: "/products/new",
    icon: <Plus size={'1rem'} />,
    label: "Create Product",
  },
  {
    url: "/collections/new",
    icon: <Plus size={'1rem'} />,
    label: "Create Collection",
  },
];
