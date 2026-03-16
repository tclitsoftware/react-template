export const quilFormats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "align",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "color",
];

export const quilModules = {
  toolbar: [
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
    ["link"],
    [{ size: ["small", "regular", "large", "huge"] }],
    [{ color: [] }],
  ],
  clipboard: {
    matchVisual: false,
  },
};
