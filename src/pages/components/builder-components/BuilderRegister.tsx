import { builder, Builder } from "@builder.io/react";
import SliderBanner from "../SliderBanner";
import ImageWithText from "../ImageWithText";

builder.init("142ae83a7d9349ccaad71add607b51ec");

Builder.registerComponent(SliderBanner, {
  name: "SliderBanner",
  inputs: [
    {
      name: "banners",
      type: "list",
      subFields: [
        { name: "id", type: "string", required: true },
        { name: "mobileImage", type: "file" },
        { name: "desktopImage", type: "file" },
        { name: "alt", type: "string" },
        { name: "link", type: "string" },
      ],
      max: 6,
      helperText: "Upload up to 6 banners. More than 6 slides are not allowed.",
    },
  ],
});

Builder.registerComponent(ImageWithText, {
  name: "ImageWithText",
  inputs: [
    { name: "heading", type: "string", defaultValue: "Section Heading" },
    {
      name: "image",
      type: "file",
      allowedFileTypes: ["jpeg", "png", "svg"],
      required: true,
    },
    { name: "alt", type: "string", helperText: "Alt text for accessibility" },
    { name: "title", type: "string", defaultValue: "Title Here" },
    {
      name: "description",
      type: "longText",
      defaultValue: "Your description goes here.",
    },
    {
      name: "alignment",
      type: "string",
      enum: [
        { label: "Image Left, Text Right", value: "left" },
        { label: "Text Left, Image Right", value: "right" },
      ],
      defaultValue: "left",
    },
  ],
});
