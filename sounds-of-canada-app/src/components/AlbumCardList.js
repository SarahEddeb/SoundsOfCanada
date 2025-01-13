import { SimpleGrid } from "@chakra-ui/react";
import AlbumCard from "./AlbumCard";

/**
 * Renders a list of AlbumCard components within a responsive grid layout.
 *
 * @param {Object[]} data - Array of album data objects.
 * @param {Function} updateArtistFilter - Function to update the artist filter.
 * @param {Function} updateFavourites - Function to update the list of favourite albums.
 * @param {Object[]} favourites - Array of favourite album objects.
 *
 * @returns {JSX.Element} A grid of AlbumCard components.
 */
const AlbumCardList = ({
  data,
  updateArtistFilter,
  updateFavourites,
  favourites,
}) => (
  <SimpleGrid columns={[1, 2, 3]} gap={4}>
    {data.map((item, index) => {
      let title = ""
      let artist = ""
      let img = ""

      if (item.artist) {
        artist = item.artist
        title = item.title
        img = item.thumb
      } else {
        [artist, title] = item.title.split(" - ");
        img = item.cover_image
      }

      return (
        <AlbumCard
          key={index}
          {...item}
          imageSrc={img}
          title={title}
          artist={artist}
          updateArtistFilter={updateArtistFilter}
          updateFavourites={updateFavourites}
          isFav={favourites.some((album) => album.artist === item.artist)}
          favourites={favourites}
          id={item.id}
        />
      );
    })}
  </SimpleGrid>
);

export default AlbumCardList;
