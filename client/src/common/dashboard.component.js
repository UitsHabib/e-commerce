import Fullnavbar from "./navbar.component";

function Dashboard() {
    // async function loginHandler(values) {
    //     try {
    //         const res = await axios.get("http://localhost:3000/user", {
    //             email: values.email,
    //             password: values.password,
    //         });
    //         if (res.status === 200) {
    //             localStorage.setItem("access_token", res.data);
    //             setLogin({
    //                 ...login,
    //                 loggedInn: true,
    //             });
    //         }
    //     } catch (err) {
    //         setLogin({
    //             ...login,
    //             error: "Invalid credintials",
    //         });
    //     }
    // }

    return (
        <>
            <Fullnavbar />
        </>
    );
}

export default Dashboard;
