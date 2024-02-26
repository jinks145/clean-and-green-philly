import React, { useState, FC } from "react";
import { Button, Tooltip } from "@nextui-org/react";
import { useFilter } from "@/context/FilterContext";
import { Check, Info } from "@phosphor-icons/react";

type DimensionFilterProps = {
  property: string;
  display: string;
  options: string[];
  tooltip: string;
};

const DimensionFilter: FC<DimensionFilterProps> = ({
  property,
  display,
  options,
  tooltip,
}) => {
  const { dispatch, appFilter } = useFilter();
  const [selectedKeys, setSelectedKeys] = useState<string[]>(
    appFilter[property]?.values || []
  );

  const toggleDimension = (dimension: string) => {
    const newSelectedKeys = selectedKeys.includes(dimension)
      ? selectedKeys.filter((key) => key !== dimension)
      : [...selectedKeys, dimension];
    setSelectedKeys(newSelectedKeys);
    dispatch({
      type: "SET_DIMENSIONS",
      property,
      dimensions: newSelectedKeys,
    });
  };

  return (
    <div className="pb-6">
      <div className="flex items-center mb-2">
        <div className="text-md flex items-center">
          <h2>{display}</h2>
          <Tooltip content={tooltip} placement="top" showArrow color="primary">
            <Info className="h-5 w-5 text-gray-500 ml-2 cursor-pointer" />
          </Tooltip>
        </div>
      </div>
      <div className="space-x-2 min-h-[33.5px]">
        {options.map((option, index) => (
          <Button
            key={index}
            disableAnimation
            onPress={() => toggleDimension(option)}
            size="sm"
            color={selectedKeys.includes(option) ? "success" : "default"}
            className="mb-2 p-2 h-6"
            radius="full"
            aria-pressed={selectedKeys.includes(option)}
            startContent={selectedKeys.includes(option) ? <Check className="h-3 w-3" /> : undefined}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DimensionFilter;
