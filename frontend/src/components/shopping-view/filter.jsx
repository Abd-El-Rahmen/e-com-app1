import React, { Fragment, useState } from "react";
import { filterOptions } from "../../config";

const ProductFilter = ({ filter, handleFilter }) => {
  return (
    <div className="bg-background w-full rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            <h3 className="text-base font-bold">{keyItem}</h3>
            <div className="space-y-2">
              {filterOptions[keyItem].map((option) => (
                <div key={option.id} className="flex w-fit p-1 items-center">
                  <input
                    type="checkbox"
                    id={option.id}
                    className="mr-2 w-4 h-4 cursor-pointer"
                    onChange={() => {
                      handleFilter(keyItem, option.id);
                    }}
                    checked={filter[keyItem]?.includes(option.id) || false}
                  />
                  <label htmlFor={option.id} className="text-sm cursor-pointer">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
