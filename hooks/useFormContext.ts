import { useContext } from "react";

import FormContext from "@main/contexts/formContext";

/**
  from @main/contexts/formContext.ts
    const [formData, setFormData] = useState({
    nickname: "",
    sunlight: "",
    pot: "",
  });
 */
type FormContextType = {
  /** Form data */
  formData: {
    /** plant nickname text input */
    nickname: string,
    /** sunlight amount, number from 0-100 from a range selector */
    sunlight: number,
    /** Pot type, from radio-like selectors, but returns a string value */
    pot: string,
  },
  /** Handles changes in form input */
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  /** helper function to add pot type to formData object */
  setPotType: (potType: string) => void,
  /** helper function to add sunlight amount to formData object */
  setSunlight: (sunlight: number) => void,
};

const useFormContext = (): FormContextType => useContext(FormContext) as FormContextType;

export default useFormContext;
