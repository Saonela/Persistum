import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function ActivityRemoveDialog({activity, onConfirm, onCancel}){

    return (
        <div>
            <Dialog
                open={true}
                onClose={() => onCancel()}>
                <DialogTitle>{"Remove '" + activity.name + "'?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        All history related to this activity will be removed as well.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onCancel()} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => onConfirm()} color="primary" autoFocus>
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ActivityRemoveDialog;
