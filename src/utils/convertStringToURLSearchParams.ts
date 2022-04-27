export const convertStringToURLSearchParams = (query: string) => {
  return new URLSearchParams({"" : query}).toString().slice(1)
}
