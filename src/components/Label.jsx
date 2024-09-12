export const Label = ({ children, ...rest }) => {
  return (
    <label className="text-sm font-semibold text-[#35383e]" {...rest}>
      {children}
    </label>
  )
}
