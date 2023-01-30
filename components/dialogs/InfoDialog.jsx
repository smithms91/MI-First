'use client'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useState } from 'react';

export default function InfoDialog({open, handleClose, name, submitForm}) {
    const [firstName, setFirstName] = useState(name.firstName)
    const [lastName, setLastName] = useState(name.lastName)
    const [email, setEmail] = useState(name.email)
    let userObj = {
        oldName: {
            firstName: name.firstName,
            lastName: name.lastName
        },
        oldEmail: name.email,
        firstName: firstName,
        lastName: lastName,
        email: email
    }
    
    return (
        <Dialog open={open} onClose={(e) => handleClose()}>
            <DialogTitle>Edit Info</DialogTitle>
            <DialogContent>
                <DialogContentText style={{ "marginTop": "2rem", "color": "black" }}>
                    Name
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="fname"
                    label= {name.firstName}
                    type="string"
                    fullWidth
                    variant="outlined"
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="lname"
                    label={name.lastName}
                    type="string"
                    fullWidth
                    variant="outlined"
                    onChange={(e) => setLastName(e.target.value)}

                />
                <DialogContentText style={{ "marginTop": "2rem", "color": "black" }}>
                    Email
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label={name.email}
                    type="email"
                    fullWidth
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)}

                />
            </DialogContent>
            <DialogActions>
                <Button onClick={(e) => handleClose()}>Cancel</Button>
                <Button onClick={(e) => {submitForm(userObj); handleClose()}}>Update</Button>
            </DialogActions>
        </Dialog>
    )
}