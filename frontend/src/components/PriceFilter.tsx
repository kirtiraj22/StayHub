type Props = {
	selectedPrice?: number;
	onChange: (value?: number) => void;
};

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
	return (
		<div>
			<h4 className="text-md font-semibold mb-2 focus:border-none">
				Max price
			</h4>
			<select
				className="p-2 border rounded-md w-full"
				value={selectedPrice}
				onChange={(event) =>
					onChange(
						event.target.value
							? parseInt(event.target.value)
							: undefined
					)
				}
			>
				<option value="">Select Max Price</option>
				{maxPrices.map((price) => (
					<option value={price}>{price}</option>
				))}
			</select>
		</div>
	);
};

const maxPrices = [500, 1000, 2000, 5000, 10000, 20000, 30000];

export default PriceFilter;
