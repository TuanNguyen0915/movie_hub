
export const getCreateDate = (date:string) => {
  let getDate = new Date(date);
  let formatDate = `${getDate.getMonth()} - ${getDate.getDate()} - ${getDate.getFullYear()}`
  return formatDate
}