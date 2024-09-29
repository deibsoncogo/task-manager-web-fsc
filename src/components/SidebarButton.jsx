import { tv } from "tailwind-variants"

export const SidebarButton = ({ children, color }) => {
  const sidebarButton = tv({
    base: "flex items-center gap-2 rounded-lg px-6 py-3",
    variants: {
      color: {
        selected: "bg-brand-primary bg-opacity-15 text-brand-primary",
        unselected: "text-brand-dark-blue",
      },
    },
    defaultVariants: {
      color: "selected",
    },
  })

  return (
    <a href="#" className={sidebarButton({ color })}>
      {children}
    </a>
  )
}
