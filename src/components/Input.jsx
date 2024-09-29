import PropTypes from "prop-types"
import { forwardRef } from "react"
import { InputErrorMessage } from "./InputErrorMessage"
import { Label } from "./Label"

export const Input = forwardRef(({ id, label, errorMessage, ...rest }, ref) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <Label htmlFor={id}>{label}</Label>

      <input
        id={id}
        type="text"
        className="rounded-lg border border-solid border-brand-border px-4 py-3 outline-brand-primary placeholder:text-sm placeholder:text-brand-text-gray"
        ref={ref}
        {...rest}
      />

      {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
    </div>
  )
})

Input.displayName = "Input"

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
}
