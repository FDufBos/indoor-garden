import AddPlantLayout from "@main/components/forms/add-plant/addPlantLayout";
import AddPlantName from "@main/components/forms/add-plant/name";
import AddPotType from "@main/components/forms/add-plant/pot";
import AddPlantSunlightAmount from "@main/components/forms/add-plant/sunlight";
import { FormProvider } from "@main/contexts/formContext";
import { useRouter } from "next/router";
import React, { useState } from "react";



export const Garden: React.FC = () => {

  const handleNextButtonClick = (): void => {
    if (currentPageIndex < formPages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    } else {
      // This is what happens on the last page when the button is clicked
      // but handleSubmit is on the form page because I
      // couldn't figure out how to get it to work here
    }
    
  };

  const formPages = [
    {
      component: <AddPlantName onNextButtonClick={handleNextButtonClick} />,
    },
    {
      component: <AddPlantSunlightAmount onNextButtonClick={handleNextButtonClick}/>,
    },
    {
      component: <AddPotType />,
    },
  ];

  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const router = useRouter();

  const handleBackButtonClick = (): void => {
    // Check if the current page index is greater than 0
    if (currentPageIndex > 0) {
      // If it is, decrement the current page index
      setCurrentPageIndex(currentPageIndex - 1);
    } else {
      // Otherwise, go back to the previous page
      router.back();
    }
  };

  return (
    <FormProvider>
      <AddPlantLayout
        currentPageIndex={currentPageIndex}
        onBackButtonClick={handleBackButtonClick}
        numFormPages={formPages.length}
        
      >
        {React.cloneElement(formPages[currentPageIndex].component, {
          onNextButtonClick: handleNextButtonClick,
        })}
      </AddPlantLayout>
    </FormProvider>
  );
};
export default Garden;
