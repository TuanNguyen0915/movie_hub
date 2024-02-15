export interface IMovie {
  homepage: string;
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  name: string;
  genres: any[];
  original_language: string;
  original_title: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  videos: {results:[]};
  vote_average: number;
  vote_count: number;
  production_companies: [{name:string}];
  spoken_languages:[{english_name:string}]
}

export interface IGenre {
  id: number;
  name: string;
  movies?: IMovie[];
}

export interface ICast {
  id: number;
  name: string;
  profile_path: string;
  character: string;
}

export interface IReview {
  author: string;
  content: string;
  created_at: string;
  id: string;
}
export interface IVideo {
  type:string
  name:string
  site:string
  id:string
  key:string
}