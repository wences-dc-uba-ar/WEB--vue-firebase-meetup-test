export default (value: Date): string => {
  return value.toLocaleString(["es-AR", "en-US"], {
    month: "long",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};
