import { Box } from '@mui/material';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import React from 'react';
import { User } from '../../server/src/users/entities/user.entity';

interface UserResponse {
    data: User
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await axios.get<UserResponse>(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/users/findOne?login=0`);
  
  return { props: { data } };
};

function PrismaTest(props : {data: UserResponse}) {
    console.log(props.data);
    
    return(
        <>
            <Box sx={{ marginX: 'auto', width: '500', height: '500', position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                
            </Box>
        </>
    );
}

export default PrismaTest;