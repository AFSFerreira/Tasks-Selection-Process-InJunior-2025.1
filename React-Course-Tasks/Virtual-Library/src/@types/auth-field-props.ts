import React from "react";

type AuthFieldProps = {
  fieldName: string;
  fieldType: React.HTMLInputTypeAttribute;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default AuthFieldProps;
