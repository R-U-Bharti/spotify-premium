export default function ApiList() {
    const apis = {
        profileApi: 'https://api.spotify.com/v1/me',
        myPlaylistApi: `https://api.spotify.com/v1/me/playlists`,
        myTracksApi: (limit: 10, offset: 5) => `https://api.spotify.com/v1/me/tracks?limit=${limit}&offset=${offset}`,
    }
    return apis;
}