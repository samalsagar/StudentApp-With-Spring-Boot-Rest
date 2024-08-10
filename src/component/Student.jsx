import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Popup from './Popup';

// import Student from './component/Student'

import { Button } from '@mui/material';
const Student = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [openPopup, setOpenPopup] = useState(false);
    const [msg, setMsg] = useState('');
    const [student, setStudent] = useState([]);

    useEffect(() => {
        fetch('http://baseapp-env.eba-5iac8m4p.us-east-1.elasticbeanstalk.com/student/getAll', {
            method: "GET"
        }).then(res => res.json())
            .then((res) => {
                console.log(res);   
                setStudent(res)
            });
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const studentDetails = { name, address };

        console.log(JSON.stringify(studentDetails));

        // console.log(studentDetails);

        fetch('http://baseapp-env.eba-5iac8m4p.us-east-1.elasticbeanstalk.com/student/add', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(studentDetails)
        }).then(async (response) => {
            const data = await response.text(); // Use response.json() if you return JSON
            setOpenPopup(true);
            setMsg(data);
        }).catch((error) => {
            console.log("eroor found")
        });
    }
    return (
        <>
            <div className='flex justify-left'>
                <Box className='border bg-gray-200  mt-4 rounded-xl w-1/2 p-6'
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <h1 className='font-serif font-bold'>ADD STUDENT</h1>
                    <TextField id="outlined-basic" label="Student Name" value={name} variant="outlined" fullWidth onChange={(e) => setName(e.target.value)} />
                    <TextField id="outlined-basic" label="Student Address" value={address} variant="outlined" fullWidth onChange={(e) => setAddress(e.target.value)} />
                    <Button variant="contained" onClick={handleSubmit} >SUBMIT</Button>
                </Box>
                {openPopup && <Popup message={msg} onClose={() => setOpenPopup(false)} />}

                <div className='  bg-gray-200 mx-4 overflow-auto mt-4 rounded-xl w-1/2 p-6'
                 style={{ maxHeight: '400px' }}
                >
                    <h1 className='font-serif font-bold text-blue-800 underline'>STUDENT DETAILS</h1>

                    {student.length > 0 ? (
                        student.map(stu => (
                            <Box key={stu.id} className='mb-2 p-2 border rounded bg-slate-400'>
                                <div><strong>ID:</strong> {stu.id}</div>
                                <div><strong>Name:</strong> {stu.name}</div>
                                <div><strong>Address:</strong> {stu.address}</div>
                            </Box>
                        ))
                    ) : (
                        <p>No students available.</p>
                    )}
                </div>
            </div>

        </>
    );
}

export default Student
