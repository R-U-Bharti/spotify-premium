import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import ApiHeader from "@/lib/ApiHeader";
import ApiList from "@/lib/ApiList";
import AxiosInterceptors from "@/lib/AxiosInterceptor";
import useApi from "@/lib/useApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const MyTracks = () => {
    const { myTracksApi } = ApiList();

    const [tracks, setTracks] = useState<any>([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [moreLink, setMoreLink] = useState<string>("");

    const { loader, data } = useApi(myTracksApi(50, 50), "get");

    useEffect(() => {
        if (data) {
            setMoreLink(data?.next);
            setTracks(data?.items.map((item: any) => item.track));
        }
    }, [data]);

    const playTrack = (index: number) => {
        const track = tracks[index];
        if (track?.preview_url) {
            const audio = new Audio(track?.preview_url);
            audio.play();
            setIsPlaying(true);

            audio.onended = () => {
                if (index < tracks.length - 1) {
                    setCurrentTrackIndex(index + 1);
                    playTrack(index + 1);
                }
            };
        }
    };

    const handleClick = (index: number) => {
        setCurrentTrackIndex(index);
        playTrack(index);
    };

    const getList = () => {
        if (!moreLink || loading) return;

        setLoading(true);
        AxiosInterceptors.get(moreLink, ApiHeader())
            .then((res) => {
                console.log('moreLink: ', res)
                setMoreLink(res?.data?.next ?? "");
                // if(res?.data?.next){
                //     getList(res?.data?.next)
                // }
                setTracks((prevTracks) => [
                    ...prevTracks,
                    ...res?.data?.items.map((item: any) => item.track),
                ]);
            })
            .catch((err) =>
                toast.error(err?.response?.data?.error?.message ?? "Please try again later.")
            )
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 100 &&
                moreLink && !loading
            ) {
               getList();
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [moreLink, loading]);

    return (
        <>
            {loader && <Loader />}

            <div className="container p-4">
                <h1 className="text-xl font-bold">My Tracks</h1>
                <div className="space-y-4 mt-4">
                    {tracks?.map((track: any, index: any) => (
                        <div
                            key={track?.id}
                            className="flex items-center space-x-4 p-2 border-b cursor-pointer hover:bg-gray-100/30"
                            onClick={() => handleClick(index)}
                        >
                            <img
                                src={track?.album?.images[0]?.url}
                                alt={track?.album?.name}
                                className="w-16 h-16 object-cover"
                            />
                            <div className="flex-1">
                                <p className="font-semibold">{track?.name}</p>
                                <p className="text-sm text-gray-600">
                                    {track?.artists.map((artist) => artist?.name).join(", ")}
                                </p>
                            </div>
                            <button className="text-blue-500">
                                {isPlaying && currentTrackIndex === index ? "Playing" : "Play"}
                            </button>
                        </div>
                    ))}
                </div>
                {/* <Button onClick={() => getList(moreLink)}>More</Button> */}
                {loading && <Loader />}
            </div>
        </>
    );
};

export default MyTracks;