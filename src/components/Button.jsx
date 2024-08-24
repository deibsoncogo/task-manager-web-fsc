export const Button = ({ children, variant = "primary", ...rest }) => {
  const getVariantClasses = () => {
    if (variant === "primary") {
      return "bg-[#00adb5] text-white"
    }

    if (variant === "ghost") {
      return "bg-transparent text-[#818181]"
    }
  }

  return (
    <button
      type="button"
      className={`flex items-center gap-2 rounded-md px-3 py-1 text-xs font-semibold transition hover:opacity-75 ${getVariantClasses()}`}
      {...rest}
    >
      {children}
    </button>
  )
}
