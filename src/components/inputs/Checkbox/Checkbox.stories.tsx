import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Checkbox from "./Checkbox";
import type { CheckboxProps } from "./Checkbox";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/inputs/Checkbox",
  component: Checkbox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    value: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    readOnly: {
      control: { type: "boolean" },
    },
    indeterminate: {
      control: { type: "boolean" },
    },
  },
} as ComponentMeta<typeof Checkbox>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Checkbox> = ({ value, onChange, ref = undefined, ...args }: CheckboxProps) => {
  const [localValue, setLocalValue] = React.useState<boolean | undefined>((value as boolean) || false);
  const handleChange = (value: boolean, event: React.ChangeEvent<HTMLInputElement>): void => {
    setLocalValue(value);
    onChange(value, event);
  };
  return <Checkbox ref={undefined} value={localValue} onChange={handleChange} {...args} />;
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  placeholder: "Placeholder",
  onChange: (value) => {
    console.log(value);
  },
};

export const Indeterminate = Template.bind({});

Indeterminate.args = {
  readOnly: true,
  indeterminate: true,
  onChange: (value) => {
    console.log(value);
  },
};

export const Disabled = Template.bind({});

Disabled.args = {
  disabled: true,
  onChange: (value) => {
    console.log(value);
  },
};

export const DisabledChecked = Template.bind({});

DisabledChecked.args = {
  disabled: true,
  value: true,
  onChange: (value) => {
    console.log(value);
  },
};

export const ReadOnly = Template.bind({});

ReadOnly.args = {
  readOnly: true,
  value: true,
  onChange: (value) => {
    console.log(value);
  },
};

export const Checked = Template.bind({});

Checked.args = {
  value: true,
  onChange: (value) => {
    console.log(value);
  },
};
