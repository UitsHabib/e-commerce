import TableHeader from "./table-header.component";
import TableBody from "./table-body.component";

function Table({ columns, items, sortColumn, sortOrder, onHandleSort }) {
  return (
    <table className="container table">
      <TableHeader
        columns={columns}
        sortColumn={sortColumn}
        sortOrder={sortOrder}
        onHandleSort={onHandleSort}
      />
      <TableBody columns={columns} items={items} />
    </table>
  );
}

export default Table;
