const ToolbarButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className, ...props }) => {
  return (
    <button
      className={`first:rounded-l-md last:rounded-r-md bg-gray-600 px-3 py-2 hover:bg-gray-500 ${
        className || ''
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ToolbarButton;
