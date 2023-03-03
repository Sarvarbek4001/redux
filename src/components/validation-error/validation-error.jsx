import React, { useCallback } from "react";
import { useSelector } from "react-redux/es/exports";
const ValidationError = () => {
  const { error } = useSelector((state) => state.auth);
  const errorMessage = useCallback(() => {
    return Object.keys(error).map((name) => {
      const msg = error[name].join(",");
      return `${name} - ${msg}`;
    });
  }, [error]);

  return (
    error !== null &&
    errorMessage().map((error) => (
      <div
        className="p-2 my-2 text-sm text-center text-white bg-red-400 rounded-md"
        key={error}
      >
        {error}
      </div>
    ))
  );
};

export default ValidationError;
