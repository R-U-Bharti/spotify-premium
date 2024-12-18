export default function ApiHeader() {
    let token = localStorage.getItem("token");
    const header = {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    };
    return header;
}