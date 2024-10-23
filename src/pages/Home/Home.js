import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import VanRow from "../../components/VanRow/VanRow.js";
import "./styles.css";

const Home = () => {
	console.log("home component rendered");
	const [rentals, setRentals] = useState([
		{
			id: 1,
			number: "Rental 1",
			van: "Van 1",
			start: "2023-10-01",
			end: "2023-10-05",
		},
		{
			id: 2,
			number: "Rental 2",
			van: "Van 2",
			start: "2023-10-03",
			end: "2023-10-10",
		},
		{
			id: 3,
			number: "Rental 3",
			van: "Van 3",
			start: "2023-10-05",
			end: "2023-10-07",
		},
		{
			id: 4,
			number: "Rental 4",
			van: "Van 4",
			start: "2023-10-08",
			end: "2023-10-12",
		},
		{
			id: 5,
			number: "Rental 5",
			van: "Van 5",
			start: "2023-10-10",
			end: "2023-10-15",
		},
		{
			id: 6,
			number: "Rental 6",
			van: "Van 9",
			start: "2023-10-12",
			end: "2023-10-20",
		},
	]);

	const vans = [
		"Van 1",
		"Van 2",
		"Van 3",
		"Van 4",
		"Van 5",
		"Van 6",
		"Van 7",
		"Van 8",
		"Van 9",
		"Van 10",
	];

	const moveRental = (rentalId, newVan) => {
		setRentals((prevRentals) => {
			const updatedRentals = prevRentals.map((r) =>
				r.id === rentalId ? { ...r, van: newVan } : r
			);
			console.log(updatedRentals);
			return updatedRentals;
		});
	};

	const generateDates = () => {
		const dates = [];
		const today = new Date();
		for (let i = 0; i < 31; i++) {
			const date = new Date(today);
			date.setDate(today.getDate() + i);
			dates.push(date);
		}
		return dates;
	};

	const formatDate = (date) => {
		return date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
		});
	};

	const dates = generateDates();


  function apiCall() {
    window.api.getPrivateData();
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="schedule">
        <div className='topbar'>
          <div className='corner'></div>
          <div className="header">

            {dates.map((date, index) => (
              <div key={index} className="header-cell">{formatDate(date)}</div>
            ))}
          </div>
        </div>
        {vans.map((van, index) => (
          <VanRow key={index} van={van} rentals={rentals} moveRental={moveRental} />
        ))}
      </div>
      <button onClick={apiCall}>API CALL</button>
    </DndProvider>
  );
}



export default Home;