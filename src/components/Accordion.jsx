import React from 'react';


const Accordion = ({ title, children, openAccordion, setOpenAccordion }) => {
    const isOpen = openAccordion === title;

    const handleClick = () => {
        if (isOpen) {
            setOpenAccordion(null); // Закриття акордеону, якщо він уже відкритий
        } else {
            setOpenAccordion(title); // Відкриття акордеону
        }
    };

    return (
        <div className="accordion-wrapper">
            <div
                className={`accordion-title ${isOpen ? "open" : ""}`}
                onClick={handleClick}
            >
                {title}
            </div>
            <div className={`accordion-item ${!isOpen ? "collapsed" : ""}`}>
                <div className="accordion-content">{children}</div>
            </div>
        </div>
    );
};

export default Accordion;