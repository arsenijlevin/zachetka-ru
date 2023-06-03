import { Modal, Box, Button, Typography } from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai';

interface AddGroupPopUpProps {
    open: boolean;
    setOpen: (value: number) => void;
}

function AttendanceCheckPopUp({ open, setOpen }: AddGroupPopUpProps) {
    const handleClose = () => setOpen(0);

    return(
        <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box className="m-auto w-1/2 flex flex-col border border-grey px-16 py-8 bg-white translate-y-1/3">
                <button className="self-end">
                    <AiOutlineClose onClick={handleClose} />
                </button>
                <Box className="flex flex-col gap-8 self-center">
                    <Typography variant="h6" fontWeight="bold">
                        Настройка проверки посещаемости
                    </Typography>
                </Box>
            </Box>
        </Modal>
    );
}

export default AttendanceCheckPopUp;

//день, числитель\знаменатель, время занятия