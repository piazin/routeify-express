export const standardizeFullPath = (paths: string[]): string => {
  let standardizedPathArray: string[] = [];

  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    if (!path) continue;
    let arrayPath = path
      .split("/")
      .filter((item) => item !== "" && item !== " ");
    standardizedPathArray = [...standardizedPathArray, ...arrayPath];
  }

  return `/${standardizedPathArray.join("/")}`;
};

const result = standardizeFullPath(["api/", "/user/"]);
console.log(result);
