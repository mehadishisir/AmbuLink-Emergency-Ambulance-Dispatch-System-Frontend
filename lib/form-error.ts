export function getFieldError(errors: unknown[]): string {
  if (!errors || errors.length === 0) return "";
  const first = errors[0];
  if (typeof first === "string") return first;
  if (first && typeof first === "object" && "message" in first) {
    return String((first as { message: unknown }).message);
  }
  return "";
}