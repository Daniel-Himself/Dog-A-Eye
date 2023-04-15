import React from "react"

import "./SymptomsOptions.css";

const SymptomsOptions = (props) => {
    const options = [
        { text: "Squinting", handler: props.actionProvider.handleDurationOptions, id: 1 },
        { text: "Swelling", handler: props.actionProvider.handleDurationOptions, id: 2 },
        { text: "Discharge", handler: props.actionProvider.handleDurationOptions, id: 3 },
        { text: "Redness", handler: props.actionProvider.handleDurationOptions, id: 4 },
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