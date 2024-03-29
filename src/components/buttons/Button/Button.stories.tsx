import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Button from "@/components/buttons/Button";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/buttons/Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  variant: "primary",
  children: "Minecraft UI",
};

export const Secondary = Template.bind({});

Secondary.args = {
  children: "Click me!",
};

export const Clear = Template.bind({});

Clear.args = {
  variant: "clear",
  children: "Click me!",
};
