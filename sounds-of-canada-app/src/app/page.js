"use client";

import { useState, useEffect } from "react";

import {
  Box,
  Heading,
  Container,
  Flex,
  Highlight,
  Button,
} from "@chakra-ui/react";
import { LuX, LuLoaderCircle } from "react-icons/lu";

import Filters from "@/components/Filters";
import AlbumCardList from "@/components/AlbumCardList";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

/**
 * The Home component is the main entry point for the application, responsible for rendering
 * the user interface to explore Canadian albums. It manages the state for filters, favourites,
 * albums, and loading/error states. The component fetches album data based on the selected filters
 * and updates the UI accordingly. It includes functionalities to update and clear filters, manage
 * favourites, and display albums using the Filters and AlbumCardList components.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 */
export default function Home() {
  const [filters, setFilters] = useState({
    year: [2024],
    genre: [],
    style: [],
    artist: [],
  });

  const [favourites, setFavourites] = useState([]);
  const [albums, setAlbums] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Updates the list of favourites by adding or removing an item.
   * If the item already exists in the list, it is removed; otherwise, it is added.
   *
   * @param {Object} fav - The favourite item to be added or removed.
   * @param {string|number} fav.id - A unique identifier for the favourite item.
   */
  const updateFavourites = (fav) => {
    setFavourites((prevFavourites) => {
      // Check if fav is already in the favourites using a unique property (e.g., fav.id)
      const favExists = prevFavourites.some((item) => item.id === fav.id);

      const newFavs = favExists
        ? prevFavourites.filter((item) => item.id !== fav.id) // Remove fav if it exists - use id or something unique here
        : [...prevFavourites, fav]; // Add fav if it doesn't exist

      return newFavs;
    });
  };

  /**
   * Updates the filter state based on the specified type and values.
   *
   * @param {string} type - The type of filter to update (e.g., "artist", "year", "genre", "style").
   * @param {Array} values - The new values to set for the specified filter type.
   *
   * If the type is "artist", it resets all other filters and sets the artist filter to the provided values.
   * If the type is "year", it resets the artist filter and updates the year filter with the last value in the provided array.
   * For other types, it appends unique values to the existing filter values and resets the artist filter.
   */
  const updateFilter = (type, values) => {
    if (type === "artist") {
      setFilters({ year: [], genre: [], style: [], artist: values });
    } else if (type === "year") {
      setFilters((prev) => ({
        ...prev,
        artist: [],
        year: [values[values.length - 1]],
      }));
    } else {
      setFilters((prev) => {
        const existingValues = prev[type];

        const updatedValues = existingValues.concat(
          values.filter((value) => !existingValues.includes(value))
        );
        return {
          ...prev,
          [type]: updatedValues,
          artist: [],
        };
      });
    }
  };

  /**
   * Updates the filters state by clearing a specific filter type.
   *
   * @param {string} type - The type of filter to clear.
   * @param {any} [value=null] - The specific value to remove from the filter. If null, clears all values for the filter type.
   */
  const handleClearFilter = (type, value = null) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value === null ? [] : prev[type].filter((item) => item !== value),
    }));
  };

  /**
   * useEffect hook to fetch albums from the server based on the current filter settings.
   * Sends a GET request to the specified endpoint with filter parameters for genre, year, and artist.
   * Updates the albums state with the fetched data or sets an error message if the request fails.
   * Dependencies: filters.artist, filters.genre, filters.year.
   */
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        // TODO loop through pages until reach the end
        // every time we get a batch we want to add an Album card list
        const response = await axios.get(`${apiUrl}/albums`, {
          params: {
            genre: filters.genre.length > 0 ? filters.genre : undefined,
            year: filters.year.length > 0 ? filters.year[0] : undefined,
            artist: filters.artist.length > 0 ? filters.artist : undefined,
            page: 1,
          },
        });
        console.log(response.data);
        setAlbums(response.data.results);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [filters.artist, filters.genre, filters.year]);


  /**
   * useEffect hook that fetches albums for a selected artist.
   *
   * This asynchronous function triggers whenever the artist filter changes.
   * It sends a GET request to retrieve albums associated with the selected artist's ID.
   * If no artist is selected, the function returns early.
   *
   * Sets loading state to true while fetching data and updates the albums state
   * with the retrieved releases upon successful response. If an error occurs,
   * it sets the error state with the error message and stops the loading state.
   *
   * Dependencies:
   * - filters.artist: Array containing selected artist information.
   */
  useEffect(() => {
    const fetchArtistAlbums = async () => {
      if (filters.artist.length === 0) return;

      setLoading(true);

      console.log("ive reached here");
      console.log("id: ", filters.artist[0].id);
      try {
        const response = await axios.get(
          `${apiUrl}/${filters.artist[0].id}/artists/albums`
        );
        console.log("responce: ", response.data);

        setAlbums(response.data.releases);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchArtistAlbums();
  }, [filters.artist]);

  if (error) {
    console.log(error);
  }

  return (
    <Container>
      <Box mt={75} mb={75}>
        <Flex gap={4} align="center" mb={4} wrap="wrap">
          <Heading as="h1" size="6xl" fontFamily="heading" fontWeight={500}>
            <Highlight query="Canadian Albums" styles={{ color: "green.400" }}>
              Explore Canadian Albums
            </Highlight>
          </Heading>
        </Flex>

        <Filters
          handleFilterChange={updateFilter}
          filtersArray={filters}
          favourites={favourites}
          updateFavourites={updateFavourites}
        />

        <Flex
          gap={2}
          align="center"
          direction="row"
          mb={4}
          minH="40px"
          wrap="wrap"
        >
          <Heading as="h2" size="lg" fontFamily="heading" fontWeight={500}>
            Filters:
          </Heading>
          <Flex gap={2} wrap="wrap">
            {filters.genre.map((genreFilter) => (
              <Button
                key={genreFilter}
                size="xs"
                borderRadius="lg"
                colorScheme="accent"
                variant="outline"
                onClick={() => handleClearFilter("genre", genreFilter)}
              >
                {genreFilter}
                {console.log("this button is for", genreFilter)}
                <LuX />
              </Button>
            ))}

            {filters.year.map((yearFilter) => (
              <Button
                key={yearFilter}
                size="xs"
                borderRadius="lg"
                colorScheme="accent"
                variant="outline"
                onClick={() => handleClearFilter("year", yearFilter)}
              >
                {yearFilter}
                <LuX />
              </Button>
            ))}

            {filters.artist.map((artistFilter) => (
              <Button
                key={artistFilter.id}
                size="xs"
                borderRadius="lg"
                colorScheme="accent"
                variant="outline"
                colorPalette="green"
                onClick={() => handleClearFilter("artist", artistFilter)}
              >
                {artistFilter.artist}
                <LuX />
              </Button>
            ))}

            {(filters.year.length === 0) &
            (filters.style.length === 0) &
            (filters.genre.length === 0) &
            (filters.artist.length === 0) ? (
              <Heading
                as="h2"
                size="lg"
                fontFamily="heading"
                fontWeight={400}
                color={"green.400"}
              >
                Viewing 2024 Canadian Albums
              </Heading>
            ) : (
              <></>
            )}
          </Flex>
        </Flex>

        {loading ? (
          <>
            <Flex gap={2} align={"center"}>
              <LuLoaderCircle color={"#4ade80"} />
              <Heading
                as="h3"
                size="sm"
                fontFamily="heading"
                fontWeight={400}
                color={"green.400"}
              >
                Loading...
              </Heading>
            </Flex>
          </>
        ) : (
          <AlbumCardList
            data={albums}
            updateArtistFilter={updateFilter}
            updateFavourites={updateFavourites}
            favourites={favourites}
          />
        )}
      </Box>
    </Container>
  );
}
