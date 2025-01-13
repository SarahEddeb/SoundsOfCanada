"use client";

import { useEffect, useState } from "react";
import { Card, Image, Button, HStack, Stack, Text } from "@chakra-ui/react";
import { LuHeart, LuHeartCrack } from "react-icons/lu";

/**
 * AlbumCard is a React component that displays an album's information
 * including its image, title, and artist. It allows users to toggle
 * the album as a favorite and filter albums by artist.
 *
 * @param {string} imageSrc - The source URL of the album's image.
 * @param {string} title - The title of the album.
 * @param {string} artist - The name of the artist.
 * @param {function} updateArtistFilter - Function to update the artist filter.
 * @param {function} updateFavourites - Function to update the list of favorite albums.
 * @param {boolean} isFav - Indicates if the album is initially marked as a favorite.
 * @param {Array} favourites - List of favorite albums.
 * @param {string} id - Unique identifier for the album.
 */
const AlbumCard = ({
  imageSrc,
  title,
  artist,
  updateArtistFilter,
  updateFavourites,
  isFav,
  favourites,
  id
}) => {
  const [isFavourited, setIsFavourited] = useState(isFav);

  const handleFavoriteToggle = () => {
    setIsFavourited(!isFavourited);
    updateFavourites({ imageSrc, title, artist, id });
  };

  useEffect(() => {
    setIsFavourited(favourites.some((album) => album.id === id));
  }, [id, favourites]);

  return (
    <Card.Root
      size="sm"
      borderRadius="xl"
      align="center"
      justifyContent="center"
    >
      <Card.Body>
        <HStack gap={5}>
          <Image src={imageSrc} alt={title} borderRadius="lg" boxSize="90px" />
          <Stack gap={4}>
            <Stack gap="0">
              <Text
                fontWeight="semibold"
                textStyle="md"
                maxWidth="100%"
                isTruncated
                wordBreak="break-all"
              >
                {title}
              </Text>
              <Button
                variant="plain"
                p={0}
                display="inline-flex"
                onClick={() => updateArtistFilter("artist", [{artist, id}])}
                maxWidth="100%"
                justifyContent="flex-start"
                style={{
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                  textAlign: "left",
                }}
              >
                <Text
                  color="green.400"
                  textStyle="sm"
                  maxWidth="100%"
                  isTruncated
                  wordBreak="break-all"
                  style={{
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    textAlign: "left",
                  }}
                >
                  {artist}
                </Text>
              </Button>
            </Stack>
            <Card.Footer p={0}>
              <Button
                variant="surface"
                colorPalette={isFavourited ? "red" : "green"}
                borderRadius="lg"
                size="xs"
                onClick={handleFavoriteToggle}
              >
                {isFavourited ? (
                  <>
                    <LuHeartCrack /> Remove
                  </>
                ) : (
                  <>
                    <LuHeart /> Add
                  </>
                )}
              </Button>
            </Card.Footer>
          </Stack>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
};

export default AlbumCard;
