import React from "react";
import RepoItem from "./RepoItem";

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

interface RepoListProps {
  repos: Repo[];
}

const RepoList: React.FC<RepoListProps> = ({ repos }) => {
  return (
    <main className="max-w-6xl mx-auto p-4">
      <section aria-labelledby="repository-list">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {repos.map((repo) => (
            <li key={repo.id} className="h-full">
              <RepoItem repo={repo} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default RepoList;
