import React, { useEffect, useState } from "react";

export const useField = (
  initialVal: string
): [string, (e: React.ChangeEvent<HTMLInputElement>) => void] => {
  const [value, setValue] = useState(initialVal);

  const update = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return [value, update];
};

export const useRedirect = (): string => {
  const [redirect, setRedirect] = useState("");
  const grabRedirect = () => {
    if (window.location.href.split("?").length > 1) {
      return window.location.href.split("?")[1].split("=")[1];
    }
    return null;
  };
  useEffect(() => {
    const res = grabRedirect();
    if (res) {
      setRedirect(res);
    }
  }, []);

  return redirect;
};
