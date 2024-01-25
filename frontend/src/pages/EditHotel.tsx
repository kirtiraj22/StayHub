import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";

const EditHotel = () => {
	// get hotel id from URL
	const { hotelId } = useParams();
	const { showToast } = useAppContext();
	const { data: hotel } = useQuery(
		"fetchMyHotelId",
		() => apiClient.fetchMyHotelById(hotelId || ""),
		{
			enabled: !!hotelId,
		}
	);

	const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
		onSuccess: () => {
			showToast({ message: "Hotel Saved", type: "SUCCESS" });
		},
		onError: () => {
			showToast({
				message: "Error Saving Hotel",
				type: "ERROR",
			});
		},
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
