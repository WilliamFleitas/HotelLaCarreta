import React, { useState, useEffect} from "react";

const SearchByDate = () => {
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [adults, setAdults] = useState(0);
	const [children, setChildren] = useState(0);
	
	const handleStartDateChange = (date: Date) => {
		setStartDate(date);
	};
	
	const handleEndDateChange = (date: Date) => {
		setEndDate(date);
	};


	
	return (
		<div>
			<div>
				<div>
					<div >
						<p>Check-in</p>
					</div>
					<div>
					{/* <TextField
						id="date"
						label="Birthday"
						type="date"
						defaultValue="2017-05-24"
						sx={{ width: 220 }}
						InputLabelProps={{
							shrink: true,
						}}
					/> */}
					</div>
				</div>
				<div>
					<div>
						<p>Check-out</p>
					</div>
					<div>
						{/* <DatePicker
							selected={endDate}
							onChange={handleEndDateChange}
							withPortal
						/> */}
					</div>
				</div>
				<div>
					<button>
						Buscar
					</button>
				</div>
			</div>
		</div>
	);
};

export default SearchByDate;