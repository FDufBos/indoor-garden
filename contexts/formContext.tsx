import { createContext, useState } from "react";

const FormContext = createContext({});

export const FormProvider = ({ children }): React.ReactElement => {
  const [formData, setFormData] = useState({
    nickname: "",
    sunlight: "",
    pot: "",
  });

  const setSunlight = (value): void => {
    setFormData((prevData) => ({
      ...prevData,
      sunlight: value,
    }));
  };

  const setPotType = (value): void => {
    setFormData((prevData) => ({
      ...prevData,
      pot: value,
    }));
  };

  const handleChange = (e): void => {
    const { type } = e.target;
    const { name } = e.target;
    const value = type === "slider" ? e.target.value : e.target.value;

    if (name === "nickname") {
      const regex = /^[a-zA-Z0-9 ]*$/;
      if (!regex.test(value)) {
        return;
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    };

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        handleChange,
        setSunlight,
        setPotType,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
