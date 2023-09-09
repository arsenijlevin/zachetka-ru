import { Box, Breadcrumbs, Button, Typography } from "@mui/material";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";

const subject = "Технологии программирования (6 семестр)";
const group = "Группа 1";

const names = [
  "Головина М. А.",
  "Петров А. Е.",
  "Гусева И. М.",
  "Петровская А. М.",
  "Панова В. М.",
  "Жукова А. А.",
  "Александрова В. К.",
  "Калинин И. И.",
  "Андреева Е. Д.",
  "Спиридонова А. А.",
  "Еремина О. И.",
  "Иванова С. С.",
  "Ситникова В. М.",
  "Баранов С. Т.",
  "Чернышева В. В.",
  "Антонов М. Ю.",
  "Белов А. М.",
  "Осипов М. А.",
  "Маркин Б. М.",
  "Филиппова К. А.",
  "Носкова В. К.",
  "Усов А. С.",
  "Афанасьев Д. Т.",
  "Васильева В. Г.",
  "Козлова В. С.",
];
const rows: GridRowsProp = names.map((name, index) => {
  const id = index;
  const col1 = name;
  const col2 = Math.floor(Math.random() * 30) + 20;
  const col3 = Math.floor(Math.random() * 30) + 20;
  const col4 = Math.floor(Math.random() * 30) + 20;
  const col5 = Math.floor((col2 + col3 + col4) / 3);
  const col6 = Math.floor(Math.random() * 25) + 25;
  const col7 = Math.floor(col6 + col5);
  // eslint-disable-next-line no-nested-ternary
  let col8 = "";
  if (col7 < 50) {
    col8 = "Неудовлетворительно";
  } else if (col7 >= 90) {
    col8 = "Отлично";
  } else if (col7 >= 75) {
    col8 = "Хорошо";
  } else if (col7 >= 50) {
    col8 = "Удовлетворительно";
  } else {
    col8 = "";
  }

  return {
    id,
    col1,
    col2,
    col3,
    col4,
    col5,
    col6,
    col7,
    col8,
  };
});

// const rows: GridRowsProp = [
//   { id: 1, col1: 'Иванов А. А.', col2: 25, col3: 25, col4: 25, col5: 25, col6: 25, col7: 50, col8: 'Удовлетворительно' },
//   { id: 2, col1: 'Сидоров П. С.', col2: 50, col3: 50, col4: 50, col5: 50, col6: 50, col7: 100, col8: 'Отлично' },
//   { id: 3, col1: 'Тереньтев Г. Г.', col2: 40, col3: 40, col4: 40, col5: 40, col6: 40, col7: 80, col8: 'Хорошо' },
//   { id: 4, col1: 'Адреев Б. Б.', col2: 45, col3: 45, col4: 45, col5: 45, col6: 45, col7: 90, col8: 'Отлично' },
// ];

let columns: GridColDef[] = [
  { field: "col1", headerName: "ФИО студента", flex: 0.2, width: 200 },
  { field: "col2", headerName: "КТ1", width: 150, flex: 0.1, editable: true },
  { field: "col3", headerName: "КТ2", width: 150, flex: 0.1, editable: true },
  { field: "col4", headerName: "КТ3", width: 150, flex: 0.1, editable: true },
  { field: "col5", headerName: "КТ сред.", flex: 0.1, width: 150 },
  {
    field: "col6",
    headerName: "Экзамен",
    flex: 0.1,
    width: 150,
    editable: true,
  },
  { field: "col7", headerName: "Итоговый балл", flex: 0.2, width: 150 },
  { field: "col8", headerName: "Итог", flex: 0.2, width: 100 },
];

columns = columns.map((column) => ({
  disableColumnMenu: true,
  sortable: false,
  ...column,
}));

export default function GradesTable() {
  return (
    <Box width={"90%"} marginX={"auto"} display={"flex"} flexDirection={"column"} gap={2}>
      <Box>
        <Typography variant="h3">Учёт успеваемости</Typography>
      </Box>
      <Box display={"flex"} alignItems={"center"}>
        <Box flex={1}>
          <Breadcrumbs aria-label="breadcrumb" style={{ color: "#1E90FF", fontSize: "20px" }}>
            <Link className="hover:underline-offset-1 hover:text-blue-700 text-blue-500" href="subjects-list">
              {subject}
            </Link>
            <Link className="hover:underline-offset-1 hover:text-blue-700 text-blue-500" href="groups-list">
              {group}
            </Link>
            <Link className="hover:underline-offset-1 hover:text-blue-700 text-blue-500" href="attendance-table">
              Учёт успеваемости
            </Link>
          </Breadcrumbs>
        </Box>
        <Link href="attendance-table" passHref>
          <Button variant="outlined">Открыть посещаемость</Button>
        </Link>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{
          ".MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold !important",
          },
        }}
        showColumnVerticalBorder
        showCellVerticalBorder
        hideFooter
      />
    </Box>
  );
}
