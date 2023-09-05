import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React from "react";
import Loader from "../../components/Loader/Loader";
import { useAxios } from "../../hooks/useAxios";

//img
import iconEdit from "../../assets/ActionIcon/edit.svg";
import iconView from "../../assets/ActionIcon/view.svg";

import { useNavigate } from "react-router-dom";
import Sort from "../Guides/components/sort";
import CreateForm from "../Guides/components/CreateForm";
import UpdateForm from "../Guides/components/UpdateForm";
import CustomButton from "../../components/CustomButton/CustomButton";
const SelectStyle = {
  width: 200,
  borderRadius: "30px",
  color: "#092C4C",
  fontSize: "16px",
  fontWeight: 500,
  background: "#fff",
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#514EF3",
  },
};

const Notification = () => {
  const navigate = useNavigate();
  const [showGuide, setShowGuide] = React.useState({ isOpen: false });

  const [filter, setFilter] = React.useState('all');
  const [row, setRow] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const { data, loading, refetch } = useAxios({
    url: `/user-guides?page[offset]=${page}&page[limit]=${row}${filter === "all" ? "" : "&"+filter}`,
    method: "get",
  });
  console.log(data);
  async function showData(id) {
    const { data } = await axios.get(`/guides/${id}`);
    setShowGuide({ isOpen: true, ...data });
  }

  if (loading) return <Loader />;
  return (
    <>
      <CreateForm refetch={refetch} />
      <UpdateForm
        showGuide={showGuide}
        setShowGuide={setShowGuide}
        refetch={refetch}
      />
      <div className="flex items-center justify-between mt-1">
        <strong className="font-bold text-base text-primary">
          Total: {data.pageInfo?.total} guide
        </strong>
        <div className="flex items-center mb-2">
          <FormControl sx={{ minWidth: 120 }} size="small">
            <p className="ml-4 font-semibold text-primary">Filter</p>
            <Select
              sx={SelectStyle}
              value={filter}
              onChange={(event) =>
                setFilter(event.target.value)
              }
            >
              <MenuItem value={"all"}>All</MenuItem>
              <MenuItem value={"true"}>Completed</MenuItem>
              <MenuItem value={"false"}>Not Completed</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
                align="left"
              >
                #ID
              </TableCell>
              <TableCell
                sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
                align="center"
              >
                Title
              </TableCell>
              <TableCell
                sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
                align="center"
              >
                Content
              </TableCell>
              <TableCell
                sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
                align="center"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data?.map((item, index) => (
              <TableRow
                key={item._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}  
              >
                <TableCell
                  sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#092C4C",
                    paddingY: 0.7,
                  }}
                  align="left"
                >
                  {index + 1}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#092C4C",
                    paddingY: 0.7,
                  }}
                  align="center"
                >
                  {item.guide.title}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#092C4C",
                    paddingY: 0.7,
                  }}
                  align="center"
                >
                  {item.guide.content.slice(0, 50)}
                  {item.guide.content.length < 50 ? "" : "..."}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#092C4C",
                    paddingY: 0.7,
                  }}
                  align="center"
                >
                  <CustomButton/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div align="center" className="flex justify-center items-center py-2">
        <Stack spacing={2}>
          <Pagination
            onChange={(_, page) => setPage(page)}
            count={data.pageInfo && Math.ceil(data.pageInfo?.total / row)}
            variant="outlined"
            shape="rounded"
            page={page}
          />
        </Stack>
        <FormControl sx={{ width: "80px" }}>
          <InputLabel size="small" id="demo-simple-select-label">
            Row
          </InputLabel>
          <Select
            size="small"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={row}
            label="Row"
            onChange={(e) => setRow(e.target.value)}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </FormControl>
      </div>
    </>
  );
};

export default Notification;
