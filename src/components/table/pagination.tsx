import Icon from "components/icon";
import { useEffect, useState } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [inputPage, setInputPage] = useState<string>(String(currentPage));

  useEffect(() => {
    setInputPage(String(currentPage));
  }, [currentPage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputPage(e.target.value);
  };

  const handleGoToPage = (): void => {
    const page = parseInt(inputPage, 10);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      onPageChange(page);
    } else {
      setInputPage(String(currentPage));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleGoToPage();
    }
  };

  const handlePreviousPage = (e: React.MouseEvent): void => {
    e.preventDefault();
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = (e: React.MouseEvent): void => {
    e.preventDefault();
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageButtonClick = (e: React.MouseEvent, page: number): void => {
    e.preventDefault();
    onPageChange(page);
  };

  const generatePageButtons = (): React.ReactNode => {
    const buttons: React.ReactNode[] = [];
    const maxButtons = 7;
    const halfMaxButtons = Math.floor(maxButtons / 2);
    let start = Math.max(1, currentPage - halfMaxButtons);
    const end = Math.min(start + maxButtons - 1, totalPages);

    if (end - start < maxButtons - 1) {
      start = Math.max(1, end - maxButtons + 1);
    }

    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          key={i}
          type="button"
          className={`${
            i === currentPage
              ? "text-white bg-primary-600"
              : "text-text-primary hover:bg-greyScale-90"
          } rounded-full w-7 h-7 inline-flex justify-center items-center text-xs font-medium cursor-pointer transition-colors`}
          onClick={(e) => handlePageButtonClick(e, i)}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center gap-3">
      {/* Page buttons */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={handlePreviousPage}
          disabled={currentPage <= 1}
          className="w-7 h-7 inline-flex justify-center items-center text-text-primary hover:bg-greyScale-90 rounded-full cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <Icon name="arrow-left" size={14} />
        </button>

        {generatePageButtons()}

        <button
          type="button"
          onClick={handleNextPage}
          disabled={currentPage >= totalPages}
          className="w-7 h-7 inline-flex justify-center items-center text-text-primary hover:bg-greyScale-90 rounded-full cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <Icon name="arrow-right" size={14} />
        </button>
      </div>

      {/* Go to page */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-text-tertiary whitespace-nowrap">
          Go to page
        </span>
        <input
          type="text"
          value={inputPage}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleGoToPage}
          className="w-10 h-7 rounded-lg border border-border px-2 text-xs text-text-primary text-center focus:outline-none focus:border-primary-500"
        />
      </div>
    </div>
  );
};

export default Pagination;
