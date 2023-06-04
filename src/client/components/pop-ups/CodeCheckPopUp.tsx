import { Modal, Box, Input, Button, Typography } from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai';

interface AddGroupPopUpProps {
    open: boolean;
    setOpen: (value: number) => void;
}

function CodeCheckPopUp({ open, setOpen }: AddGroupPopUpProps) {
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
                <Box className="flex flex-col gap-8 self-center mx-auto" width={'100%'}>
                    <Box width={'100%'}>
                        <Typography variant="body1" textAlign={'center'}>Введите код посещаемости</Typography>
                        <Input className="mt-2 p-1" fullWidth/>
                    </Box>
                    <Button variant="contained" size="medium" className="px-2 py-1">
                        Добавить
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default CodeCheckPopUp;