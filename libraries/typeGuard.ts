const isError = <T>(input:error|T):input is error => {
  if (input&&typeof input === "object"&&input.hasOwnProperty("error")){
    return true;
  }
  return false
}
export {isError};