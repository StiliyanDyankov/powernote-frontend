import { Button, Input, OutlinedInput, setRef, TextField } from "@mui/material";
import React, { Ref, useEffect, useRef, useState } from "react";

const PinItem = ({
    inputRef,
    value,
    onInput,
    onFocus,
    onBackspace,
}: {
    inputRef: Ref<HTMLInputElement>;
    value: string;
    onInput: (v: string) => void;
    onFocus: () => void;
    onBackspace: () => void;
}) => {
    return (
        <OutlinedInput
            value={value}
            inputRef={inputRef}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                let v = e.key;
                console.log(v);
                if (v === "Backspace") {
                    onInput("");
                    onBackspace();
                } else if (!isNaN(parseInt(v))) {
                    onInput(v);
                } else return;
            }}
            onFocus={onFocus}
            // onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => {
            //     e.curr
            // }}
            sx={{
                p: 0,
                "& .MuiInputBase-input": {
                    p: 1.2,
                    textAlign: "center",
                    fontSize: "1.5rem",
                },
            }}
        />
    );
};

const PinInput = () => {
    const [values, setValues] = useState<string[]>(["", "", "", "", ""]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const elements = useRef<HTMLInputElement[]>([]);

    const handleInput = (v: string, i: number): void => {
        let intValues = [...values];
        intValues[i] = v;
        setValues(intValues);
    };

    const handleBackspace = (i: number): void => {
        if (currentIndex > 0) {
            setCurrentIndex(i - 1);
        }
    };

    useEffect(() => {
        console.log("index", currentIndex);
        if (
            currentIndex <= values.length - 2 &&
            currentIndex >= 0 &&
            values[currentIndex] !== ""
        ) {
            setCurrentIndex(currentIndex + 1);
        }
    }, [values]);

    useEffect(() => {
        elements.current[currentIndex].focus();
    }, [currentIndex]);

    useEffect(() => {
        elements.current[0].focus();
    }, []);

    return (
        <React.Fragment>
            <div className="flex flex-row gap-3 px-4">
                {values.map((v, i) => (
                    <PinItem
                        key={i}
                        value={values[i]}
                        onInput={(v: string) => {
                            handleInput(v, i);
                        }}
                        onFocus={() => {
                            setCurrentIndex(i);
                        }}
                        onBackspace={() => {
                            handleBackspace(i);
                        }}
                        inputRef={(el: HTMLInputElement) => {
                            elements.current.push(el);
                            elements.current[i] = el;
                        }}
                    />
                ))}
            </div>
        </React.Fragment>
    );
};

export default PinInput;
