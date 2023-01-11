import Homepage from "pages/Homepage";
import PostDetails from "pages/PostDetails";
import SearchPage from "pages/SearchPage";
import { NavLink, Route, Routes } from "react-router-dom";

export const App = () => {
    return (
        <div>
            <header>
                <nav>
                    <NavLink to='/' className='NavLink'>
                        Home
                    </NavLink>
                    <NavLink to='/search' className='NavLink'>
                        Search
                    </NavLink>
                </nav>
            </header>
            <div>
                <Routes>
                    <Route path='/' element={<Homepage />} />
                    <Route path='/search' element={<SearchPage />} />
                    <Route path='/posts/:postId/*' element={<PostDetails />} />
                </Routes>
            </div>
        </div>
    );
};
