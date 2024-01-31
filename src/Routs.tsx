import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import PostView from "./screens/dashboard-components/middlescreen/post/PostView";
import ItemDetails from "./screens/ItemDetails";
import UserProfile from "./screens/UserProfile";
import NewItem from "./screens/dashboard-components/NewItem";
// import MarketPlace from "./screens/MarketPlace";

const Routs = () => {
  return (
          <div className="w-full">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Dashboard />}>
                <Route index element={<PostView />} />
                <Route path="/itemdetails" element={<ItemDetails />} />
                <Route path="/profile" element={<UserProfile />} />
                {/* <Route path="/market" element={<MarketPlace />} /> */}
              </Route>
              <Route path="/new-item" element={<NewItem/>}/>
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
  );
};

export default Routs;
