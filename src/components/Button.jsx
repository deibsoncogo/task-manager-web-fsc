import { tv } from "tailwind-variants"

export const Button = ({ children, color, size, className, ...rest }) => {
  const button = tv({
    base: "flex items-center justify-center gap-2 rounded-md px-3 font-semibold transition hover:opacity-75",
    variants: {
      color: {
        primary: "bg-brand-primary text-white",
        secondary: "bg-brand-light-gray text-brand-dark-blue",
        ghost: "bg-transparent text-brand-dark-gray",
      },
      size: {
        small: "py-1 text-xs",
        large: "py-2 text-sm",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "small",
    },
  })

  return (
    <button
      type="button"
      className={button({ color, size, className })}
      {...rest}
    >
      {children}
    </button>
  )
}
