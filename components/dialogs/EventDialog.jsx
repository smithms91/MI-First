import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useEffect, useState } from 'react';

export default function EventDialog({ open, handleClose, submitForm, user }) {
    // const [value, setValue] = useState(Date.now());
    const [eventName, setEventName] = useState('');
    const [hostEmail, setHostEmail] = useState('');
    const [date, setDate] = useState(Date.now());
    const [location, setLocation] = useState({});
    const [description, setDescription] = useState('');
    const [adult, setAdult] = useState(false);
    let eventDetails = {
        eventName: eventName,
        hostEmail: user,
        date: String(date._d),
        location: location,
        description: description,
        adult: adult
    }

    const handleChange = (newValue) => {
        setDate(newValue);
    };

    const handleAdultToggle = () => {
        setAdult(!adult)
        console.log(adult)
    }

    return (
        <Dialog open={open} onClose={(e) => handleClose()}>
            <DialogTitle>Create a new Event</DialogTitle>
            <DialogContent>
                <DialogContentText style={{ "marginTop": "1rem", "color": "black" }}>
                    Event Name
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Event Name"
                    type="string"
                    fullWidth
                    variant="outlined"
                    onChange={(e) => setEventName(e.target.value)}
                />
                <DialogContentText style={{ "marginTop": "1rem", "color": "black" }}>
                    Date
                </DialogContentText>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <MobileDatePicker
                        label="Event Date"
                        value={date}
                        onChange={(newValue) => {
                            handleChange(newValue)
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <DialogContentText style={{ "marginTop": "1rem", "color": "black" }}>
                    Location
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="location"
                    label="Location"
                    type="string"
                    fullWidth
                    variant="outlined"
                    onChange={(e) => setLocation(e.target.value)}

                />
                <DialogContentText style={{ "marginTop": "1rem", "color": "black" }}>
                    Description
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="description"
                    label="Description"
                    type="string"
                    fullWidth
                    variant="outlined"
                    onChange={(e) => setDescription(e.target.value)}

                />
                <DialogContentText style={{ "marginTop": "1rem", "color": "black" }}>
                    18+
                </DialogContentText>
                <Checkbox
                    id="adult"
                    checked={adult}
                    onChange={(e) => handleAdultToggle()}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={(e) => handleClose()}>Cancel</Button>
                <Button onClick={(e) => {submitForm(eventDetails); handleClose()}}>Create Event</Button>
            </DialogActions>
        </Dialog>
    )
}