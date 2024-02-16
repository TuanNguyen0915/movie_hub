
export const getCreateDate = (date:any) => {
  let getDate = new Date(date);
  let formatDate = `${getDate.getMonth()} - ${getDate.getDate()} - ${getDate.getFullYear()}`
  return formatDate
}