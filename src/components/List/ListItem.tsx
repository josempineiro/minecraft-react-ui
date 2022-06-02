import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import "./ListItem.css";
import DropdownMenu, { DropdownMenuProps } from "../DropdownMenu";

export type ListItemSelectionProps = {
  toggle: () => void;
  selected: boolean;
  selectedIds: string[];
  disabled: boolean;
  checkbox: React.ReactElement;
};

export type ListItemProps = React.HTMLProps<HTMLLIElement> & {
  children: React.ReactNode;
  selection: ListItemSelectionProps;
  options: DropdownMenuProps["items"];
};

const ListItem = ({
  children,
  selection,
  options,
  onClick,
  ...rest
}: ListItemProps) => {
  const selectionEnable = selection && selection.selectedIds.length > 0;
  const selected = selection && selection.selected;
  const handleClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    if (selectionEnable) {
      selection.toggle();
    } else if (onClick) {
      onClick(event);
    }
  };
  return (
    <li
      className={cn("ListItem", {
        ["ListItem_selected"]: selected,
        ["ListItem_selection"]: selectionEnable,
      })}
      onClick={handleClick}
      {...rest}
    >
      {selection &&
        React.cloneElement(selection.checkbox, {
          className: "ListItemCheckbox",
        })}
      <div className={cn("ListItemContent")}>{children}</div>
      {options && (
        <DropdownMenu
          onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            event.stopPropagation()
          }
          placement="bottom-end"
          items={options}
        />
      )}
    </li>
  );
};

ListItem.propTypes = {
  children: PropTypes.node,
  selection: PropTypes.shape({
    toggle: PropTypes.func,
    selected: PropTypes.bool,
    selectedIds: PropTypes.arrayOf(PropTypes.string),
    disabled: PropTypes.bool,
    checkbox: PropTypes.node,
  }),
};

export default ListItem;
