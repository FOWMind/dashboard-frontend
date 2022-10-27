import styled from 'styled-components'
import { useRef } from 'react'

// Components
import Label from './Label'
import Tooltip from './Tooltip'
import Input from './Input'
import { DashboardButton as StyledButton } from './DashboardButton'

export default function FormFileField({
  label,
  tooltip,
  fileButtonText,
  ...props
}) {
  const fileInputRef = useRef()

  return (
    <div>
      {label && (
        <Label>
          {label}
          {tooltip && <Tooltip tooltip={tooltip} />}
        </Label>
      )}

      {fileButtonText && (
        <DashboardImageButton
          type="button"
          onClick={(event) => {
            event.preventDefault()
            fileInputRef.current.click()
          }}
        >
          {fileButtonText}
        </DashboardImageButton>
      )}

      <Input
        innerRef={fileInputRef}
        type="file"
        onClick={(event) => {
          event.target.value = null
        }}
        value={undefined}
        hidden={fileButtonText ? true : false}
        {...props}
      />
    </div>
  )
}

const DashboardImageButton = styled(StyledButton)`
  margin-bottom: 0.5rem;
`
