import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const TrustPanel = () => {
  const securityFeatures = [
    {
      icon: "Shield",
      title: "Bảo mật SSL",
      description: "Thông tin của bạn được mã hóa và bảo vệ an toàn",
    },
    {
      icon: "Lock",
      title: "Xác thực 2 lớp",
      description: "Tăng cường bảo mật với xác thực đa yếu tố",
    },
    {
      icon: "CheckCircle",
      title: "Đã xác minh",
      description: "Nền tảng được chứng nhận bởi các tổ chức uy tín",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Trần Minh Hoàng",
      role: "Nhà tổ chức tour",
      avatar: "https://images.unsplash.com/photo-1708946697661-5fc2d94a533a",
      avatarAlt:
        "Professional headshot of Vietnamese man with glasses and friendly smile in business attire",
      content:
        "CampGear đã giúp tôi tổ chức nhiều chuyến cắm trại thành công. Thiết bị chất lượng cao và dịch vụ tuyệt vời.",
      rating: 5,
    },
    {
      id: 2,
      name: "Lê Thị Mai",
      role: "Người đam mê cắm trại",
      avatar: "https://images.unsplash.com/photo-1668049221564-862149a48e10",
      avatarAlt:
        "Professional headshot of Vietnamese woman with long black hair and warm smile",
      content:
        "Lần đầu cắm trại nhưng nhờ có CampGear mà tôi có trải nghiệm tuyệt vời. Thiết bị đầy đủ và hướng dẫn chi tiết.",
      rating: 5,
    },
  ];

  const certifications = [
    {
      name: "Chứng nhận ISO 27001",
      logo: "https://images.unsplash.com/photo-1732039551453-93de98a1b7dc",
      logoAlt:
        "ISO 27001 security certification badge with blue and white design",
    },
    {
      name: "Bộ Công Thương",
      logo: "https://images.unsplash.com/photo-1616101001234-7320af4f1aa7",
      logoAlt:
        "Vietnamese Ministry of Industry and Trade official certification seal",
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={
          index < rating ? "text-warning fill-current" : "text-muted-foreground"
        }
      />
    ));
  };

  return (
    <div className="hidden lg:block w-full max-w-md">
      <div className="bg-card rounded-lg shadow-card p-6 space-y-6">
        {/* Security Features */}
        <div>
          <h3 className="font-heading font-semibold text-foreground mb-4">
            Bảo mật & An toàn
          </h3>
          <div className="space-y-3">
            {securityFeatures?.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon
                    name={feature?.icon}
                    size={16}
                    className="text-primary"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground">
                    {feature?.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {feature?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <h3 className="font-heading font-semibold text-foreground mb-4">
            Khách hàng nói gì
          </h3>
          <div className="space-y-4">
            {testimonials?.map((testimonial) => (
              <div key={testimonial?.id} className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonial?.avatar}
                      alt={testimonial?.avatarAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {testimonial?.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {testimonial?.role}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {renderStars(testimonial?.rating)}
                  </div>
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  "{testimonial?.content}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="font-heading font-semibold text-foreground mb-4">
            Chứng nhận
          </h3>
          <div className="flex items-center space-x-4">
            {certifications?.map((cert, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded overflow-hidden">
                  <Image
                    src={cert?.logo}
                    alt={cert?.logoAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  {cert?.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Support Info */}
        <div className="bg-primary/5 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Headphones" size={16} className="text-primary" />
            <h4 className="text-sm font-medium text-foreground">Hỗ trợ 24/7</h4>
          </div>
          <p className="text-xs text-muted-foreground">
            Đội ngũ hỗ trợ khách hàng luôn sẵn sàng giúp đỡ bạn mọi lúc, mọi
            nơi.
          </p>
          <div className="mt-3 flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Phone" size={12} />
              <span>1900-CAMP</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Mail" size={12} />
              <span>support@campgear.vn</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustPanel;
