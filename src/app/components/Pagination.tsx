import React from "react";

interface PaginationProps {
  currentPage: number;
  hasMore: boolean;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  hasMore,
  onPageChange,
}) => {
  const onPageChangeHandler = (page: number) => {
    onPageChange(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={() => onPageChangeHandler(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-300 rounded-md mx-2 disabled:opacity-50"
      >
        Previous
      </button>
      <span className="mx-4 text-gray-700">{`Page ${currentPage}`}</span>
      <button
        onClick={() => onPageChangeHandler(currentPage + 1)}
        disabled={!hasMore}
        className="px-4 py-2 bg-gray-300 rounded-md mx-2 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
