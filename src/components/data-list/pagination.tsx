interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange, ...rest }: PaginationProps) => {
  return (
    <div {...rest} className={`flex flex-row items-center justify-center ${rest.className}`}>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`${
          currentPage === 1 ? "cursor-not-allowed" : ""
        } flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-300 text-gray-500 hover:bg-gray-50`}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <div className="flex items-center justify-center mx-2">
        <span className="text-sm font-medium text-gray-700">{currentPage}</span>
        <span className="text-sm font-medium text-gray-300 mx-1">of</span>
        <span className="text-sm font-medium text-gray-700">{totalPages}</span>
      </div>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`${
          currentPage === totalPages ? "cursor-not-allowed" : ""
        } flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-300 text-gray-500 hover:bg-gray-50`}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}