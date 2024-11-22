"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import RepoList from "./components/RepoList";
import Pagination from "./components/Pagination";

type Repo = {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
};

const Home: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Helper to get the date 10 days ago
  const getLastTenDaysDate = (): string => {
    const date = new Date();
    date.setDate(date.getDate() - 10); // Subtract 10 days
    return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  const fetchRepos = async (pageNum: number) => {
    setLoading(true);
    setError(null); // Reset errors on fetch
    try {
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=created:%3E${getLastTenDaysDate()}&sort=stars&order=desc&page=${pageNum}`
      );
      const newRepos = response.data.items;

      setRepos((prevRepos) =>
        pageNum === 1 ? newRepos : [...prevRepos, ...newRepos]
      );

      setHasMore(newRepos.length > 0);
    } catch (error) {
      setError("Failed to fetch repositories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos(page);
  }, [page]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Header */}
      <header className="sticky top-0 bg-gray-100 z-10 shadow-md py-4">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Trending Repositories
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center">
        {error && <div className="text-center text-red-500 mt-4">{error}</div>}
        {repos.length > 0 ? (
          <RepoList repos={repos} />
        ) : (
          <div className="text-center text-gray-600">
            No repositories found.
          </div>
        )}
        {loading && <div className="text-center mt-4">Loading...</div>}
      </main>

      {/* Sticky Pagination Footer */}
      <footer className="sticky bottom-0 bg-gray-100 shadow-md py-4 w-full">
        <Pagination
          currentPage={page}
          hasMore={hasMore}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </footer>
    </div>
  );
};

export default Home;
