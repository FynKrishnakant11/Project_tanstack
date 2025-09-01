import AllPersonHook from "../hooks/AllPersonHook";
import { useState } from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import type { IPersonDetails } from "../types/IAllPersonTypes";
import type { PaginationState } from "@tanstack/react-table";

const columnHelper = createColumnHelper<IPersonDetails>();

const columns = [
  columnHelper.accessor((row) => `${row.firstname} ${row.lastname}`, {
    id: "name",
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("gender", {
    header: "Gender",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("image", {
    header: "Image",
    cell: (info) => {
      const ImgUrl = info.getValue();
      return <img src={ImgUrl} alt="Profile" />;
    },
  }),
];

const AllpersonTable = () => {
  //For controlled global & column filter
  // const [globalFilter, setGlobalFilter] = useState("");
  // const [columnFilters, setColumnFilters] = useState([{});
  const [sorting, setSorting] = useState<SortingState>([]);
  const { allPersonDetails, allPersonIsLoading, allPersonIsError } =
    AllPersonHook();
  const allPersonDetailsData = allPersonDetails?.data ?? [];
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 8,
  });
  const table = useReactTable({
    data: allPersonDetailsData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // onColumnFiltersChange: setColumnFilters,
    // onGlobalFilterChange: setGlobalFilter,
    state: {
      // globalFilter,
      // columnFilters,
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
  });
  return (
    <>
      <div className="main border border-white rounded-t-4xl mt-2">
        <div className="header flex flex-row gap-80 border border-white p-2  rounded-t-4xl">
          <input
            type="text"
            placeholder="    Search..."
            className="border-1 border-white rounded-2xl ml-2"
            value={table.getState().globalFilter ?? ""}
            onChange={(e) => {
              table.setGlobalFilter(String(e.target.value));
            }}
          />
          <h1 className="">Persons Dump</h1>
        </div>
        <div className="table mt-7 m-auto w-full">
          {allPersonIsLoading && <h1>Loading.........</h1>}
          <table className="m-auto w-[80%]">
            <thead>
              {table.getHeaderGroups().map((HeaderGroup) => (
                <tr key={HeaderGroup.id}>
                  {HeaderGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      // get togglesorting handler sorts the column
                      className="p-[10px] border-4 border-white rounded-t-4xl"
                      title={
                        header.column.getCanSort()
                          ? header.column.getNextSortingOrder() === "asc"
                            ? "Sort ascending"
                            : header.column.getNextSortingOrder() === "desc"
                            ? "Sort descending"
                            : "Clear sort"
                          : undefined
                        //  header.column.getCanSort()?header.column.getNextSortingOrder()==="asc"?"Sort Ascending":header.column.getNextSortingOrder()==="desc"?"Sort Descending":"clear Sort":undefined
                      }
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
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
                      {console.log("get can filter status :",header.column)}
                      {header.column.getCanFilter() && (
                        <input
                          value={
                            (header.column.getFilterValue() ?? "") as
                              | string
                              | number
                          }
                          onChange={(e) => {
                            header.column.setFilterValue(
                              e.target.value === "" ? undefined : e.target.value
                            );
                          }}
                          placeholder={`Search ${String(
                            header.column.columnDef.header
                          )}`}
                          className="mt-1 w-[90%] border px-1 py-[2px] text-sm rounded-lg"
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
                    <td key={cell.id} className="p-[10px] border ">
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
              {console.log("getstate of the table :",table.getState())}
              {console.log("pagination of the tabel :",table.getState().pagination)}
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
