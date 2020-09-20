import React from "react";
import "./FormDate.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

function FormDate({date, setDate, disabled}) {
    const DateDisplay = React.forwardRef(({value, onClick}, ref) => (
        <div className="form-date">
            <div className="form-date__container" onClick={onClick} data-testid="form-date-container">
                <p className="form-date__day">{moment(value).format('dddd')} {moment(value).format('DD')}</p>
                <div className="inner-block">
                    <p className="form-date__year">{moment(value).format('YYYY')}</p>
                    <p className="form-date__month">{moment(value).format('MMMM')}</p>
                </div>
            </div>
            {!disabled &&
            <IconButton className="form-date__edit-button" role="button" aria-label="Edit date" onClick={onClick}>
                <EditIcon/>
            </IconButton>
            }
        </div>
    ));

    return (
        <DatePicker
            dateFormat="yyyy-MM-dd"
            maxDate={new Date()}
            selected={moment(date).utc().toDate()}
            onChange={(date) => {
                setDate(moment(date).format('YYYY-MM-DD'))
            }}
            disabled={disabled}
            customInput={<DateDisplay/>}/>
    );
}

export default FormDate;
