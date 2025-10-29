import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ProviderContact = ({ provider }) => {
  const handleContactProvider = () => {
    // Mock contact functionality
    alert(`Connecting to ${provider?.name}...`);
  };

  const handleViewLocation = () => {
    // Mock location view functionality
    alert(`Location of ${provider?.name}`);
  };
  
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="font-heading font-semibold text-lg mb-4">
        Provider information
      </h3>
      <div className="space-y-4">
        {/* Provider Profile */}
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground text-xl font-bold">
              {provider?.name?.charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-lg">{provider?.name}</h4>
            <p className="text-muted-foreground">{provider?.businessType}</p>
            <div className="flex items-center space-x-4 mt-1">
              <div className="flex items-center space-x-1">
                <Icon
                  name="Star"
                  size={14}
                  className="text-yellow-400 fill-current"
                />
                <span className="text-sm font-medium">{provider?.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({provider?.reviewCount} rating)
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={14} />
                <span className="text-sm text-muted-foreground">
                  Since {provider?.memberSince}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Icon name="MapPin" size={16} className="text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Address</p>
                <p className="text-sm text-muted-foreground">
                  {provider?.address}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Icon name="Phone" size={16} className="text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Call</p>
                <p className="text-sm text-muted-foreground">
                  {provider?.phone}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Icon name="Clock" size={16} className="text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Usually response in</p>
                <p className="text-sm text-muted-foreground">
                  {provider?.responseTime}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Icon name="Truck" size={16} className="text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Delivery</p>
                <p className="text-sm text-muted-foreground">
                  {provider?.deliveryAvailable
                    ? "Home delivery"
                    : "Receive at store"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div>
          <p className="text-sm font-medium mb-2">Working date</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {Object.entries(provider?.businessHours)?.map(([day, hours]) => (
              <div key={day} className="flex justify-between">
                <span className="text-muted-foreground capitalize">{day}:</span>
                <span>{hours}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        {provider?.certifications && provider?.certifications?.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">Certifications</p>
            <div className="flex flex-wrap gap-2">
              {provider?.certifications?.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-1 bg-success/10 text-success px-2 py-1 rounded-md text-xs"
                >
                  <Icon name="CheckCircle" size={12} />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-border">
          <Button
            variant="default"
            onClick={handleContactProvider}
            iconName="MessageCircle"
            iconPosition="left"
            fullWidth
          >
            Contact us
          </Button>

          <Button
            variant="outline"
            onClick={handleViewLocation}
            iconName="MapPin"
            iconPosition="left"
            fullWidth
          >
            Location
          </Button>
        </div>

        {/* Map Preview */}
        <div className="h-48 bg-muted rounded-md overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title={provider?.name}
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${provider?.coordinates?.lat},${provider?.coordinates?.lng}&z=14&output=embed`}
            className="border-0"
          />
        </div>
      </div>
    </div>
  );
};

export default ProviderContact;
