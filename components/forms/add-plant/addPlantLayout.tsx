import { ChevronLeftIcon } from "@chakra-ui/icons";

export interface AddPlantLayoutProps {
  /** The number of form pages */
  numFormPages: number;
  /** The index of the current form page */
  currentPageIndex: number;
  /** The function to call when the back button is clicked */
  onBackButtonClick: () => void;
  /** children */
  children: React.ReactNode;
}

export const AddPlantLayout: React.FC<AddPlantLayoutProps> = ({
  numFormPages,
  onBackButtonClick,
  children,
  currentPageIndex,
  // eslint-disable-next-line arrow-body-style
}) => {
  return (
    <div className="fixed h-screen w-screen bg-monstera-100">
      <nav className=" flex py-[18px] mx-[24px] items-center ">
        {/* Use the onBackButtonClick prop as the click handler for the back button */}
        <ChevronLeftIcon
          onClick={onBackButtonClick}
          color="green.900"
          className="text-4xl cursor-pointer"
        />
        <h1 className="absolute left-1/2 -translate-x-1/2 font-[Flexa] font-[400] text-[22px] text-center text-monstera-700">
          Add Plant
        </h1>
      </nav>
      <section className="mx-[24px] progress-bar">
        <div className="relative flex flex-row justify-between w-full h-[12px] rounded-[16px] bg-[#d7e0d7]">
          {/* Use a loop to generate the divs based on the number of items in the formPages array */}
          {Array.from({ length: numFormPages + 1 }).map((_, index) => (
            <div
              key={index}
              className={`left-${
                (index / (numFormPages - 1)) * 100
              }% bg-white h-[14px] w-[1px] top-[1px] z-50`}
              style={{
                visibility:
                  index === 0 || index === numFormPages ? "hidden" : "visible",
              }}
            />
          ))}
          {/* Add a new div element to represent the user's progress through the form */}
          <div
            className={`bg-monstera-700 transition-all ease-in-out duration-[400ms] h-[12px] absolute top-[0px] z-40 ${
              currentPageIndex === numFormPages - 1
                ? "rounded-[16px]"
                : "rounded-l-[16px]"
            }`}
            style={{
              width: `${((currentPageIndex + 1) / numFormPages) * 100}%`,
            }}
          />
        </div>
      </section>

      <div>{children}</div>
    </div>
  );
};

export default AddPlantLayout;
