require("dotenv").config();

const cors = require("cors");
const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
  })
);

// Discogs API base URL and authentication
const DISCOGS_BASE_URL = "https://api.discogs.com";

// Authorization Header
const headers = {
  "Content-Type": `application/x-www-form-urlencoded`,
  Authorization: `OAuth oauth_consumer_key="${
    process.env.DISCOGS_CONSUMER_KEY
  }", oauth_nonce="${Date.now()}", oauth_signature="${
    process.env.DISCOGS_CONSUMER_SECRET
  }&${
    process.env.DISCOGS_OAUTH_TOKEN_SECRET
  }", oauth_signature_method="PLAINTEXT", oauth_timestamp="${Math.floor(
    Date.now() / 1000
  )}", oauth_token="${process.env.DISCOGS_OAUTH_TOKEN}"`,
  "User-Agent": `SoundsOfCanada/1.0`,
};

/**
 * Handles GET requests to the "/albums" endpoint to fetch album data from the Discogs API.
 * 
 * Extracts 'year' and 'genre' from the query parameters, constructs a search query,
 * and sends a request to the Discogs API to retrieve album information.
 * 
 * example request: http://localhost:3001/albums?genre=Electronic
 * 
 * Responds with the retrieved data in JSON format if successful, or an error message
 * with a 500 status code if the request fails.
 * 
 * @param {Object} req - The request object containing query parameters.
 * @param {Object} res - The response object used to send back the desired HTTP response.
 */
app.get("/albums", async (req, res) => {
  try {
    const { year, genre, page } = req.query;
    const genres = Array.isArray(genre) ? genre.join(", ") : genre;

    // Default params
    const params = {
      format: "album",
      country: "Canada",
      type: "release",
      year: year || "2024",
      genre: genres,
      per_page: 50, // Set the number of results per page
      page: page || 1, // Start with the first page
    };

    const response = await axios.get(`${DISCOGS_BASE_URL}/database/search`, {
      headers,
      params,
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(`Error fetching albums: ${error.message} ${error}`);
    res.status(500).json({ error: "Failed to fetch albums" });
  }
});

/**
 * Handles GET requests to fetch release information by ID from the Discogs API.
 *
 * @route GET /releases/:id
 * @param {Object} req - The request object, containing the release ID in params.
 * @param {Object} res - The response object used to send back the API response.
 * @returns {Object} JSON response with release data or an error message.
 * @throws Will log an error and return a 500 status if the API request fails.
 */
app.get("/releases/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${DISCOGS_BASE_URL}/releases/${id}`);

    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      `Error fetching artist with id ${id}: ${error.message} ${error}`
    );
    res.status(500).json({ error: `Failed to fetch releases ${id}` });
  }
});

/**
 * Handles GET requests to fetch artist information by ID from the Discogs API.
 * 
 * @param {Object} req - The request object containing parameters.
 * @param {Object} res - The response object used to send back the desired HTTP response.
 * 
 * @returns {void} Sends a JSON response with artist data if successful, or an error message if failed.
 */
app.get("/artists/:id", async (req, res) => {
  try {
    const { id } = req.params; 
    const response = await axios.get(`${DISCOGS_BASE_URL}/artists/${id}`);

    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      `Error fetching artist with id ${id}: ${error.message} ${error}`
    );
    res.status(500).json({ error: `Failed to fetch artist ${id}` });
  }
});

/**
 * Handles GET requests to fetch releases for a specific artist by ID.
 * 
 * @route GET /artists/:id/releases
 * @param {Object} req - The request object, containing the artist ID in params.
 * @param {Object} res - The response object used to send back the desired data or error.
 * 
 * @returns {Object} JSON response with the artist's releases sorted by year in descending order.
 * 
 * @throws Will return a 500 status code if there is an error fetching the data.
 */
app.get("/artists/:id/releases", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `${DISCOGS_BASE_URL}/artists/${id}/releases?sort=year&sort_order=desc`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      `Error fetching artist with id ${id}: ${error.message} ${error}`
    );
    res.status(500).json({ error: `Failed to fetch artist ${id}` });
  }
});

/**
 * Handles GET requests to fetch albums for a specific artist by release ID.
 * 
 * This endpoint retrieves the artist's albums by first fetching the release details
 * using the provided release ID from the request parameters. It then extracts the
 * artist ID from the release data and fetches the artist's releases.
 * 
 * @param {Object} req - The request object containing the release ID in the URL parameters.
 * @param {Object} res - The response object used to send back the artist's albums data.
 * 
 * @returns {void} Sends a JSON response with the artist's albums data or logs an error if the request fails.
 */
app.get("/:id/artists/albums", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${DISCOGS_BASE_URL}/releases/${id}`);

    try {
      const artistID = response.data.artists[0].id;
      const innerResponse = await axios.get(
        `${DISCOGS_BASE_URL}/artists/${artistID}/releases`
      );

      res.status(200).json(innerResponse.data);
    } catch (error) {
      console.error(
        `Inner Failed to fetch details for release ID ${release.id}`
      );
    }
  } catch (error) {
    console.error(`Outer Failed to fetch details for release ID ${release.id}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
