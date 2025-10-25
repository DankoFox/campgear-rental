import React from "react";
import EquipmentItem from "./EquipmentItem";

const EquipmentList = ({ equipmentData }) => {
  return (
    <div className="flex space-x-4 overflow-x-auto py-4">
      {equipmentData.map((equipment) => (
        <div key={equipment.id} className="flex-none">
          <EquipmentItem equipment={equipment} />
        </div>
      ))}
    </div>
  );
};

export default EquipmentList;
