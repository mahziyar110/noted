import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { supabase } from "../services/supabaseClient";

const Navbar = () => {
  const user = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <nav className="width-full h-16 bg-gray-800 text-white p-6 flex justify-between items-center sticky top-0 z-10 shadow-md">
      <Link className="font-bold text-2xl" to="/">
        📝 Noted.
      </Link>
      {user ? (
        <button className="cursor-pointer" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
