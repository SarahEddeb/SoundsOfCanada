
# Sounds of Canada
## ***Please note this was a take-home interview assignment
App: https://sounds-of-canada.vercel.app/

Sounds of Canada is a music library web application that allows users to explore and discover albums released in Canada. Built with modern web technologies, the app integrates with the Discogs API to provide a comprehensive and dynamic library of music data, including album details and cover images. The app uses Chakra UI for styling and leverages OAuth authentication for secure access to the Discogs API.

![image](https://github.com/user-attachments/assets/a2679a9b-10be-4fcd-a620-65b6d23deb3d)

### Installation
1. Clone the repository:
```
git clone https://github.com/SarahEddeb/SoundsOfCanada.git
```
2. Install dependencies:
```
npm install
```
3. Authenticate through OAuth <br />
Follow here: https://www.discogs.com/developers#page:authentication,header:authentication-oauth-flow <br />
4. Create a .env file in the backend folder with the following variables and values obtained from OAuth:
```
DISCOGS_CONSUMER_KEY=your_discogs_consumer_key
DISCOGS_CONSUMER_SECRET=your_discogs_consumer_secret
DISCOGS_OAUTH_TOKEN=your_discogs_oauth_token
DISCOGS_OAUTH_TOKEN_SECRET=your_discogs_oauth_token_secret
```
5. Configure the environment:
Ensure Node.js (v18 or higher) and npm are installed.
Use your Discogs API credentials for the .env file.


### Running a Local Server
1. Open two terminal windows
2. Run the backend server
```
cd backend
node server.js
```
3. Run the frontend server 
```
cd sounds-of-canada-app
npm run dev
```

## Planned but Unimplemented: Batching Responses for Optimized Rendering
Goal: Optimize the rendering process by displaying only the new batch of AlbumCardList components when a new batch of data is received.
### Proposed Approach:
#### Paginated Fetching:
Implement a mechanism in page.js to fetch data in batches. Each batch corresponds to a page of results retrieved from the backend or API.

Pseudocode:
```
function fetchBatch(pageNumber) {
    const response = fetch(`API_URL?page=${pageNumber}`);
    const newBatch = response.data; // Assuming response contains data
    return newBatch;
}
```
#### State Management for Batches:
Maintain a state variable (e.g., albumBatches) to store the list of batches. New batches are appended to this state as they are fetched.

Pseudocode:
```
let albumBatches = []; // Array of batch data
function addNewBatch(newBatch) {
    albumBatches.push(newBatch);
    renderNewBatch(newBatch);
}
```
#### Rendering New Batches Only:
When a new batch is received, render only the corresponding AlbumCardList component without re-rendering previously displayed components.

Pseudocode:

```
function renderNewBatch(newBatch) {
    AlbumCardList.render({
        data: newBatch,
        updateArtistFilter,
        updateFavourites,
        favourites,
    });
}
```
#### Optimization with React.memo:
Wrap the AlbumCardList component with React.memo to prevent unnecessary re-renders when its props do not change.

Pseudocode:

```
const AlbumCardList = memo(({ data, updateArtistFilter, updateFavourites, favourites }) => {
...
});
```
#### Event to Fetch and Render Next Batch:
Trigger fetching the next batch when the user scrolls to the bottom of the page or clicks a "Load More" button.

Pseudocode:

```
function onScroll() {
    if (userHasScrolledToEnd) {
        const newBatch = fetchBatch(nextPageNumber);
        addNewBatch(newBatch);
    }
```
