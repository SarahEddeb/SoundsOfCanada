import { Card, HStack, Stack, Text, IconButton } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { LuHeartCrack } from "react-icons/lu";

/**
 * FavouritesCard component renders a card displaying album information with an option to update favourites.
 *
 * @param {string} albumSrc - The source URL for the album's image.
 * @param {string} title - The title of the album.
 * @param {string} artist - The artist of the album.
 * @param {function} updateFavourites - Callback function to update the favourites list.
 * @param {string} id - Unique identifier for the album.
 *
 * @returns {JSX.Element} A card component with album details and a button to update favourites.
 */
const FavouritesCard = ({
  albumSrc,
  title,
  artist,
  updateFavourites,
  id
}) => {
  const update = (albumSrc, title, artist, id) => {
    updateFavourites(albumSrc, title, artist, id );
  };
  
  return (
    <Card.Root width="100%" size="sm" borderRadius="xl">
      <Card.Body>
        <HStack justify="space-between">
          <HStack gap="3">
            <Avatar src={albumSrc} name={title} shape="rounded" />
            <Stack gap="0">
              <Text fontWeight="semibold" textStyle="sm">
                {title}
              </Text>
              <Text color="fg.muted" textStyle="sm">
                {artist}
              </Text>
            </Stack>
          </HStack>
          <IconButton
            aria-label="Favourites"
            variant="surface"
            colorPalette="red"
            borderRadius="lg"
            size="sm"
            onClick={() => update({ albumSrc, title, artist, id })}
          >
            <LuHeartCrack />
          </IconButton>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
};

export default FavouritesCard;
