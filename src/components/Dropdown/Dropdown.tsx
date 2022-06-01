import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { Placement } from "@popperjs/core";
import { usePopper } from "react-popper";
import cn from "classnames";
import "./Dropdown.css";

export type DropdownProps = {
  content: React.ReactNode;
  children: any;
  closeOnContentClick?: boolean;
  placement?: Placement;
};

const Dropdown = ({
  content,
  children,
  placement,
  closeOnContentClick,
}: DropdownProps) => {
  const [visible, setVisible] = React.useState<boolean>(false);
  const [referenceElement, setReferenceElement] = React.useState(null);
  const [popperElement, setPopperElement] = React.useState(null);
  const instance = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [],
  });
  const { styles, attributes } = instance;

  const handleMouseDown = (event: React.MouseEvent) => {
    setVisible(!visible);
  };

  const handleClickOnContent = (event: React.MouseEvent) => {
    if (closeOnContentClick) {
      setVisible(false);
    }
  };

  React.useEffect(() => {
    if (visible) {
      const handler = (event) => {
        if (
          !referenceElement.contains(event.target) &&
          !popperElement.contains(event.target)
        ) {
          setVisible(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => {
        document.removeEventListener("mousedown", handler);
      };
    }
  }, [visible, referenceElement, popperElement]);

  return (
    <>
      {typeof children === "function"
        ? children({
            ref: setReferenceElement,
            open: () => setVisible(true),
            close: () => setVisible(false),
            visible,
            className: cn("DropdownTarget", { visible }),
          })
        : React.cloneElement(children, {
            ref: setReferenceElement,
            onMouseDown: handleMouseDown,
            className: cn("DropdownTarget", { visible }),
          })}
      {visible &&
        ReactDOM.createPortal(
          <div
            ref={setPopperElement}
            style={styles.popper}
            className={cn("Dropdown", {
              ["Dropdown_visible"]: visible,
            })}
            onClick={handleClickOnContent}
            {...attributes.popper}
          >
            {content}
          </div>,
          document.querySelector("body")
        )}
    </>
  );
};

Dropdown.propTypes = {
  content: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  placement: PropTypes.string,
  closeOnContentClick: PropTypes.bool,
};

Dropdown.defaultProps = {
  placement: "bottom-end",
};

export default Dropdown;
