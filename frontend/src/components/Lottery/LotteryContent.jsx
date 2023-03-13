import React from 'react';
import Ticket from './Ticket';

const LotteryContent = ({ tickets }) => {
	const creditBalance = 100;
	// handle buy ticket
	const handleBuy = (id, price, onCloseModal) => {
		console.log(id, price);
	};
	return (
		<div className='grid  grid-cols-12  gap-8 mb-10'>
			{tickets.map((ticket, i) => {
				return (
					<Ticket
						key={i}
						ticket={ticket}
						handleBuy={handleBuy}
						userBalance={creditBalance}
					/>
				);
			})}
		</div>
	);
};

export default LotteryContent;
