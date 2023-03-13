import { useRef, useEffect } from "react";

function OutsideClickHandler({ children, outsideClick, onkeyEsc }) {
  const wrapperRef = useRef();

  const handleEventClick = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target))
      outsideClick();
  };

  const handleEventOnkey = (event) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target) &&
      event.keyCode === 27
    )
      onkeyEsc();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleEventClick);
    document.addEventListener("keydown", handleEventOnkey);

    return () => {
      document.removeEventListener("mousedown", handleEventClick);
      document.removeEventListener("keydown", handleEventOnkey);
    };
  });

  return <div ref={wrapperRef}>{children}</div>;
}

OutsideClickHandler.defaultProps = {
  outsideClick: () => {},
  onkeyEsc: () => {},
};

export default OutsideClickHandler;
