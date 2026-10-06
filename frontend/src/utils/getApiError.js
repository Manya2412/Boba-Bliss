export function getApiError(
  error,
  fallbackMessage = "Something went wrong"
) {
  // Network error
  if (!error.response) {
    return "Unable to connect to the server";
  }

  const responseData = error.response.data;

  // Backend returns plain string
  if (typeof responseData === "string") {
    return responseData;
  }

  // Backend returns { message: "..." }
  if (responseData?.message) {
    return responseData.message;
  }

  // Spring Validation Errors
  if (responseData?.errors) {
    const firstError = Object.values(
      responseData.errors
    )[0];

    return firstError;
  }

  return fallbackMessage;
}
