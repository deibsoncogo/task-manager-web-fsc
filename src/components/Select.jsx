import { Label } from "./Label"

export const Select = ({ id, label, ...rest }) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <Label htmlFor={id}>{label}</Label>

      <select
        id={id}
        className="rounded-lg border border-solid border-[#ececec] px-4 py-3 outline-[#00adb5] placeholder:text-sm placeholder:text-[#9a9c9f]"
        {...rest}
      >
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>
    </div>
  )
}
