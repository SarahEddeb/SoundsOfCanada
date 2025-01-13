import { Stack, IconButton, Button } from "@chakra-ui/react";
import {
  DrawerRoot,
  DrawerBackdrop,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerTitle,
  DrawerCloseTrigger,
  DrawerActionTrigger,
} from "@/components/ui/drawer";
import { LuHeart } from "react-icons/lu";

/**
 * FilterDrawer component renders a customizable drawer interface with a trigger button or icon.
 * 
 * @param {string} triggerType - Determines the type of trigger used to open the drawer, either "button" or "icon".
 * @param {string} title - The title displayed in the drawer header.
 * @param {ReactNode} children - The content to be displayed inside the drawer body.
 * @param {function} handleSaved - Callback function executed when the save or cancel actions are triggered.
 * 
 * @returns {JSX.Element} The rendered drawer component.
 */
const FilterDrawer = ({
  triggerType = "button",
  title,
  children,
  handleSaved,
}) => (
  <DrawerRoot>
    <DrawerBackdrop />
    <DrawerTrigger asChild>
      {triggerType === "icon" ? (
        <IconButton
          aria-label="Favourites"
          variant="surface"
          colorPalette="green"
          borderRadius="lg"
        >
          <LuHeart />
        </IconButton>
      ) : (
        <Button
          size="md"
          borderRadius="lg"
          colorScheme="accent"
          variant="surface"
          colorPalette="green"
        >
          {title}
        </Button>
      )}
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>{title}</DrawerTitle>
      </DrawerHeader>
      <DrawerBody>
        <Stack mb={4}>{children}</Stack>
      </DrawerBody>

      {triggerType === "button" ? (
        <>
          <DrawerFooter>
            <DrawerActionTrigger asChild>
              <Button
                variant="outline"
                borderRadius="xl"
                onClick={() => handleSaved(false)}
              >
                Cancel
              </Button>
            </DrawerActionTrigger>
            <DrawerActionTrigger asChild>
              <Button
                borderRadius="xl"
                colorPalette="green"
                variant="surface"
                onClick={() => handleSaved(true)}
              >
                Save
              </Button>
            </DrawerActionTrigger>
          </DrawerFooter>
          <DrawerCloseTrigger onClick={() => handleSaved(false)} />
        </>
      ) : (
        <DrawerCloseTrigger />
      )}
    </DrawerContent>
  </DrawerRoot>
);

export default FilterDrawer;
