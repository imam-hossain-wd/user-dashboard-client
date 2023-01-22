import { createBrowserRouter } from "react-router-dom";
import AddUser from "../components/Dashboard/AddUser";
import Profile from "../components/Dashboard/Profile";
import ShowUser from "../components/Dashboard/ShowUser";
import Layout from "../Layout/Layout";

export const router = createBrowserRouter([
    
    { 
        path: "/", element: <Layout />,
        children: [
            {
                path:'/', element: <Profile/>
            },
            {
                path:'/adduser', element: <AddUser/>
            },
            {
                path:'/showuser', element: <ShowUser/>
            },
            {
                path:'/profile', element: <Profile/>
            },
        ]
    
    
    }

]);
