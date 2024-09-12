import { Label } from "./Label"

export const Input = ({ id, label, ...rest }) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <Label htmlFor={id}>{label}</Label>

      <input
        id={id}
        type="text"
        className="rounded-lg border border-solid border-[#ececec] px-4 py-3 outline-[#00adb5] placeholder:text-sm placeholder:text-[#9a9c9f]"
        {...rest}
      />
    </div>
  )
}
