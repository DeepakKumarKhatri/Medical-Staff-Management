import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "contact", label: "Contact", minWidth: 100 },
  { id: "role", label: "Role", minWidth: 100 },
  { id: "actions", label: "Actions", minWidth: 100 },
];

function createData(name, contact, role) {
  return { name, contact, role };
}

const rows = [
  createData(
    { name: "John Doe", image: "path_to_image" },
    "john.doe@example.com",
    "Doctor"
  ),
  createData(
    { name: "Jane Smith", image: "path_to_image" },
    "jane.smith@example.com",
    "Clinic Manager"
  ),
  createData(
    { name: "Alice Johnson", image: "path_to_image" },
    "alice.johnson@example.com",
    "Patient"
  ),
];

export default function ManagerUsers({ comingFrom }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = (id) => {
    // Navigate to the edit page
    navigate(`/edit-user/${id}`);
    handleMenuClose();
  };

  const handleDelete = (id) => {
    // Handle delete logic here
    handleMenuClose();
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id === "name") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <div className="flex items-center">
                              <Avatar alt={value.name} src={value.image} />
                              <span className="ml-2">{value.name}</span>
                            </div>
                          </TableCell>
                        );
                      } else if (
                        column.id === "contact" ||
                        column.id === "role"
                      ) {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      } else if (column.id === "actions") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <IconButton onClick={handleMenuClick}>
                              <MoreVertical size={20} />
                            </IconButton>
                            <Menu
                              anchorEl={anchorEl}
                              open={Boolean(anchorEl)}
                              onClose={handleMenuClose}
                            >
                              <MenuItem onClick={() => handleEdit(index)}>
                                Edit
                              </MenuItem>
                              <MenuItem onClick={() => handleDelete(index)}>
                                Delete
                              </MenuItem>
                            </Menu>
                          </TableCell>
                        );
                      }
                      return null;
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
