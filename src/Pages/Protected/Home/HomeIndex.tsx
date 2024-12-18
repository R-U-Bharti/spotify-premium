import ApiList from "@/lib/ApiList"
import useApi from "@/lib/useApi"

const HomeIndex = () => {

    const { profileApi } = ApiList()

    let profile = useApi(profileApi, 'get')

    return (
        <>
            {profile?.loader && <span>Loading...</span>}
            {!profile?.loader && profile?.data && <span>{JSON.stringify(profile?.data)}</span>}
        </>
    )
}

export default HomeIndex