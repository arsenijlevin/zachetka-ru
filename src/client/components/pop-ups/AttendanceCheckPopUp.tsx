import { Modal, Box, Button, Typography } from "@mui/material";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ruRU } from "@mui/x-date-pickers/locales";
import { MultiSectionDigitalClock } from "@mui/x-date-pickers/MultiSectionDigitalClock";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";
import Select from "react-select";
import Countdown from "react-countdown";
import { DateTime } from "luxon";
import axios from "axios";
import { UserDto } from "@shared/types/user/user.dto";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import { GroupsForProfessor } from "types/GroupsForProfessor";
import QRCode from "react-qr-code";
import { getUserFromCookie } from "lib/serverSideUtils";

interface AttendanceCheckPopUpProps {
  open: boolean;
  setOpen: (value: number) => void;
  subject: {
    semester: number;
    title: string;
    id: number;
  };
  groups: GroupsForProfessor[];
}

interface TimerProps {
  minutes: number;
  seconds: number;
  completed: boolean;
}

interface LessonWithProfessor {
  id: number;
  week_day: string;
  time: string;
  subject_id: number;
  place: string;
  frequency: string;
  professor_login: string;
  students_count: number;
}

const seconds10 = DateTime.now().set({ hour: 0, minute: 0, second: 10, millisecond: 0 });
const minutes15 = DateTime.now().set({ hour: 0, minute: 15, second: 0, millisecond: 0 });

function AttendanceCheckPopUp({ subject, open, setOpen, groups }: AttendanceCheckPopUpProps) {
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedFrequency, setSelectedFrequency] = useState<string>("");
  const [dayArray, setDayArray] = useState<string[]>([]);
  const [timeArray, setTimeArray] = useState<string[]>([]);
  const [visibility, setVisibility] = useState<"hidden" | "visible">("hidden");
  const [studentsQuantity, setStudentsQuantity] = useState(0);
  const [lessonId, setLessonId] = useState(-1);
  const handleTimeChange = async (newTime: string) => {
    try {
      const cookies = new Cookies();
      const token = cookies.get<string>("token");
      const decodedCookie: UserDto = jwt_decode(token);

      const body = {
        week_day: selectedDay,
        time: newTime,
        frequency: selectedFrequency,
        professor_login: decodedCookie.login,
        subject_id: subject.id,
      };

      const request = await axios.post<LessonWithProfessor>(`lessons/findOneByProfessorParameters`, body);

      setStudentsQuantity(request.data.students_count ?? 0);
      setLessonId(request.data.id);
      setVisibility("visible");
    } catch (error) {
      return;
    }
  };

  const handleDayChange = async (newDay: string) => {
    const cookies = new Cookies();
    const token = cookies.get<string>("token");
    const decodedCookie: UserDto = jwt_decode(token);

    const body = {
      week_day: newDay,
      subject_id: subject.id,
      professor_login: decodedCookie.login,
    };

    axios
      .post<string[]>(`lessons/getTimes`, body)
      .then((result) => {
        setTimeArray(result.data);
        // setLessonId(result.data.id)
        setSelectedDay(newDay);
      })
      .catch((_) => {
        setTimeArray([]);
      });
  };

  useEffect(() => {
    const user: UserDto = getUserFromCookie();

    const body = {
      subject_id: subject.id,
      professor_login: user.login,
    };

    axios
      .post<string[]>(`lessons/getWeekDays`, body)
      .then((result) => {
        setDayArray(result.data);
        // setLessonId(result.data.id)
      })
      .catch((_) => {
        setDayArray([]);
      });
  }, [subject.id]);

  const subjectName = subject.title;
  const semester = subject.semester;
  const handleClose = () => setOpen(0);
  const [state, setState] = useState(0);
  const [codeText, setCodeText] = useState("ild9flg");
  const [time, setTime] = useState<DateTime>(DateTime.now());
  const groupsChecked =
    groups?.map((group) => ({
      title: group.title,
      studentsChecked: 0,
    })) || [];
  const studentsChecked = groupsChecked?.reduce((acc, group) => acc + group.studentsChecked, 0) || 0;

  function makeCode(length: number) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }



  function handleChangeStateToMiddle() {
    setCodeText(makeCode(7));
    setState(1);
  }

  function handleChangeStateToEnd() {
    setState(2);
  }

  const frequency = [
    { value: "Числитель", label: "Числитель" },
    { value: "Знаменатель", label: "Знаменатель" },
  ];

  const renderer = ({ minutes, seconds, completed }: TimerProps) => {
    if (completed) {
      return (
        <Typography variant="h1" textAlign={"center"}>
          00:00
        </Typography>
      );
    } else {
      return (
        <Typography variant="h1" textAlign={"center"}>
          {minutes}:{seconds}
        </Typography>
      );
    }
  };

  if (state === 0) {
    return (
      <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box className="m-auto w-1/2 flex flex-col border border-grey px-16 py-8 bg-white mt-16">
          <AiOutlineClose cursor={"pointer"} size={20} onClick={handleClose} style={{ alignSelf: "flex-end" }} />
          <Box className="flex flex-col gap-4 self-center">
            <Typography variant="h5" textAlign={"center"}>
              Настройка проверки посещаемости
            </Typography>
            <Typography variant="h6" textAlign={"center"}>
              {subjectName} ({semester} семестр)
            </Typography>
            <Typography variant="h6" textAlign={"center"} fontStyle={"italic"}>
              Введите время проверки от 00:10 до 15:00
            </Typography>
            <Box margin={"auto"} height={"100px"}>
              <LocalizationProvider
                localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
                dateAdapter={AdapterLuxon}
                adapterLocale="ru"
              >
                <MultiSectionDigitalClock
                  onChange={(newTime) => newTime && setTime(newTime)}
                  minTime={seconds10}
                  maxTime={minutes15}
                  sx={{ height: "100px" }}
                  timeSteps={{ minutes: 1 }}
                  views={["minutes", "seconds"]}
                />
              </LocalizationProvider>
            </Box>
            <Select
              placeholder="Выберите день недели"
              options={dayArray?.map((day) => ({ value: day, label: day }))}
              onChange={(e) => handleDayChange(e?.value ?? "")}
            />
            <Select
              placeholder="Числитель/знаменатель"
              options={frequency}
              onChange={(e) => setSelectedFrequency(e?.value ?? "")}
            />
            <Select
              placeholder="Время занятия"
              options={timeArray?.map((time) => ({ value: time, label: time }))}
              onChange={(e) => handleTimeChange(e?.value ?? "")}
            />
            {studentsQuantity > 0 ? (
              <Typography visibility={visibility} variant="h6" textAlign={"center"}>
                На занятии должно присутствовать {studentsQuantity} студентов
              </Typography>
            ) : (
              <Typography visibility={visibility} variant="h6" textAlign={"center"}>
                Занятие не найдено!
              </Typography>
            )}

            <Button disabled={studentsQuantity === 0} variant="outlined" onClick={handleChangeStateToMiddle}>
              Запустить проверку посещаемости
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  }

  if (state === 1) {

    return (
      <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box className="m-auto w-1/2 flex flex-col border border-grey px-16 py-8 bg-white mt-16">
          <Box className="flex flex-col gap-8 self-center justify-center items-center">
            <AiOutlineClose cursor={"pointer"} size={20} onClick={handleClose} style={{ alignSelf: "flex-end" }} />
            <Typography variant="h6" textAlign={"center"}>
              Идёт проверка посещаемости
            </Typography>
          
            <Countdown
              date={DateTime.now()
                .plus({
                  minute: time.minute,
                  second: time.second
                })
                .toMillis()}
              renderer={renderer}
              className="text-center"
              onComplete={() => setState(2)}
            />
            <Box margin={"auto"}>
              {codeText ? (
                <QRCode value={`${window.location.origin}/attendance-code/${codeText}`} width={300} height={300} />
              ) : (
                <></>
              )}
            </Box>
            <Typography variant="h6" textAlign={"center"}>
              Код: {codeText}
            </Typography>
            <Button variant="outlined" style={{ width: "500px" }} onClick={handleChangeStateToEnd}>
              Закончить проверку посещаемости
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  }

  if (state === 2) {
    return (
      <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box className="m-auto w-1/2 flex flex-col border border-grey px-16 py-8 bg-white mt-16 break-all">
          <Box className="flex flex-col self-center break-all">
            <AiOutlineClose cursor={"pointer"} size={20} onClick={handleClose} style={{ alignSelf: "flex-end" }} />
            <Typography variant="h3" textAlign={"center"} className={"break-all"}>
              Итог
            </Typography>
            <Typography variant="h1" textAlign={"center"} marginY={3}>
              00:00
            </Typography>
            <Box marginBottom={2}>
              {groupsChecked.map((group, index) => (
                <Typography key={index} variant="body1" textAlign={"center"} marginBottom={1}>
                  {group.title} - студентов отметилось: {group.studentsChecked}
                </Typography>
              ))}
            </Box>
            <Typography variant="body1" textAlign={"center"}>
              Всего студентов на занятии: {studentsChecked}
            </Typography>
            <Typography variant="body1" textAlign={"center"}>
              На занятии должно присутствовать {studentsQuantity} студентов
            </Typography>
            <br />
            <Button variant="outlined" style={{ width: "500px" }} onClick={handleClose}>
              Сбросить учтённую сейчас посещаемость
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  }

  return <></>;
}

export default AttendanceCheckPopUp;
