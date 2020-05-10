import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class ActivityRemoveDialog extends React.Component {

    handleConfirm() {
        this.props.onConfirm();
    }

    handleCancel() {
        this.props.onCancel();
    }

    render() {
        return (
            <div>
                <Dialog
                    open={true}
                    onClose={this.handleCancel.bind(this)}>
                    <DialogTitle>{"Remove '" + this.props.activity.name + "'?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            All history related to this activity will be removed as well.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCancel.bind(this)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleConfirm.bind(this)} color="primary" autoFocus>
                            Remove
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default ActivityRemoveDialog;
