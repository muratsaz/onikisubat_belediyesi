import type { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
}

const Table = ({ children }: TableProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          {children}

        </table>

      </div>

    </div>
  );
};

export default Table;