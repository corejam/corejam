export default {
  property: "width",
  transform(value: string | number) {
    if (typeof value === "string") {
      if (value.indexOf("px") > -1) return value;
      return ((100 / 12) * parseInt(value)).toFixed(2) + "%";
    } else {
      return ((100 / 12) * value).toFixed(2) + "%";
    }
  },
};
