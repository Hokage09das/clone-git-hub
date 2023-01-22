import React, { useState, useEffect } from "react";
import { RepoCard } from "../components/RepoCard";
import { useDebounce } from "../hooks/debounce";
import { IRepo } from "../models/models";
import { githupApi } from "../store/github/github.api";

export const HomePage = () => {
  const [search, setSearch] = useState("");
  const [dropDown, setDropDown] = useState(false);

  const debounced = useDebounce(search);

  const {
    data: users,
    isError,
    isLoading,
  } = githupApi.useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });
  const [fetchRepos, { data: repos, isLoading: isReposLoading }] =
    githupApi.useLazyGetUserReposQuery();

  useEffect(() => {
    setDropDown(debounced.length > 3 && users?.length! > 0);
  }, [debounced, users]);

  const clickHandler = (username: string) => {
    fetchRepos(username);
    setDropDown(false);
  };

  return (
    <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
      {isError && (
        <p className='text-center text-red-600'>Something went wrong</p>
      )}
      <div className='relative w-[560px]'>
        <input
          type='text'
          className='border py-2 px-4 w-full h-[42px] mb-2'
          placeholder='search for github username...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {dropDown && (
          <ul className='list-none absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white overflow-y-scroll'>
            {isLoading && <p className='text-center'>Loading...</p>}
            {users?.map((user) => (
              <li
                key={user.id}
                onClick={() => clickHandler(user.login)}
                className='py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer'
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}
        <div className='container'>
          {isReposLoading && <p className='text-center'>Repo are looding...</p>}
          {repos?.map((repo: IRepo) => (
            <RepoCard
              key={repo.id}
              repo={repo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
