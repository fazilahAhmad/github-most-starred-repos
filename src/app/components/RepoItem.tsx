import React from "react";

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

interface RepoItemProps {
  repo: Repo;
}

const RepoItem: React.FC<RepoItemProps> = ({ repo }) => {
  const { name, description, stargazers_count, owner } = repo;
  const { login, avatar_url } = owner;

  return (
    <article className="flex flex-col p-4 bg-white rounded-lg shadow-md h-full">
      {/* Repo Header: Name and Owner */}
      <header className="flex items-center mb-4">
        <h2 className="text-lg font-semibold">{name}</h2>
      </header>

      {/* Repo Description */}
      <section className="flex-1">
        <p className="text-gray-700 text-sm">
          {description || "No description available"}
        </p>
      </section>

      {/* Repo Stats */}
      <footer className="mt-4 flex justify-between items-center">
        <div className="flex items-center">
          <img
            className="w-8 h-8 rounded-full mr-4"
            src={avatar_url}
            alt={`Avatar of ${login}`}
          />
          <p className="text-sm text-gray-500">{login}</p>
        </div>
        <span className="text-sm text-gray-500">
          ⭐ {stargazers_count} stars
        </span>
      </footer>
    </article>
  );
};

export default RepoItem;
