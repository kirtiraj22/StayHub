import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
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

	const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
		onSuccess: () => {},
		onError: () => {},
	});

	const handleSave = (hotelFormData: FormData) => {
		mutate(hotelFormData);
	};

	return (
		<ManageHotelForm
			hotel={hotel}
			onSave={handleSave}
			isLoading={isLoading}
		/>
	);
};

export default EditHotel;
