export const removeSlashSuffix = (input) => {
  /**
   * Remove the last character of a string if it is a slash
   *
   * Used to remove the slash from the end of a URL
   *
   * @param {string} input - The string to remove the slash from
   * @returns {string} - The string with the slash removed
   * @example
   * removeSlashSuffix("hello/") // returns "hello"
   */
  if (input.charAt(input.length - 1) === "/") {
    return input.substr(0, input.length - 1);
  } else {
    return input;
  }
};
