import React, { PropsWithChildren } from "react";

export type NavbarItemDefinition = {
  id: string;
  title: string;
  description?: string;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  badge?: React.ReactNode;
  href?: string;
  path?: string;
  disabled?: boolean;
};

export type NavbarSectionDefinition = {
  id: string;
  title: string;
  items: NavbarItemDefinition[];
  badge?: React.ReactNode;
};

export type NavbarProps = PropsWithChildren<{
  sections: NavbarSectionDefinition[];
  activeItemId?: string;
  onItemClick?: (item: NavbarItemDefinition) => void;
  logo?: React.ReactNode;
  className?: string;
}>;

type NavbarItemProps = {
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description?: string;
  active?: boolean;
  badge?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  as?: React.ElementType;
};

type NavbarGroupProps = PropsWithChildren<{
  title: string;
  badge?: React.ReactNode;
}>;

type NavbarComponent = React.FC<NavbarProps> & {
  Group: React.FC<NavbarGroupProps>;
  Item: React.FC<NavbarItemProps>;
};

const DefaultIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x="2"
      y="2"
      width="18"
      height="18"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      rx="2"
    />
    <line
      x1="2"
      y1="2"
      x2="20"
      y2="20"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

const NavbarItem: React.FC<NavbarItemProps> = ({
  Icon = DefaultIcon,
  title,
  description,
  badge,
  active,
  disabled,
  onClick,
  href,
  as,
}) => {
  const baseClasses =
    "flex items-center gap-3 rounded-[8px] px-4 py-2 text-left text-base font-medium transition-all duration-150 w-full";
  const stateClasses = active
    ? "bg-primary-50 text-primary-600 font-semibold"
    : "text-primary-700 hover:text-primary-600 hover:bg-primary-50";
  const disabledClasses = disabled ? "opacity-60 pointer-events-none" : "";

  const Element = as ?? (href ? "a" : "button");
  const isStringElement = typeof Element === "string";

  const elementProps: Record<string, unknown> = {
    ...(isStringElement
      ? Element === "button"
        ? { type: "button", ...(disabled ? { disabled: true } : {}) }
        : { role: "link", ...(disabled ? { "aria-disabled": true, tabIndex: -1 } : {}) }
      : { type: "button" }),
    ...(href ? { href } : {}),
    ...(disabled && !isStringElement ? { "aria-disabled": true, tabIndex: -1 } : {}),
  };

  return (
    <Element
      {...elementProps}
      className={`${baseClasses} ${stateClasses} ${disabledClasses}`}
      aria-current={active ? "page" : undefined}
      onClick={(event: React.MouseEvent) => {
        if (href && onClick) {
          event.preventDefault();
        }
        onClick?.();
      }}
    >
      <span className="flex h-6 w-6 items-center justify-center text-current">
        <Icon className="h-5 w-5 text-current" />
      </span>
      <div className="flex-1 text-left">
        <span>{title}</span>
        {description && <p className="text-xs font-normal text-primary-500">{description}</p>}
      </div>
      {badge && (
        <span className="text-xs font-semibold text-primary-500">{badge}</span>
      )}
    </Element>
  );
};

const NavbarGroup: React.FC<NavbarGroupProps> = ({ title, badge, children }) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary-500">{title}</p>
      {badge && <span className="text-xs font-semibold text-primary-500">{badge}</span>}
    </div>
    <div className="space-y-2">{children}</div>
  </div>
);

const Navbar: NavbarComponent = ({
  sections,
  activeItemId,
  onItemClick,
  className,
  children,
}) => (
  <nav className={`w-full bg-white px-6 py-8 ${className ?? ""}`} aria-label="Sidebar navigation">
    <div className="space-y-8 mt-14">
      {sections.length > 0
        ? sections.map((section) => (
            <NavbarGroup key={section.id} title={section.title} badge={section.badge}>
              {section.items.map((item) => (
                <NavbarItem
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  Icon={item.Icon}
                  badge={item.badge}
                  active={item.id === activeItemId}
                  disabled={item.disabled}
                  href={item.href ?? item.path}
                  onClick={() => {
                    if (item.disabled) return;
                    onItemClick?.(item);
                  }}
                />
              ))}
            </NavbarGroup>
          ))
        : children}
    </div>
  </nav>
);

Navbar.Group = NavbarGroup;
Navbar.Item = NavbarItem;

export default Navbar;
