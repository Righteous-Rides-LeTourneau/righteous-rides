import React from 'react';
import { useDrag } from 'react-dnd';
import './styles.css'

const  Rental = ({ rental }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'rental',
    item: { id: rental.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  //calculate time used for width
  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const duration = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1; // Duration in days
    return duration;
  };

  const calculateStartDay = (start) => {
    const [year, month, day] = start.split('-').map(Number);
    const startDate = new Date(year, month - 1, day); // month is 0-indexed
    console.log(start);
    console.log(startDate.getDate());
    return startDate.getDate();
  };

  const duration = calculateDuration(rental.start, rental.end);
  const startDay = calculateStartDay(rental.start);

  return (
    <div
      ref={drag}
      className="rental"
      style={{
        opacity: isDragging ? 0.5 : 1,
        gridColumnStart: startDay,
        gridColumnEnd: `span ${duration}`,
      }}
    >
      {rental.number}
    </div>
  );
}

export default Rental;