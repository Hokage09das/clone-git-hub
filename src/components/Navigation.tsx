import { Link } from "react-router-dom";

import { useAppSelector } from "../hooks/redux";

export const Navigation = () => {
  const { favourites } = useAppSelector((state) => state.github);

  return (
    <nav className='flex justify-between items-center h-[50px] px-5 shadow-md bg-gray-500 text-white'>
      <h3>Github Search</h3>
      <span>
        <Link
          to='/'
          className='mr-2'
        >
          Home
        </Link>
        <Link to='/favourites'>Favourites:{favourites.length}</Link>
      </span>
    </nav>
  );
};
