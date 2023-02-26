import axios from "axios";

class DataSource {
  // tambahkan static untuk function searchClub supaya method dapat diakses 
  // secara secara langsung dari DataSource tanpa harus membuat instance. 
  static async searchMovie(keyword) {
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=14d6c7554923a70d8f8562de59d0b9fa&query=${keyword}&page=1`;
    const response = await axios(URL);

    if(response.data.results) {
      return Promise.resolve(response.data.results);
    } else {
      return Promise.reject(`${keyword} is not found`);
    }
  };

  static async detailMovie(movieid) {
    const URL = `https://api.themoviedb.org/3/movie/${movieid}?api_key=14d6c7554923a70d8f8562de59d0b9fa&language=en-US`
  }
  
}

export default DataSource;
