import React from "react";

import { useActions } from "../hooks/actions";

import { IRepo } from "../models/models";

export const RepoCard = ({ repo }: { repo: IRepo }) => {
  const dispatch = useActions();
  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch.addFavourite(repo.full_name);
  };
  const removeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch.removeFavourite(repo.full_name);
  };
  return (
    <div className='border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all'>
      <a
        href={repo.html_url}
        target='_blank'
        rel='noreferrer'
      >
        <h2 className='text-lg font-bold'>{repo.full_name}</h2>
        <p className='text-sm'>
          Fork:<span className='font-bold mr-2'>{repo.forks}</span>
          Watchers:<span className='font-bold'>{repo.watchers}</span>
        </p>

        <p className='tx-sm font-thin'>{repo?.description}</p>
      </a>{" "}
      <button onClick={clickHandler}>Favourite</button>
      <button onClick={removeHandler}>Delete</button>
    </div>
  );
};
