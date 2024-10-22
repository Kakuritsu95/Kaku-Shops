function createSearchQuery(
  params: Array<{ [key: string]: string | number }>,
  withoutUrlPath?: boolean
) {
  const searchParams = new URLSearchParams();
  params.forEach((param) =>
    searchParams.append(
      Object.keys(param)[0],
      Object.values(param)[0] as string
    )
  );
  if (withoutUrlPath) return `?${searchParams}`;
  const startQuery = "by-";
  const paramsPath = params
    .map((param) => `${Object.keys(param)[0]}-and-`)
    .join("");
  const paramsPathTrimmed = paramsPath.slice(0, -5);
  return startQuery + paramsPathTrimmed + "?" + searchParams.toString();
}
export { createSearchQuery };
