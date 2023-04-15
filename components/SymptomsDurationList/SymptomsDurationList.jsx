import React from "react";

import "./SymptomsDurationList.css";

const SymptomsDurationList = (props) => {
    const options = [
        {
            text: "Less than 24 hours",
            handler: props.actionProvider.handleLessThan24Hours,
            id: 1,
        },
        {
            text: "1-7 days",
            handler: props.actionProvider.handle1To7Days,
            id: 2,
        },
        {
            text: "More than 7 days",
            handler: props.actionProvider.handleMoreThan7Days,
            id: 3,
        },
    ];

    const optionsMarkup = options.map((option) => (
        <button
            className="duration-list-item"
            key={option.id}
            onClick={option.handler}
        >
            {option.text}
        </button>
    ));

    return <div className="duaration-list-container">{optionsMarkup}</div>;
}