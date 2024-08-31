import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import "./borrowingrules.css";

interface OptionType {
  value: string;
  label: string;
}

interface AgeGroup {
  allDivisions: boolean;
  divisions: OptionType[];
  ruleDivisions: OptionType[];
  borrowingOption: "allow" | "disallow";
}

interface FormValues {
  ageGroups: AgeGroup[];
}

const colourOptions: OptionType[] = [
  { value: "all", label: "All" },
  { value: "men", label: "Men's" },
];

const animatedComponents = makeAnimated();

// react select css
const customStyles = {
  control: (provided: any) => ({
    ...provided,
    borderColor: "black",
    boxShadow: "none",
    "&:hover": {
      borderColor: "black",
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    border: "1px solid black",
  }),
  menuList: (provided: any) => ({
    ...provided,
    backgroundColor: "white",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "black"
      : state.isFocused
      ? "rgba(239, 234, 234, 0.885)"
      : "white",
    color: state.isSelected ? "white" : "black",
    "&:hover": {
      backgroundColor: "rgba(239, 234, 234, 0.885)",
    },
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "black",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "black",
  }),
};

function BorrowingRules() {
  const { control, handleSubmit, register, watch } = useForm<FormValues>({
    defaultValues: {
      ageGroups: [
        {
          allDivisions: false,
          divisions: [],
          ruleDivisions: [],
          borrowingOption: "allow",
        },
      ],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "ageGroups",
  });

  return (
    <div className="flex justify-center mt-10">
      <div className="border border-black shadow-lg rounded-lg p-6 w-1/2 bg-white overflow-x-hidden overflow-y-auto">
        <h5 className="text-xl font-bold mb-4 text-left">
          Player Borrowing Restrictions
        </h5>
        <div className={`overflow-y-auto ${fields.length > 2 ? "h-96" : ""}`}>
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-2 gap-4 m-3">
              {/* Left Column: All Divisions */}
              <div>
                <div className="mb-4 text-left custom-checkbox">
                  <Controller
                    name={`ageGroups.${index}.allDivisions`}
                    control={control}
                    render={({ field }) => (
                      <>
                        <input
                          type="checkbox"
                          id={`all-divisions-${index}`}
                          className="mr-2 h-4 w-4"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                        <label
                          htmlFor={`all-divisions-${index}`}
                          className="text-md font-medium"
                        >
                          All Divisions
                        </label>
                      </>
                    )}
                  />
                </div>
                {watch(`ageGroups.${index}.borrowingOption`) === "allow" && (
                  <div className="mb-4 text-left">
                    <h6 className="text-xs font-semibold mb-2">
                      Select Divisions Players rules are applied to:
                    </h6>
                    <Controller
                      name={`ageGroups.${index}.ruleDivisions`}
                      control={control}
                      render={({ field }) => (
                        <Select
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          isMulti
                          options={colourOptions}
                          className="w-full"
                          styles={customStyles}
                          {...field}
                        />
                      )}
                    />
                  </div>
                )}
              </div>

              {/* Right Column: Borrowing Options and Select */}
              <div className="mt-[4.5rem]">
                <div className="mb-4 text-left">
                  <div className="flex justify-between items-center">
                    <div>
                      <label className="text-sm mr-4 font-medium custom-radio">
                        <input
                          type="radio"
                          name={`ageGroups.${index}.borrowingOption`}
                          value="allow"
                          checked={fields[index].borrowingOption === "allow"}
                          onChange={() =>
                            update(index, {
                              ...fields[index],
                              borrowingOption: "allow",
                            })
                          }
                          className="mr-2"
                        />
                        Borrowing
                      </label>
                      <label className="text-sm font-medium custom-radio">
                        <input
                          type="radio"
                          name={`ageGroups.${index}.borrowingOption`}
                          value="disallow"
                          checked={fields[index].borrowingOption === "disallow"}
                          onChange={() =>
                            update(index, {
                              ...fields[index],
                              borrowingOption: "disallow",
                            })
                          }
                          className="mr-2"
                        />
                        No Borrowing
                      </label>
                    </div>
                    {fields.length > 1 && (
                      <button onClick={() => remove(index)}>
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          className="text-red-500 cursor-pointer"
                        />
                      </button>
                    )}
                  </div>
                </div>

                {watch(`ageGroups.${index}.borrowingOption`) === "allow" && (
                  <div className="mb-4 text-left">
                    <h6 className="text-xs font-semibold mb-2">
                      Select Divisions Players can be borrowed from
                    </h6>
                    <Controller
                      name={`ageGroups.${index}.divisions`}
                      control={control}
                      render={({ field }) => (
                        <Select
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          isMulti
                          options={colourOptions}
                          className="w-full"
                          styles={customStyles}
                          {...field}
                        />
                      )}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <p
          className="text-start text-xs text-purple-700 cursor-pointer"
          onClick={() =>
            append({
              allDivisions: false,
              divisions: [],
              ruleDivisions: [],
              borrowingOption: "allow",
            })
          }
        >
          <FontAwesomeIcon icon={faPlus} /> Age Group/Division
        </p>
      </div>
    </div>
  );
}

export default BorrowingRules;
