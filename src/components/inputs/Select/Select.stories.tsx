import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Select from "./Select";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ReactComponentLibrary/inputs/Select",
  component: Select,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Select>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Select> = (args) => {
  const [value, setValue] = React.useState<string>(
    (args.value as string) || ""
  );
  const handleChange = (value: string): void => {
    console.log(value);
    setValue(value);
    args.onChange(value);
  };
  return (
    <Select
      {...args}
      options={[
        {
          label: "Option 1",
          value: "option-1",
        },
        {
          label: "Option 2",
          value: "option-2",
        },
        {
          label: "Option 3",
          value: "option-3",
        },
        {
          label: "Option 3 (disabled)",
          value: "option-disabled",
          disabled: true,
        },
        {
          label: "Option 4",
          value: "option-4",
        },
      ]}
      value={value}
      onChange={handleChange}
    />
  );
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  placeholder: "Select a value",
  searchPlaceholder: "Search for a value",
  value: "option-1",
  onChange: (value: string): void => console.log(value),
};