import PropTypes from "prop-types"
import { tv } from "tailwind-variants"

export const Button = ({
  children,
  color,
  size,
  disabled,
  className,
  ...rest
}) => {
  const button = tv({
    base: "flex items-center justify-center gap-2 rounded-md px-3 font-semibold transition hover:opacity-75",
    variants: {
      color: {
        primary: "bg-brand-primary text-white",
        secondary: "bg-brand-light-gray text-brand-dark-blue",
        ghost: "bg-transparent text-brand-dark-gray",
        danger: "bg-brand-danger text-brand-white",
      },
      size: {
        small: "py-1 text-xs",
        large: "py-2 text-sm",
      },
      disabled: { true: "cursor-not-allowed opacity-50 hover:opacity-50" },
    },
    defaultVariants: {
      color: "primary",
      size: "small",
    },
  })

  return (
    <button
      type="button"
      className={button({ color, size, disabled, className })}
      {...rest}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["primary", "secondary", "ghost", "danger"]),
  size: PropTypes.oneOf(["small", "large"]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
}
