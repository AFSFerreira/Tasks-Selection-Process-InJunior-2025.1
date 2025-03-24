import React from "react";

export type AuthFieldProps = {
    fieldName: string;
    fieldType: React.HTMLInputTypeAttribute;
} & React.InputHTMLAttributes<HTMLInputElement>;
