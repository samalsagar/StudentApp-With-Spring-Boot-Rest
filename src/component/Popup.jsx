import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const CustomSnackbar = styled(Snackbar)(({ theme }) => ({
    '& .MuiSnackbarContent-root': {
        top: theme.spacing(8), // Adjust the value as needed (e.g., theme.spacing(8) = 64px)
    }
}));

const Popup = ({ message, onClose }) => {
    return (
        <CustomSnackbar
            open={true}
            autoHideDuration={6000}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            action={
                <Button color="inherit" onClick={onClose}>
                    Close
                </Button>
            }
        >
            <Alert
                onClose={onClose}
                severity="success" // Use "error" severity for a red color
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </CustomSnackbar>
    );
};

export default Popup;
