import React from "react"

import "./SymptomsOptions.css";

const SymptomsOptions = (props) => {
    const options = [
        {
            text: "Squinting",
            handler: props.actionProvider.handleSquinting,
            id: 1,
        },
        {
            text: "Swelling",
            handler: props.actionProvider.handleSwelling,
            id: 2,
        },
        {
            text: "Discharge",
            handler: props.actionProvider.handleDischarge,
            id: 3,
        },
        {
            text: "Redness",
            handler: props.actionProvider.handleSoreThroat,
            id: 4,
        },
    ];

    const optionsMarkup = options.map((option) => (
        <button
            className="symptoms-option-button"
            key={option.id}
            onClick={option.handler}
        >
            {option.text}
        </button>
    ));

    return <div className="symptoms-options-container">{optionsMarkup}</div>;
};

export default SymptomsOptions;