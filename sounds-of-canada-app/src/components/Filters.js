"use client";

import { useState } from "react";
import { Flex, Button, Heading } from "@chakra-ui/react";
import FilterDrawer from "@/components/FilterDrawer";
import FavouritesCard from "./FavouritesCard";

const years = Array.from({ length: 2024 - 1930 + 1 }, (_, i) => 2024 - i);

const genres = [
  "Pop",
  "Rock",
  "Hip-Hop",
  "Jazz",
  "Classical",
  "Electronic",
  "Reggae",
  "Country",
  "Blues",
  "R&B",
  "Soul",
  "Funk",
  "Metal",
];

/**
 * Filters component that provides filtering functionality for genres, styles, and years.
 * It also displays a list of favourite items using the FavouritesCard component.
 *
 * @param {Function} handleFilterChange - Callback function to handle changes in filters.
 * @param {Object} filtersArray - Object containing arrays of active filters for each category.
 * @param {Array} favourites - Array of favourite items to be displayed.
 * @param {Function} updateFavourites - Callback function to update the list of favourites.
 *
 * @returns {JSX.Element} A Flex container with FilterDrawer components for each filter category
 * and a list of favourite items.
 */
const Filters = ({
  handleFilterChange,
  filtersArray,
  favourites,
  updateFavourites,
}) => {
  const [activeFilters, setActiveFilters] = useState([2024]);

  const [activeFilterCategory, setActiveFilterCategory] = useState("year");

  // Update the activeFilters state
  const updateFilter = (type, value) => {
    if (activeFilterCategory !== type) {
      setActiveFilterCategory(type);
      setActiveFilters([]);
    }
    if (activeFilterCategory === "year") {
      setActiveFilters([value]);
    } else {
      setActiveFilters((prev) => {
        let updatedFilters = [...prev]; // Start with the existing filters

        console.log("right before foreach loop");
        console.log(value);

        if (updatedFilters.includes(value)) {
          updatedFilters = updatedFilters.filter((item) => item !== value);
        } else {
          updatedFilters.push(value);
        }
        return updatedFilters; // Return the updated filters
      });
    }
  };

  const handleSaved = () => {
    handleFilterChange(activeFilterCategory, activeFilters);
  };

  return (
    <Flex justify="space-between" paddingBottom="40px" mt={1} mb={5}>
      <Flex gap="2" justify="flex-start">
        <FilterDrawer title={"Genre"} handleSaved={handleSaved}>
          {genres.map((genre) => (
            <Button
              key={genre}
              variant={
                filtersArray.genre.includes(genre) ||
                activeFilters?.includes(genre)
                  ? "solid"
                  : "outline"
              }
              borderRadius="xl"
              justifyContent="flex-start"
              onClick={() => updateFilter("genre", genre)}
            >
              {genre}
            </Button>
          ))}
        </FilterDrawer>
        {/* <FilterDrawer title={"Style"} handleSaved={handleSaved}>
          {styles.map((style) => (
            <Button
              key={style}
              // variant={filtersArray.style.includes(style) || activeFilter.value === style ? "solid" : "outline"}
              variant={
                filtersArray.genre.includes(style) ||
                activeFilters.includes(style)
                  ? "solid"
                  : "outline"
              }
              borderRadius="xl"
              justifyContent="flex-start"
              onClick={() => updateFilter("style", style)}
            >
              {style}
            </Button>
          ))}
        </FilterDrawer> */}
        <FilterDrawer title={"Year"} handleSaved={handleSaved}>
          {years.map((year) => (
            <Button
              variant={
                filtersArray.genre.includes(year) ||
                activeFilters.includes(year)
                  ? "solid"
                  : "outline"
              }
              borderRadius="xl"
              justifyContent="flex-start"
              key={year}
              onClick={() => updateFilter("year", year)}
            >
              {year}
            </Button>
          ))}
        </FilterDrawer>
      </Flex>

      <FilterDrawer title={"Favourites"} triggerType={"icon"}>
        {favourites.length === 0 && (
          <Heading
            as="h3"
            size="sm"
            fontFamily="heading"
            fontWeight={400}
            color={"green.400"}
          >
            Looking pretty empty here...
          </Heading>
        )}
        {favourites.map((fav, index) => (
          <FavouritesCard
            key={index}
            albumSrc={fav.imageSrc}
            title={fav.title}
            artist={fav.artist}
            updateFavourites={updateFavourites}
            id={fav.id}
          />
        ))}
      </FilterDrawer>
    </Flex>
  );
};

export default Filters;
