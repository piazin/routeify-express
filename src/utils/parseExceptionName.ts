export const parseExceptionName = (exceptionName: string): string => {
  return exceptionName.split(/(?=[A-Z])/).join(" ");
};
