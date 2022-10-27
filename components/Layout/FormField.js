import Label from './Label'
import Tooltip from './Tooltip'
import Input from './Input'

export default function FormField({ label, tooltip, ...props }) {
  return (
    <div>
      {label && (
        <Label>
          {label}
          {tooltip && <Tooltip tooltip={tooltip} />}
        </Label>
      )}
      <Input {...props} />
    </div>
  )
}
