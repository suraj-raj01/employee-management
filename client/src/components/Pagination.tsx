type PaginationProps = {
  page: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, total, limit, onPageChange }: PaginationProps) => {
  if (!total || !limit) return null;

  const totalPages = Math.ceil(total / limit);

  // if (!Number.isFinite(totalPages) || totalPages <= 1) return null;

  return (
    <div className="flex justify-end items-center gap-2 mt-4">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>

      {/* */}

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};


export default Pagination;
