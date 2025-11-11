// @ts-nocheck
import React, { useState, useEffect } from "react";
import FilterPanel from "./components/FilterPanel";
import EquipmentGrid from "./components/EquipmentGrid";
import QuickViewModal from "./components/QuickViewModal";
import Button from "../../components/ui/Button";
import HeroSection from "./components/HeroSection";
import { useNavigate, useLocation } from "react-router-dom";

const EquipmentCatalog = ({ cartCount, setCartCount, setCartItems }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const initialCategory = searchParams.get("category") || "";
	const [filters, setFilters] = useState({
		categories: initialCategory ? [initialCategory] : [],
		brands: [],
		location: "",
		priceRange: [0, 200000],
		sortBy: "relevance",
	});

	const [allEquipment, setAllEquipment] = useState([]);
	const [equipment, setEquipment] = useState([]);
	const [loading, setLoading] = useState(true);
	const [hasMore, setHasMore] = useState(true);
	const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
	const [selectedEquipment, setSelectedEquipment] = useState(null);
	const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

	const [searchTerm, setSearchTerm] = useState(
		new URLSearchParams(location.search).get("search") || "",
	);

	useEffect(() => {
		const user = localStorage.getItem("user");
		if (user) {
			const parsedUser = JSON.parse(user);
			if (parsedUser.role !== "user") navigate("/login", { replace: true });
		} else {
			navigate("/login", { replace: true });
		}
	}, []);

	useEffect(() => {
		const fetchEquipment = async () => {
			try {
				setLoading(true);
				const res = await fetch(
					"https://campgear-rental.onrender.com/api/equipment",
				);
				if (!res.ok) throw new Error("Failed to fetch equipment");
				const data = await res.json();
				setAllEquipment(data);
				setEquipment(data);
			} catch (err) {
				console.error("Error fetching equipment:", err);
			} finally {
				setLoading(false);
			}
		};
		fetchEquipment();
	}, []);

	useEffect(() => {
		if (!allEquipment.length) return;

		setLoading(true);
		const timer = setTimeout(() => {
			const normalizeCategory = (str) =>
				str?.toLowerCase().replace(/\s+/g, "") || "";
			const normalizeBrand = (str) =>
				str?.toLowerCase().replace(/[^a-z0-9]/g, "") || "";

			let filtered = [...allEquipment];

			// 🔍 Search
			if (searchTerm.trim() !== "") {
				filtered = filtered.filter((item) =>
					item.name?.toLowerCase().includes(searchTerm.toLowerCase()),
				);
			}

			if (filters.location) {
				filtered = filtered.filter((item) =>
					item.location?.toLowerCase().includes(filters.location.toLowerCase()),
				);
			}

			filtered = filtered.filter(
				(item) =>
					item.price >= filters.priceRange[0] &&
					item.price <= filters.priceRange[1],
			);

			if (filters.categories?.length > 0) {
				filtered = filtered.filter((item) =>
					filters.categories.includes(normalizeCategory(item.type)),
				);
			}

			if (filters.brands?.length > 0) {
				filtered = filtered.filter((item) =>
					filters.brands.includes(normalizeBrand(item.brand)),
				);
			}

			// 🔢 Sort
			switch (filters.sortBy) {
				case "price_low":
					filtered.sort((a, b) => a.price - b.price);
					break;
				case "price_high":
					filtered.sort((a, b) => b.price - a.price);
					break;
				case "rating":
					filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
					break;
				default:
					break;
			}

			setEquipment(filtered);
			setLoading(false);
		}, 200);

		return () => clearTimeout(timer);
	}, [filters, searchTerm, allEquipment]);

	const handleFiltersChange = (newFilters) => setFilters(newFilters);

	const handleAddToCart = (item) => {
		setCartItems((prev) => {
			const existing = prev.find((i) => i.id === item.id);
			if (existing) {
				return prev.map((i) =>
					i.id === item.id
						? {
								...i,
								quantity: i.quantity + 1,
								orderPrice: (i.quantity + 1) * i.productPrice,
							}
						: i,
				);
			} else {
				const today = new Date();
				const tomorrow = new Date(today);
				tomorrow.setDate(today.getDate() + 1);
				setCartCount((c) => c + 1);
				return [
					...prev,
					{
						...item,
						productPrice: item.price,
						quantity: 1,
						orderPrice: item.price,
						startDate: today.toISOString().split("T")[0],
						endDate: tomorrow.toISOString().split("T")[0],
					},
				];
			}
		});
	};

	const handleQuickView = (item) => {
		setSelectedEquipment(item);
		setIsQuickViewOpen(true);
	};

	const toggleMobileFilter = () => setIsMobileFilterOpen((prev) => !prev);
	const handleSearch = () => {
		const filtered = allEquipment.filter((item) =>
			item.name?.toLowerCase().includes(searchTerm.toLowerCase()),
		);
		setEquipment(filtered);
	};

	return (
		<div className="min-h-screen bg-background">
			<main>
				<HeroSection
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					onSearch={handleSearch}
				/>

				<section className="container mx-auto px-4 py-8">
					<div className="flex gap-8">
						<FilterPanel
							products={allEquipment}
							filters={filters}
							onFiltersChange={handleFiltersChange}
							isOpen={isMobileFilterOpen}
							onToggle={toggleMobileFilter}
						/>

						<div className="flex-1 space-y-6">
							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<FilterPanel
										products={allEquipment}
										filters={filters}
										onFiltersChange={handleFiltersChange}
										isOpen={isMobileFilterOpen}
										onToggle={toggleMobileFilter}
										isMobile={true}
									/>
									<h2 className="font-heading font-semibold text-xl text-foreground">
										Camping Equipment
									</h2>
								</div>

								<div className="hidden sm:flex items-center space-x-2">
									<Button variant="ghost" size="sm" iconName="Grid3X3">
										Grid
									</Button>
									<Button variant="ghost" size="sm" iconName="List">
										List
									</Button>
								</div>
							</div>
							<h3 className="text-lg font-medium ">
								{filters.categories.length > 0
									? `All ${filters.categories
											.map((c) => c.charAt(0).toUpperCase() + c.slice(1))
											.join(", ")} Items`
									: "All Equipment"}
							</h3>

							<EquipmentGrid
								equipment={equipment}
								loading={loading}
								onAddToCart={handleAddToCart}
								onQuickView={handleQuickView}
								hasMore={hasMore}
								onLoadMore={() => setHasMore(false)}
							/>
						</div>
					</div>
				</section>
			</main>

			<QuickViewModal
				equipment={selectedEquipment}
				isOpen={isQuickViewOpen}
				onClose={() => setIsQuickViewOpen(false)}
				onAddToCart={handleAddToCart}
			/>
		</div>
	);
};

export default EquipmentCatalog;
