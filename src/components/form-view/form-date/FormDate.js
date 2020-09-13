import React from "react";
import moment from "moment";
import "./FormDate.css"

function FormDate({date}) {
    return (
        <div className="form-date">
            <div className="form-date__container">
                <p className="form-date__day">{moment(date).format('dddd')} {moment(date).format('DD')}</p>
                <div className="inner-block">
                    <p className="form-date__year">{moment(date).format('YYYY')}</p>
                    <p className="form-date__month">{moment(date).format('MMMM')}</p>
                </div>
            </div>
        </div>
    )
}

export default FormDate;
