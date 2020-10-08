export const hashCode = (s) => s.split("").reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);

export const isBoolean = (val) => "boolean" === typeof val || val === "true";
