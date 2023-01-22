import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";

export const FavouritesPage = () => {
  const { favourites } = useAppSelector((state) => state.github);
  const dispatch = useActions();

  return (
    <div>
      {favourites.map((favourite) => (
        <p key={favourite}>
          {favourite}{" "}
          <button onClick={() => dispatch.removeFavourite(favourite)}>
            delete
          </button>
        </p>
      ))}
    </div>
  );
};
