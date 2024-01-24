import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {
	const { data: hotelData } = useQuery(
		"fetchMyHotels",
		apiClient.fetchMyHotels,
		{
			onError: () => {},
		}
	);

	if (!hotelData) {
		return <span>No Hotels Found!</span>;
	}
	return (
		<div className="space-y-5">
			<span className="flex justify-between">
				<h1 className="text-3xl font-bold">My Hotels</h1>
				<Link
					to="/add-hotel"
					className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500 rounded-md"
				>
					Add Hotel
				</Link>
			</span>
			<div className="grid grid-cols-1 gap-8">
				{hotelData.map((hotel, index) => (
					<div
						className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
						key={index}
					>
						<h2 className="text-2xl font-bold">{hotel.name}</h2>
						<div className="whitespace-pre-line">
							{hotel.description}
						</div>
						<div className="grid md:grid-cols-5 gap-2 grid-cols-2">
							<div className="border border-slate-300 rounded-sm p-3 flex items-center">
								<BsMap className="mr-2" />
								{hotel.city}, {hotel.country}
							</div>
							<div className="border border-slate-300 rounded-sm p-3 flex items-center">
								<BsBuilding className="mr-2" />
								{hotel.type}
							</div>
							<div className="border border-slate-300 rounded-sm p-3 flex items-center">
								<BiMoney className="mr-2" />₹
								{hotel.pricePerNight} per night
							</div>
							<div className="border border-slate-300 rounded-sm p-3 flex items-center">
								<BiHotel className="mr-2" />
								{hotel.adultCount} adults, {hotel.childCount}{" "}
								children
							</div>
							<div className="border border-slate-300 rounded-sm p-3 flex items-center">
								<BiStar className="mr-2" />
								{hotel.starRating} Star Rating
							</div>
						</div>
						<span className="flex justify-end">
							<Link
								to={`/edit-hotel/${hotel._id}`}
								className="flex bg-blue-600 text-white text-l font-semibold p-2 hover:bg-blue-500 rounded-sm hover:rounded-lg"
							>
								View Details
							</Link>
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default MyHotels;