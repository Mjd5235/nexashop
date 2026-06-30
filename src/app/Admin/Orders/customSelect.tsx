import React, { useState, useRef, useEffect, } from 'react';
import styles from './Orders.module.css';

interface customProps {
    options: string[]
    defaultValue: string
    onChange: (value: string) => void
    dataLen: number
    itemLen: number
}

const CustomSelect = ({ options, defaultValue, onChange, dataLen, itemLen }: customProps) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string>(defaultValue || options[0]);

    const selectRef = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setIsOpen(false);
        if (onChange) {
            onChange(option)
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
                    {(options as string[]).map((option: string) => (
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