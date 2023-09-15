import React from "react";
import s from "./Input.module.css";

function Input({ type, name, placeholder, styles, error,required, register }) {

const errorMessage = error ? (error.type === "required" || error.type === "pattern" ? error.message : required) : "";

  return (
    <div>
      <input
        className={`${s[styles]} ${error ? s.error : ""}`}
        type={type}
        name={name}
        placeholder={placeholder}
        {...register(name)} //important
      />
      {error && <p className={s.errorMessage}>{errorMessage}</p>}
    </div>
  );
}

export default Input;