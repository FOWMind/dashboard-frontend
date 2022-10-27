// Components
import Label from "./Label";
import Tooltip from "./Tooltip";
import EditableList from "./EditableList";

export default function FormEditableList({
  label,
  tooltip,
  maxLength,
  ...props
}) {
  return (
    <div>
      {label && (
        <Label>
          {label}
          {tooltip && <Tooltip tooltip={tooltip} />}
        </Label>
      )}

      <EditableList
        listEmptyText={"No has agregado ningún elemento."}
        maxLength={maxLength}
        {...props}
      />
    </div>
  );
}
