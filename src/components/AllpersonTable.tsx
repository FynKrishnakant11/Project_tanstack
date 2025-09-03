import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
  getSortedRowModel,
  ColumnDef,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { IPersonDetails } from "../types/IAllPersonTypes";
import useAllPerson from "../services/hooks/useAllPerson";
import type { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
const columns: ColumnDef<IPersonDetails>[] = [
  {
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: (info) => {
      return (
        <span className="flex justify-center">{info.getValue() as string}</span>
      );
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: (info) => {
      return (
        <span className="flex justify-center w-44">
          <img
            className=""
            src={info.getValue() as string}
            alt="Profile"
            width={50}
            height={50}
          />
        </span>
      );
    },
    enableColumnFilter: false,
    enableSorting: false,
  },
];

const AllpersonTable = () => {
  const { allPersonDetails, allPersonIsLoading, allPersonIsError } =
    useAllPerson();
    const [pagination,setPagination] = useState<PaginationState>({
      pageIndex:0,
      pageSize:5,
    });
  const allPersonDetailsData = allPersonDetails?.data?.users ?? [];

  const table = useReactTable({
    data: allPersonDetailsData,
    columns,
    state:{
      pagination,
    },
    onPaginationChange:setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel:getPaginationRowModel(),
  });
  return (
    <>
      <div className="main border border-white rounded-t-4xl w-[80%] m-auto mt-2">
        <div className="header flex flex-row gap-52 border border-white p-2  rounded-t-4xl">
          <input
            type="text"
            placeholder={"    Search..."}
            className="border-1 border-white rounded-2xl ml-2"
            value={table.getState().globalFilter ?? ""}
            onChange={(e) => {
              table.setGlobalFilter(e.target.value);
            }}
          />
          <h1 >Persons Dump</h1>
        </div>
        <div className="mt-7 m-auto w-full">
          {allPersonIsLoading && <h1>Loading.........</h1>}
          <table className="m-auto w-[80%]">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="p-[10px] border-4 border-white "
                      title={
                        header.column.getCanSort()
                          ? header.column.getNextSortingOrder() === "asc"
                            ? "Sort ascending"
                            : header.column.getNextSortingOrder() === "desc"
                            ? "Sort descending"
                            : "Clear sort"
                          : undefined
                      }
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && (
                        <button
                          className="ml-2 size-"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                            false: <span className="text-xs">---</span>,
                          }[header.column.getIsSorted() as string] ?? null}
                        </button>
                      )}
                      {header.column.getCanFilter() && (
                        <input
                          value={header.column.getFilterValue() as string}
                          onChange={(e) => {
                            header.column.setFilterValue(e.target.value);
                          }}
                          placeholder={`Search ${String(
                            header.column.columnDef.header
                          )}`}
                          className="mt-1  border px-1 py-[2px] text-sm rounded-lg"
                        />
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-[10px] border">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pageButtons flex gap-1 pt-2 ">
            <button
              className="border rounded p-1"
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<<"}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
            >
              {">>"}
            </button>
          </div>

          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount().toLocaleString()}
            </strong>
          </span>
        </div>
      </div>
      <div className="">{allPersonIsError && <h2>Some Error Occured!</h2>}</div>
    </>
  );
};
export default AllpersonTable;
