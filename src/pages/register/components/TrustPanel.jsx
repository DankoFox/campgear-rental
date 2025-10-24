import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const TrustPanel = () => {
  const benefits = [
    {
      icon: "Shield",
      title: "Bảo mật tuyệt đối",
      description:
        "Thông tin cá nhân được mã hóa và bảo vệ theo tiêu chuẩn quốc tế",
    },
    {
      icon: "Users",
      title: "Cộng đồng tin cậy",
      description:
        "Hơn 10,000 thành viên đã tin tưởng và sử dụng dịch vụ của chúng tôi",
    },
    {
      icon: "Award",
      title: "Chất lượng đảm bảo",
      description: "Tất cả thiết bị được kiểm tra kỹ lưỡng trước khi cho thuê",
    },
    {
      icon: "Headphones",
      title: "Hỗ trợ 24/7",
      description: "Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ bạn",
    },
  ];

  const certifications = [
    {
      name: "Chứng nhận ISO 27001",
      image: "https://images.unsplash.com/photo-1732039551453-93de98a1b7dc",
      alt: "ISO 27001 security certification badge with blue and white design",
    },
    {
      name: "Bộ Công Thương",
      image: "https://images.unsplash.com/photo-1715173679369-18006e84d6a8",
      alt: "Vietnamese Ministry of Industry and Trade certification seal with red and gold colors",
    },
    {
      name: "Thương mại điện tử",
      image: "https://images.unsplash.com/photo-1603899122406-e7eb957f9fd6",
      alt: "E-commerce certification badge with green checkmark and digital commerce symbols",
    },
  ];

  const testimonials = [
    {
      name: "Nguyễn Minh Anh",
      role: "Người thuê thiết bị",
      content:
        "Dịch vụ tuyệt vời! Thiết bị chất lượng cao và quy trình thuê rất đơn giản.",
      avatar: "https://images.unsplash.com/photo-1633058851383-689248101803",
      avatarAlt:
        "Professional headshot of Vietnamese woman with shoulder-length black hair smiling warmly",
      rating: 5,
    },
    {
      name: "Trần Văn Hùng",
      role: "Nhà cung cấp thiết bị",
      content:
        "Nền tảng giúp tôi quản lý kinh doanh hiệu quả và tiếp cận nhiều khách hàng hơn.",
      avatar: "https://images.unsplash.com/photo-1708946697595-89931282824c",
      avatarAlt:
        "Professional headshot of Vietnamese man with short black hair in casual shirt",
      rating: 5,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Mountain" size={32} className="text-primary" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
          Chào mừng đến với CampGear
        </h2>
        <p className="text-muted-foreground">
          Nền tảng cho thuê thiết bị cắm trại hàng đầu Việt Nam
        </p>
      </div>
      {/* Benefits */}
      <div className="space-y-6">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Tại sao chọn CampGear?
        </h3>
        <div className="space-y-4">
          {benefits?.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={benefit?.icon} size={20} className="text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">
                  {benefit?.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {benefit?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Security Certifications */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Chứng nhận & Bảo mật
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {certifications?.map((cert, index) => (
            <div key={index} className="text-center">
              <div className="w-full h-16 bg-muted rounded-lg overflow-hidden mb-2">
                <Image
                  src={cert?.image}
                  alt={cert?.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-muted-foreground">{cert?.name}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Customer Testimonials */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Khách hàng nói gì?
        </h3>
        <div className="space-y-4">
          {testimonials?.map((testimonial, index) => (
            <div key={index} className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={testimonial?.avatar}
                    alt={testimonial?.avatarAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm">
                    {testimonial?.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {testimonial?.role}
                  </p>
                </div>
              </div>
              <p className="text-sm text-foreground mb-2">
                "{testimonial?.content}"
              </p>
              <div className="flex items-center space-x-1">
                {[...Array(testimonial?.rating)]?.map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={12}
                    className="text-accent fill-current"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Contact Support */}
      <div className="bg-primary/5 rounded-lg p-4 text-center">
        <Icon
          name="MessageCircle"
          size={24}
          className="text-primary mx-auto mb-2"
        />
        <h4 className="font-medium text-foreground mb-1">Cần hỗ trợ?</h4>
        <p className="text-sm text-muted-foreground mb-3">
          Liên hệ với chúng tôi qua hotline hoặc chat trực tuyến
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <Icon name="Phone" size={14} className="text-primary" />
            <span className="text-foreground">1900 1234</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Mail" size={14} className="text-primary" />
            <span className="text-foreground">support@campgear.vn</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustPanel;
