import React from "react";

type TypographyType = {
  variant?: "h1" | "h2" | "p" | "h3";
  content: string;
  className?: string;
  children?: React.ReactNode;
};
const defaultClassNames = {
  h1: "text-purple-dark text-start text-5xl font-semibold",
  h2: "text-sky-600 text-3xl font-bold mb-6 mt-6",
  h3: "text-lg text-4xl semi-bold ",
  p: "text-sm text-gray-600",
};
const Typography = ({
  variant = "p",
  content,
  className,
  children,
}: TypographyType) => {
  const Tag = variant || "p";

  const combinedClassName = `${defaultClassNames[Tag]} ${
    className || ""
  }`.trim();

  return (
    <Tag className={combinedClassName}>
      {content}
      {children}
    </Tag>
  );
};

export default Typography;
