export const getMoviesApi = async (sub_url: string) => {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
      },
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_URL}/${sub_url}`,
      options,
    );
    const data = res.ok ? await res.json() : Promise.reject(res);
    return data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
