import styled from "styled-components";
import { useState, useRef } from "react";
import { usePopper } from "react-popper";

export default function Tooltip({ tooltip }) {
  const [isOpen, setOpen] = useState(false);
  const tooltipBoxRef = useRef();
  const tooltipRef = useRef();
  const { styles, attributes } = usePopper(
    tooltipBoxRef.current,
    tooltipRef.current
  );

  let timeout;
  const tooltipBoxOverDelay = 300;
  const tooltipOverDelay = 100;

  const OpenTooltip = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => setOpen(true), tooltipBoxOverDelay);
    return;
  };

  const CloseTooltip = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => setOpen(false), tooltipOverDelay);
    return;
  };

  const ToggleTooltip = () => setOpen((prev) => !prev);

  return (
    <>
      <StyledTooltipBox
        onClick={ToggleTooltip}
        onMouseEnter={OpenTooltip}
        onMouseLeave={CloseTooltip}
        ref={tooltipBoxRef}
      >
        ?
      </StyledTooltipBox>
      {tooltip && (
        <StyledTooltip
          ref={tooltipRef}
          visible={isOpen}
          onMouseEnter={OpenTooltip}
          onMouseLeave={CloseTooltip}
          style={styles.popper}
          {...attributes.popper}
        >
          {tooltip?.toString()}
        </StyledTooltip>
      )}
    </>
  );
}

const Container = styled.div`
  position: relative;
`;

const StyledTooltipBox = styled.div`
  background-color: #000;
  color: #fff;
  width: 20px;
  height: 20px;
  border-radius: 50px;
  display: inline-block;
  text-align: center;
  font-size: 0.9rem;
  line-height: 20px;
  margin-left: 0.25rem;
  cursor: default;
`;

const StyledTooltip = styled.p`
  z-index: 100; // Don't remove if using PopperJS
  padding: 0.5rem;
  background-color: #000;
  color: #fff;
  font-size: 0.9rem;
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  max-width: 90%;
`;
