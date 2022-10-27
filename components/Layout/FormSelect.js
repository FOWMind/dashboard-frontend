import Label from "./Label";
import Tooltip from "./Tooltip";
import Select from "./Select";

export default function FormSelect({ label, tooltip, ...props }) {
  return (
    <div>
      {label && (
        <Label>
          {label}
          {tooltip && <Tooltip tooltip={tooltip} />}
        </Label>
      )}
      <Select {...props} />
    </div>
  );
}
