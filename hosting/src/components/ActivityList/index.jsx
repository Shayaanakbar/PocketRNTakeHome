import React from 'react';

// Import Firebase
import { withFirebase } from "../../firebaseFE";

// Material UI Import
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

// ActivityList Function
function ActivityList(props) {
    const { activities, activityList, editActivity,setOpenSnackbar, setSnackbarMsg, setEditing} = props;

    const deleteActivity = (i) => {
        // Get key of activity in firebase
        const activityKey = Object.keys(activities)[i];
        // Connect to our firebase API
        const emptyActivity = {
            date: null,
            duration: null,
            type: null,
            name: null,
        };

        props.firebase.updateActivity(props.authUser.uid, emptyActivity, activityKey);

        // Show notification
        setOpenSnackbar(true);
        setSnackbarMsg('Deleted activity');
        setTimeout(() => {
            setOpenSnackbar(false)
        }, 3000)

        // stop editing
        setEditing(false);
    }

    return (
        <>

            {
                activities === 'not set' || activities === null
                    ? <p>No activities added yet.</p>
                    :
                    <TableContainer component={Paper} >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Duration</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    Object.values(activities).map((activity, i) => {
                                        let {name, type, duration} = activity;
                                        switch(activity.type) {
                                            case 1:
                                                type = "Meeting";
                                                break;
                                            case 2:
                                                type = "Casual Conversation";
                                                break;
                                            case 3:
                                                type = "Interview";
                                                break;
                                            default:
                                                type = "not set";
                                        };
                                        return (
                                            <TableRow key={i}>
                                                <TableCell>{name}</TableCell>
                                                <TableCell>{type}</TableCell>
                                                <TableCell>{duration}</TableCell>
                                                <TableCell>
                                                    <DeleteIcon
                                                        onClick={e => deleteActivity(i)}
                                                    />
                                                    <EditIcon
                                                        onClick={e => editActivity(activity, i)}
                                                        style={{marginLeft:"20px"}}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
            }
        </>
    )
};

export default withFirebase(ActivityList);
