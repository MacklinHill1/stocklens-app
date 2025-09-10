import axios from "axios";

const API_KEY = "UIJ0837OA304HRBI";
const BASE_URL = "https://www.alphavantage.co/query";


export const getGlobalQuote = async (symbol) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: "GLOBAL_QUOTE",
        symbol: symbol,
        apikey: API_KEY,
      },
    });

    return response.data["Global Quote"];
  } catch (error) {
    console.error("Error fetching global quote:", error);
    return null;
  }
};
