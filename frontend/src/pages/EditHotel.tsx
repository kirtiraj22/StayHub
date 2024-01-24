import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";

const EditHotel = () => {
	// get hotel id from URL
	const { hotelId } = useParams();

	const { data: hotel } = useQuery(
		"fetchMyHotelId",
		() => apiClient.fetchMyHotelById(hotelId || ""),
		{
			enabled: !!hotelId,
		}
	);

	return <ManageHotelForm hotel={hotel} />;
};

export default EditHotel;
