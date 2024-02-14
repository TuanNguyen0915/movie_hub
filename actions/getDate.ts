export const getReleaseDate = (date) => {
  let filterDate = date.results?.find((result) => result.iso_3166_1 === "US");
  filterDate = filterDate.release_dates[0].release_date;
  let getDate = new Date(filterDate);
  return getDate.getFullYear();
};

export const getCreateDate = (date) => {
  let getDate = new Date(date);
  let formatDate = `${getDate.getMonth()} - ${getDate.getDate()} - ${getDate.getFullYear()}`
  return formatDate
}