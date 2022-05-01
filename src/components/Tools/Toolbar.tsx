export const Toolbar: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={`flex flex-row items-center ${className || ''}`} {...props}>
      {children}
    </div>
  );
};
