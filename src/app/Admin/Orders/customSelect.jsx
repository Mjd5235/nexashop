import React, { useState, useRef, useEffect } from 'react';
import styles from './Orders.module.css';

const CustomSelect = ({ options, defaultValue, onChange, dataLen, itemLen }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(defaultValue || options[0]);

    const selectRef = useRef(null);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        if (onChange) {
            onChange(option);
        }
    };

    const isLastOrder = itemLen >= dataLen - 2

    return (
        <div className={`${styles.customSelect} ${isOpen ? styles.isOpen : ''}`} ref={selectRef}>
            <div className={styles.selectTrigger} onClick={() => setIsOpen(!isOpen)}>
                <span>{selectedOption}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            {isOpen && (
                <div className={styles.optionsList} style={{ top: !isLastOrder ? "calc(100% + 8px)" : "-230%" }}>
                    {options.map((option) => (
                        <div
                            key={option}
                            className={`${styles.optionItem} ${selectedOption === option ? styles.selectedOption : ''}`}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;