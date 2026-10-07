import { FetchError } from "ofetch";

export function getErrorMessage(err: unknown) {
  if (err instanceof FetchError) {
    return err.data?.message ?? "Request failed. Please try again";
  }
  if (err instanceof Error) return err.message;
  return "Something went wrong";
}