import React from "react";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

const sizeClasses: Record<AvatarSize, string> = {
  xs: "w-8 h-8 text-xs",
  sm: "w-10 h-10 text-sm",
  md: "w-12 h-12 text-base",
  lg: "w-16 h-16 text-lg",
  xl: "w-20 h-20 text-xl",
};

function buildInitials(fullName?: string) {
  if (!fullName) return "";

  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((segment) => segment[0]?.toUpperCase() ?? "")
    .join("");
}

interface CommonAvatarProps {
  name?: string;
  size?: AvatarSize;
  shape?: "circle" | "square";
  className?: string;
  alt?: string;
}

type AvatarProps =
  | ({ src: string } & React.ImgHTMLAttributes<HTMLImageElement> &
      CommonAvatarProps)
  | ({ src?: undefined } & React.HTMLAttributes<HTMLDivElement> &
      CommonAvatarProps);

const Avatar: React.FC<AvatarProps> = ({
  name,
  size = "md",
  shape = "circle",
  className = "",
  src,
  alt,
  ...rest
}) => {
  const dimensionClasses = sizeClasses[size] ?? sizeClasses.md;
  const shapeClass = shape === "circle" ? "rounded-full" : "rounded-md";
  const mergedClasses = [dimensionClasses, shapeClass, className]
    .filter(Boolean)
    .join(" ");

  if (src) {
    return (
      <img
        src={src}
        alt={alt ?? name ?? "Avatar"}
        className={`object-cover ${mergedClasses}`.trim()}
        {...(rest as React.ImgHTMLAttributes<HTMLImageElement>)}
      />
    );
  }

  const initials = buildInitials(name);
  return (
    <div
      aria-label={alt ?? name ?? "Avatar"}
      className={`flex items-center justify-center bg-slate-200 text-slate-700 font-semibold ${mergedClasses}`.trim()}
      {...rest}
    >
      {initials || name?.[0]?.toUpperCase() || <span className="text-base">?</span>}
    </div>
  );
};

export default Avatar;
