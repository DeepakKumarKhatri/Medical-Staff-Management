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
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import {
  deleteDoctor,
  deleteClinicManager,
  deletePatient,
} from "../../screens/ManageUsers/manageUsersSlice";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "contact", label: "Contact", minWidth: 100 },
  { id: "role", label: "Role", minWidth: 100 },
  { id: "actions", label: "Actions", minWidth: 100 },
];

export default function ManagerUsers({ comingFrom, data }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [rows, setRows] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    decideFetch();
  }, [comingFrom, data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleMenuClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleEdit = (id) => {
    navigate(`/edit-user/${id}`);
    handleMenuClose();
  };

  const handleDelete = (id) => {
    switch (comingFrom) {
      case "clinic_manager":
        dispatch(deleteClinicManager(id)).then(() => {
          setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        });
        break;
      case "doctor":
        dispatch(deleteDoctor(id)).then(() => {
          setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        });
        break;
      case "patient":
        dispatch(deletePatient(id)).then(() => {
          setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        });
        break;
      default:
        break;
    }
    handleMenuClose();
  };

  const decideFetch = () => {
    let fetchedRows = [];
    switch (comingFrom) {
      case "clinic_manager":
        fetchedRows = data?.clinicManagers?.map((manager) => ({
          name: {
            name: `${manager.firstName} ${manager.lastName}`,
            image: manager.avatar,
          },
          contact: manager.userId,
          role: "Clinic Manager",
          id: manager._id,
        })) || [];
        break;
      case "doctor":
        fetchedRows = data?.doctors?.map((doctor) => ({
          name: {
            name: `${doctor.firstName} ${doctor.lastName}`,
            image: doctor.avatar,
          },
          contact: doctor.userId,
          role: "Doctor",
          id: doctor._id,
        })) || [];
        break;
      case "patient":
        fetchedRows = data?.patients?.map((patient) => ({
          name: {
            name: `${patient.firstName} ${patient.lastName}`,
            image: patient.avatar,
          },
          contact: patient.userId,
          role: "Patient",
          id: patient._id,
        })) || [];
        break;
      default:
        break;
    }
    setRows(fetchedRows);
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
            {rows?.length > 0 ? (
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
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
                            <IconButton
                              onClick={(event) => handleMenuClick(event, row)}
                            >
                              <MoreVertical size={20} />
                            </IconButton>
                            <Menu
                              anchorEl={anchorEl}
                              open={Boolean(anchorEl && selectedRow === row)}
                              onClose={handleMenuClose}
                            >
                              {/* <MenuItem onClick={() => handleEdit(row.id)}>
                                Edit
                              </MenuItem> */}
                              <MenuItem onClick={() => handleDelete(row.id)}>
                                Delete
                              </MenuItem>
                            </Menu>
                          </TableCell>
                        );
                      }
                      return null;
                    })}
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <Box py={3}>
                    <Typography variant="h6" color="textSecondary">
                      No data is available at this moment.
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {rows?.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
}
