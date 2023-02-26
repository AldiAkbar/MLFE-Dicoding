class DataSource {
  // tambahkan static untuk function searchClub supaya method dapat diakses 
  // secara secara langsung dari DataSource tanpa harus membuat instance. 
  static async searchClub(keyword) {
    const response = await fetch(`https://sports-api.dicoding.dev/teams/search?t=${keyword}`);
    const responseJson = await response.json();

    if(responseJson.teams) {
      return Promise.resolve(responseJson.teams);
    } else {
      return Promise.reject(`${keyword} is not found`);
    }
  };
  
}

export default DataSource;
