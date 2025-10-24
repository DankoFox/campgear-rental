import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const SpecificationsPanel = ({
  specifications,
  includedItems,
  usageGuidelines,
}) => {
  const [activeTab, setActiveTab] = useState("specs");

  const tabs = [
    { id: "specs", label: "Thông số kỹ thuật", icon: "Settings" },
    { id: "included", label: "Phụ kiện đi kèm", icon: "Package" },
    { id: "usage", label: "Hướng dẫn sử dụng", icon: "BookOpen" },
  ];

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-micro ${
                activeTab === tab?.id
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="p-4">
        {activeTab === "specs" && (
          <div className="space-y-4">
            <h3 className="font-heading font-semibold">Thông số kỹ thuật</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(specifications)?.map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between items-center py-2 border-b border-muted"
                >
                  <span className="text-muted-foreground capitalize">
                    {key}:
                  </span>
                  <span className="font-medium text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "included" && (
          <div className="space-y-4">
            <h3 className="font-heading font-semibold">Phụ kiện đi kèm</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {includedItems?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-muted/30 rounded-md"
                >
                  <Icon
                    name="Check"
                    size={16}
                    className="text-success flex-shrink-0"
                  />
                  <div>
                    <p className="font-medium">{item?.name}</p>
                    {item?.description && (
                      <p className="text-sm text-muted-foreground">
                        {item?.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "usage" && (
          <div className="space-y-4">
            <h3 className="font-heading font-semibold">Hướng dẫn sử dụng</h3>
            <div className="space-y-4">
              {usageGuidelines?.map((guideline, index) => (
                <div key={index} className="border-l-4 border-primary pl-4">
                  <h4 className="font-medium mb-2">{guideline?.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {guideline?.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecificationsPanel;
