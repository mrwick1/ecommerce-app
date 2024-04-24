// update the query params
export const updateQueryParam = (
  paramName: string,
  paramValue: string | number
) => {
  const params = new URLSearchParams(window.location.search);
  const value = paramValue.toString();
  if (value === "") {
    params.delete(paramName);
  } else {
    params.set(paramName, value);
  }

  const newQueryString = params.toString();

  const newUrl =
    newQueryString === ""
      ? decodeURIComponent(window.location.pathname)
      : decodeURIComponent(`${window.location.pathname}?${newQueryString}`);

  window.history.pushState(null, "", newUrl);
};

// get the query params
export const getQueryParam = <T extends string | number | undefined>(
  paramName: string,
  defaultValue?: T
): T => {
  const params = new URLSearchParams(window.location.search);
  const paramValue = params.get(paramName);

  return paramValue !== null ? (paramValue as T) : defaultValue!;
};

// clear all the query params
export const clearAllQueryParams = () => {
  window.history.pushState(
    null,
    "",
    decodeURIComponent(`${window.location.pathname}`)
  );
};

// Function to extract query parameters from the current URL
export const getQueryParams = (): Record<string, string> => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return Object.fromEntries(urlParams.entries());
};

// Function to redirect to a new URL with query parameters
export const urlWithParams = (
  url: string,
  queryParams: Record<string, string>
): string => {
  const urlWithParams = `${url}?${new URLSearchParams(queryParams).toString()}`;
  return urlWithParams;
};
