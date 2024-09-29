export const Label = ({ children, ...rest }) => {
  return (
    <label className="text-sm font-semibold text-brand-dark-blue" {...rest}>
      {children}
    </label>
  )
}
