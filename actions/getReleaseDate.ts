export const getReleaseDate = (date) => {
  let filterDate = date.results?.find((result) => result.iso_3166_1 === "US");
  filterDate = filterDate.release_dates[0].release_date;
  let getDate = new Date(filterDate);
  return getDate.getFullYear();
};
