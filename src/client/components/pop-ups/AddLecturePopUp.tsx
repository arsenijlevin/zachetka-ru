import { Modal, Box } from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai';
import Select from 'react-select';

interface AddLecturePopUpProps {
  open: boolean;
  setOpen: (value: number) => void;
}

function AddLecturePopUp({ open, setOpen }: AddLecturePopUpProps) {

  const handleClose = () => setOpen(0);

  const subjects = [
    { value: 'ТП', label: 'ТП' },
    { value: 'ИПС', label: 'ИПС' },
    { value: 'ИСиС', label: 'ИСиС' },
  ];

  const lecturers = [
    { value: 'Преподаватель 1', label: 'Преподаватель 1' },
    { value: 'Преподаватель 2', label: 'Преподаватель 2' },
    { value: 'Преподаватель 3', label: 'Преподаватель 3' },
  ];

  const groups = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
  ];

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="m-auto w-1/2 flex flex-col border border-grey px-16 py-8 bg-white translate-y-1/3">
        <button className="self-end">
          <AiOutlineClose onClick={handleClose} />
        </button>
        {/* кнопка закрытия */}
        <h2 className='self-center font-bold text-2xl pb-8'>Добавить пару</h2>
        <div className="flex flex-col gap-5">
          <div>
            <h4 className="font-bold text-blue-950">Выбор дисциплины</h4>
            <Select placeholder="Выберите..." options={subjects} className="mt-2"/>
            {/* Выбор дисциплины*/}
          </div>
          <div>
              <h4 className="font-bold text-blue-950">Введите время</h4>
              <input type="text" className="mt-2 border border-grey" />
              {/* Ввод времени*/}
          </div>
          <div>
              <h4 className="font-bold text-blue-950">Введите аудиторию</h4>
              <input type="number" className="mt-2 border border-grey" />
              {/* Ввод аудитории*/}
          </div>
          <div>
              <h4 className="font-bold text-blue-950">Выберите преподавателя</h4>
              <Select placeholder="Выберите..." options={lecturers} className="mt-2"/>
              {/* Выбор преподавателей*/}
          </div>
          <div>
              <h4 className="font-bold text-blue-950">Выберите группы</h4>
              <Select placeholder="Выберите..." isMulti options={groups} className="mt-2"/>
              {/* Выбор групп*/}
          </div>
          <button className="self-center border border-gray px-2 py-1 bg-gray-100">
              Добавить
          </button>
        </div>
      </Box>
    </Modal>
  );
}

export default AddLecturePopUp;