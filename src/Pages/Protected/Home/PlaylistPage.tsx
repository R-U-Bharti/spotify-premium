import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import ApiList from "@/lib/ApiList";
import useApi from "@/lib/useApi";

// interface PlaylistProps {
//     id: string;
//     name: string;
//     description: string;
//     external_urls: {
//         spotify: string;
//     };
//     images: {
//         url: string;
//     }[];
//     owner: {
//         display_name: string;
//     };
// }

const PlaylistPage = () => {
    
    const {myPlaylistApi} = ApiList()
    const {loader, data} = useApi(myPlaylistApi, 'get')

    console.log('data', data)

    return (
        <>
        {loader && <Loader />}

            <div className="container mx-auto p-4">
                <h1 className="text-4xl font-semibold mb-8">My Playlists</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data?.items?.map((playlist:any) => (
                        <Card key={playlist.id} className="max-w-sm bg-white dark:bg-black shadow-lg rounded-lg overflow-hidden">
                            <CardHeader>
                                <img src={playlist.images[0].url} alt={playlist.name} className="w-full h-48 object-cover rounded-md" />
                            </CardHeader>
                            <CardContent>
                                <h2 className="text-xl font-semibold">{playlist.name}</h2>
                                <p className="text-gray-500 text-sm mt-2">{playlist.description || 'No description available'}</p>
                            </CardContent>
                            <CardFooter className="flex justify-between items-center mt-4">
                                <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline" className="text-blue-500 hover:bg-blue-100/30">
                                        Listen on Spotify
                                    </Button>
                                </a>
                                <span className="text-gray-600 text-sm">{playlist.owner.display_name}</span>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
};

export default PlaylistPage;