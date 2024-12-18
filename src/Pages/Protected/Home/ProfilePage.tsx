import Loader from "@/components/Loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ApiList from "@/lib/ApiList";
import useApi from "@/lib/useApi";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {

    const navigate = useNavigate();

    const { profileApi } = ApiList();
    const { loader, data } = useApi(profileApi, "get");

    const logoutFun = () => {
        localStorage.clear();
        navigate('/')
    }

    return (
       <>
       {loader && <Loader />}

            <div className="flex justify-center items-center min-h-screen bg-muted">
                <Card className="w-full max-w-md bg-white dark:bg-black shadow-md rounded-lg">
                    <CardHeader className="flex flex-col items-center space-y-2">
                        {/* Profile Avatar */}
                        <Avatar className="h-24 w-24">
                            <AvatarImage
                                src={data?.images?.[0]?.url || "https://via.placeholder.com/150"}
                                alt={data?.display_name || "User"}
                            />
                            <AvatarFallback>
                                {data?.display_name
                                    ?.split(" ")
                                    .map((n) => n[0])
                                    .join("") || "N/A"}
                            </AvatarFallback>
                        </Avatar>
                        {/* User Info */}
                        <CardTitle className="text-xl font-semibold">
                            {data?.display_name || "User Name"}
                        </CardTitle>
                        <p className="text-gray-500 text-sm">
                            {data?.email || "No Email Available"}
                        </p>
                    </CardHeader>
                    <CardContent>
                        {/* Additional Information */}
                        <div className="space-y-4 text-center">
                            <p className="text-gray-700 text-sm">
                                <span className="font-semibold">Country:</span> {data?.country || "Unknown"}
                            </p>
                            <p className="text-gray-700 text-sm">
                                <span className="font-semibold">Followers:</span> {data?.followers?.total || 0}
                            </p>
                            <p className="text-gray-700 text-sm">
                                <span className="font-semibold">Account Type:</span> {data?.product || "Unknown"}
                            </p>
                            <p className="text-gray-700 text-sm">
                                <span className="font-semibold">Spotify Profile:</span>{" "}
                                <a
                                    href={data?.external_urls?.spotify}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline"
                                >
                                    View Profile
                                </a>
                            </p>
                        </div>
                        {/* Actions */}
                        <div className="flex justify-center mt-6">
                            <Button onClick={() => logoutFun()} variant="destructive" className="w-32">
                                Logout
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
       </>
    );
};

export default ProfilePage;