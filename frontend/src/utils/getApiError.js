export function getApiError(
  error,
  fallbackMessage = "Something went wrong"
) {

  if (!error.response) {
    return "Unable to connect to the server";
  }

  const responseData = error.response.data;

  if (typeof responseData === "string") {
    return responseData;
  }

  if (responseData?.message) {
    return responseData.message;
  }

  if (responseData?.errors) {
    const firstError = Object.values(
      responseData.errors
    )[0];

    return firstError;
  }

  return fallbackMessage;
}
