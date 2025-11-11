// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChipInput from "@/components/ui/ChipInput";
import SingleSelectChipInput from "@/components/ui/DropdownInput";
import FileUpload from "@/components/ui/FileUpload";
import ItemPreview from "./itemPreview";
import Button from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ConfirmDialog";

const CreateItem = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		name: "",
		brand: "",
		type: "",
		image: [],
		price: "",
		location: "",
		availability: "available",
		features: [],
		discount: "",
	});

	const [brands, setBrands] = useState([]);
	const [types, setTypes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [dialogOpen, setDialogOpen] = useState(false);

	const vietnamCities = [
		"Hà Nội",
		"TP. Hồ Chí Minh",
		"Đà Nẵng",
		"Hải Phòng",
		"Cần Thơ",
		"Nha Trang",
		"Huế",
		"Đà Lạt",
		"Vũng Tàu",
		"Quảng Ninh",
		"Bình Dương",
		"Biên Hòa",
	];

	const topFeatures = [
		"Lightweight",
		"Compact",
		"Durable",
		"Water-resistant",
		"Fast boiling",
		"Ultralight",
		"Easy setup",
		"Ventilated back",
		"Warm",
		"USB rechargeable",
		"Portable",
		"2-person",
		"4-person",
		"Eco-friendly",
		"Insulated",
		"Water purifier",
		"Fast flow",
		"Fuel efficient",
		"1L capacity",
		"Compact pack",
	];

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [brandsRes, typesRes] = await Promise.all([
					fetch(`https://campgear-rental.onrender.com/api/brands`),
					fetch(`https://campgear-rental.onrender.com/api/types`),
				]);
				if (!brandsRes.ok || !typesRes.ok)
					throw new Error("Failed to fetch data");
				const [brandsData, typesData] = await Promise.all([
					brandsRes.json(),
					typesRes.json(),
				]);
				setBrands(brandsData);
				setTypes(typesData);
			} catch (err) {
				console.error("Error loading brand/type lists:", err);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleFileChange = (files) => {
		const urls = Array.from(files).map((file) => URL.createObjectURL(file));
		setFormData({ ...formData, image: urls });
	};

	const handleSubmit = async () => {
		try {
			const payload = { ...formData, image: [] }; // exclude images
			const res = await fetch(
				"https://campgear-rental.onrender.com/api/equipment",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(payload),
				},
			);

			if (!res.ok) throw new Error("Failed to create item");

			// show confirm dialog
			setDialogOpen(true);
		} catch (err) {
			console.error(err);
			alert("Error creating item");
		}
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-[50vh] text-gray-500">
				Loading form data...
			</div>
		);
	}

	return (
		<div className="max-w-6xl mx-auto my-10 grid grid-cols-2 gap-10">
			{/* Form Column */}
			<div className="bg-white shadow-md rounded-2xl p-6 border border-green-900/10">
				<h2 className="text-2xl font-semibold mb-6 text-center text-[#052E16]">
					Create New Item
				</h2>
				<div className="space-y-5">
					{/* Name */}
					<div>
						<label className="block text-gray-700 font-medium mb-1">Name</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							placeholder="Enter product name"
							className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#052E16] focus:border-[#052E16] outline-none"
						/>
					</div>

					{/* Brand */}
					<div>
						<label className="block text-gray-700 font-medium mb-1">
							Brand
						</label>
						<SingleSelectChipInput
							suggestions={brands}
							value={formData.brand}
							onChange={(val) => setFormData({ ...formData, brand: val })}
							placeholder="Select a brand"
						/>
					</div>

					{/* Type */}
					<div>
						<label className="block text-gray-700 font-medium mb-1">Type</label>
						<SingleSelectChipInput
							suggestions={types}
							value={formData.type}
							onChange={(val) => setFormData({ ...formData, type: val })}
							placeholder="Select a type"
						/>
					</div>

					{/* Images */}
					<div>
						<label className="block text-gray-700 font-medium mb-1">
							Upload Images
						</label>
						<FileUpload files={formData.image} onChange={handleFileChange} />
					</div>

					{/* Location */}
					<div>
						<label className="block text-gray-700 font-medium mb-1">
							Location
						</label>
						<select
							name="location"
							value={formData.location}
							onChange={handleChange}
							className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-[#052E16] focus:border-[#052E16] outline-none"
						>
							<option value="">Select a city</option>
							{vietnamCities.map((city) => (
								<option key={city} value={city}>
									{city}
								</option>
							))}
						</select>
					</div>

					{/* Features */}
					<div>
						<label className="block text-gray-700 font-medium mb-1">
							Features
						</label>
						<ChipInput
							suggestions={topFeatures}
							value={formData.features}
							onChange={(newFeatures) =>
								setFormData({ ...formData, features: newFeatures })
							}
						/>
					</div>

					{/* Price */}
					<div>
						<label className="block text-gray-700 font-medium mb-1">
							Price (VND)
						</label>
						<input
							type="number"
							name="price"
							value={formData.price}
							onChange={handleChange}
							className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#052E16] focus:border-[#052E16] outline-none"
							placeholder="Enter price"
						/>
					</div>

					{/* Availability */}
					<div>
						<label className="block text-gray-700 font-medium mb-1">
							Availability
						</label>
						<select
							name="availability"
							value={formData.availability}
							onChange={handleChange}
							className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-[#052E16] focus:border-[#052E16] outline-none"
						>
							<option value="available">Available</option>
							<option value="unavailable">Unavailable</option>
						</select>
					</div>

					{/* Buttons */}
					<div className="pt-4 flex gap-3">
						<Button onClick={handleSubmit}>Create Item</Button>
						<Button
							variant="outline"
							onClick={() => navigate("/admin-dashboard")}
						>
							Back to Dashboard
						</Button>
					</div>
				</div>
			</div>

			{/* Preview Column */}
			<ItemPreview formData={formData} />

			{/* Confirm Dialog */}
			<ConfirmDialog
				open={dialogOpen}
				onOpenChange={setDialogOpen}
				title="Item Created!"
				description="Your item has been successfully added to the inventory."
				onConfirm={() => navigate("/admin-dashboard")}
			/>
		</div>
	);
};

export default CreateItem;
