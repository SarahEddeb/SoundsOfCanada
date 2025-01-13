# Sounds of Canada - Backend API

This is the backend API for the Sounds of Canada web application, designed to interact with the Discogs API to fetch data about albums, artists, and releases.

## Web Service URL

The API is hosted on Render and can be accessed at:

[https://soundsofcanada.onrender.com/](https://soundsofcanada.onrender.com/)

## API Endpoints

The following are the available API calls you can make to interact with the backend:

### 1. Get Albums

**URL**: `/albums`

**Method**: `GET`

**Query Parameters**:
- **`genre`**: Filter albums by genre (e.g., `Electronic`).
- **`year`**: Filter albums by year (default is `2024`).
- **`page`**: Specify which page of results to return (default is `1`).

**Example Request**:
GET https://soundsofcanada.onrender.com/albums?genre=Electronic&year=2024&page=1

**Response**:
Returns a JSON object with the list of albums matching the search criteria.

### 2. Get Release Information by ID

**URL**: `/releases/:id`

**Method**: `GET`

**URL Parameters**:
- **`id`**: The Discogs release ID to fetch details for.

**Example Request**:
GET https://soundsofcanada.onrender.com/releases/123456

**Response**:
Returns a JSON object with the details of the release corresponding to the provided ID.

### 3. Get Artist Information by ID

**URL**: `/artists/:id`

**Method**: `GET`

**URL Parameters**:
- **`id`**: The Discogs artist ID to fetch details for.

**Example Request**:
GET https://soundsofcanada.onrender.com/artists/7890
**Response**:
Returns a JSON object with the details of the artist corresponding to the provided ID.

### 4. Get Artist's Releases

**URL**: `/artists/:id/releases`

**Method**: `GET`

**URL Parameters**:
- **`id`**: The Discogs artist ID to fetch releases for.

**Example Request**:
GET https://soundsofcanada.onrender.com/artists/7890/releases
**Response**:
Returns a JSON object with the artist's releases sorted by year in descending order.

### 5. Get Albums by Artist's Release ID

**URL**: `/:id/artists/albums`

**Method**: `GET`

**URL Parameters**:
- **`id`**: The release ID to fetch albums for.

**Example Request**:
GET https://soundsofcanada.onrender.com/123456/artists/albums
**Response**:
Returns a JSON object with albums from the artist associated with the provided release ID.

