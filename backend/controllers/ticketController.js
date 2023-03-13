const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const Usdx = require('../models/usdxModel');

const Ticket = require('../models/ticketModel');
const LuckyBox = require('../models/luckyBoxModel');
const Draw = require('../models/drawModel');
const createTransaction = require('../utils/tnx');

const Company = require('../models/companyModel');
const companyId = process.env.COMPANY_ID;

// create some tickets function
exports.createTickets = catchAsyncErrors(async (req, res, next) => {
	const { price, prize, qty } = req.body;

	// find tickets length
	const allTickets = await Ticket.find();
	const ticketsLength = allTickets.length;

	const tickets = [];

	// create tickets
	for (let i = 0; i < qty; i++) {
		// generate ticket uniq number
		const ticketNumber = Math.floor(1000000 + Math.random() * 9000000);

		// serial number
		const serialNumber = ticketsLength + i + 1;

		// check if ticket number already exists
		const ticket = await Ticket.findOne({ ticketNumber });
		if (ticket) {
			// if ticket number already exists, generate new one
			i--;
			continue;
		}

		const newTicket = {
			serialNumber,
			ticketNumber: ticketNumber,
			price: price,
			firstPrize: prize,
			nextDrawDate: new Date(),
			nextDrawTime: '12:00 AM',
		};
		tickets.push(newTicket);
	}

	if (tickets.length > 0) {
		await Ticket.create(tickets);
		res.status(201).json({
			status: 'success',
			message: 'Tickets created successfully',
		});
	}
});

// raffle draw with all tickets
exports.raffleDraw = catchAsyncErrors(async (req, res, next) => {
	const { position, prize } = req.body;
	if (!position || !prize) {
	}

	const tickets = await Ticket.find();
	if (!tickets) {
		return next(new ErrorHander('No tickets found', 404));
	}
	let winnerNumber = tickets[Math.floor(Math.random() * tickets.length)];
	winnerNumber = winnerNumber.ticketNumber;

	const winner = await Ticket.findOne({ ticketNumber: winnerNumber });
	if (!winner) {
		return next(new ErrorHander('No winner found', 404));
	}
	winner.status = 'winner';
	winner.isWinner = true;
	winner.position = position;
	winner.prize = prize;
	winner.drawDate = new Date();
	await winner.save();
	res.status(200).json({
		success: true,
		message: 'Winner number generated',
		winnerNumber: winnerNumber,
	});
});

// generate winners 1st to 20th
exports.generateWinners = catchAsyncErrors(async (req, res, next) => {
	const tickets = await Ticket.find();
	if (!tickets) {
		return next(new ErrorHander('No tickets found', 404));
	}
	const winners = [];
	for (let i = 0; i < 20; i++) {
		let winnerNumber = tickets[Math.floor(Math.random() * tickets.length)];
		winnerNumber = winnerNumber.ticketNumber;
		const winner = await Ticket.findOne({ ticketNumber: winnerNumber });
		if (!winner) {
			i--;
			continue;
		}
		winner.status = 'winner';
		winner.isWinner = true;
		winner.drawDate = new Date();
		await winner.save();
		// find 1st winner
		if (i === 0) {
			winner.isFirstWinner = true;
			await winner.save();
		}
		// 2nd winner
		if (i === 1) {
			winner.isSecondWinner = true;
			await winner.save();
		}
		winners.push(winner);
	}
});

// generate 10 winners with position 1st to 5th
exports.generate10Winners = catchAsyncErrors(async (req, res, next) => {
	const tickets = await Ticket.find();
	if (!tickets) {
		return next(new ErrorHander('No tickets found', 404));
	}
	const winners = [];
	for (let i = 0; i < 10; i++) {
		let winnerNumber = tickets[Math.floor(Math.random() * tickets.length)];
		winnerNumber = winnerNumber.ticketNumber;
		const winner = await Ticket.findOne({ ticketNumber: winnerNumber });
		if (!winner) {
			i--;
			continue;
		}
		winner.status = 'winner';
		winner.isWinner = true;
		winner.drawDate = new Date();
		await winner.save();
		// find 1st winner
		if (i === 0) {
			winner.winnerPosition = 1;
			await winner.save();
		}
		// 2nd winner
		if (i === 1) {
			winner.winnerPosition = 2;
			await winner.save();
		}
		// 3rd winner
		if (i === 2) {
			winner.winnerPosition = 3;
			await winner.save();
		}
		// 4th winner
		if (i === 3) {
			winner.winnerPosition = 4;
			await winner.save();
		}
		// 5th winner
		if (i === 4) {
			winner.winnerPosition = 5;
			await winner.save();
		}
		winners.push(winner);
	}
	res.status(200).json({
		success: true,
		message: '10 winners generated',
		winners: winners,
	});
});

// get tickets with limit and skip
exports.getTickets = catchAsyncErrors(async (req, res, next) => {
	const { limit, skip } = req.query;
	let numLimit = parseInt(limit);
	const tickets = await Ticket.find({ isSold: 'pending' })
		.skip(skip)
		.limit(numLimit);
	if (!tickets) {
		return next(new ErrorHander('No tickets found', 404));
	}
	const length = tickets.length;
	res.status(200).json({
		success: true,
		message: 'Tickets fetched',
		length: length,
		tickets: tickets,
	});
});

//=====================================================
//===================== BUY TICKETS ========================
exports.buyTicket = catchAsyncErrors(async (req, res, next) => {
	const ticketId = req.params.id;

	const ticket = await Ticket.findById(ticketId);
	if (!ticket) {
		return next(new ErrorHander('No ticket found', 404));
	}

	// check if ticket is already sold
	if (ticket.status === 'sold') {
		return next(new ErrorHander('Ticket already sold', 400));
	}

	// find Company by CompanyId
	const admin = await Company.findById(companyId);
	if (!admin) {
		return next(new ErrorHander('No company found', 404));
	}

	const user = await User.findOne({ _id: req.user._id });
	if (!user) {
		return next(new ErrorHander('No user found', 404));
	}

	// find usdx by userId
	const usdx = await Usdx.findOne({ user_id: req.user._id });
	if (!usdx) {
		return next(new ErrorHander('No usdx found', 404));
	}

	// check if user has enough usdx balance
	if (usdx.usdx_balance < ticket.price) {
		return next(new ErrorHander('Insufficient usdx balance', 400));
	}

	// update usdx balance
	usdx.usdx_balance = usdx.usdx_balance - ticket.price;
	createTransaction(
		user._id,
		'cashOut',
		ticket.price,
		'Buy Ticket ',
		`Buy Ticket ${ticket.ticketNumber}`
	);
	await usdx.save();

	// next draw date = current date at 12:00 am
	const nextDrawDate = new Date();
	nextDrawDate.setHours(0, 0, 0, 0);
	nextDrawDate.setDate(nextDrawDate.getDate() + 1);

	// user credit balance - ticket price
	user.lottery.total_lottery += 1;

	ticket.status = 'sold';
	ticket.isSold = 'sold';
	ticket.buyDate = new Date();
	ticket.nextDrawDate = nextDrawDate;
	ticket.owner = user._id;
	ticket.ownerName = user.name;
	await ticket.save();

	await user.save();

	// update admin lottery details
	admin.lottery.totalSellCount += 1;
	admin.lottery.totalSellAmount += ticket.price;
	admin.lottery.toDaySellCount += 1;
	admin.lottery.toDaySellAmount += ticket.price;
	await admin.save();

	res.status(200).json({
		success: true,
		message: 'Buy a ticket successfully',
		ticket: ticket,
	});
});

// get logged in user tickets
exports.getUserTickets = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findOne({ _id: req.user._id });
	if (!user) {
		return next(new ErrorHander('No user found', 404));
	}
	const tickets = await Ticket.find({ owner: user._id });
	if (!tickets) {
		return next(new ErrorHander('No tickets found', 404));
	}
	res.status(200).json({
		success: true,
		message: 'User tickets fetched',
		tickets: tickets,
	});
});

// get logged in user lucky boxes
exports.getUserLuckyBoxes = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findOne({ _id: req.user._id });
	if (!user) {
		return next(new ErrorHander('No user found', 404));
	}
	const luckyBoxes = await LuckyBox.find({ luckyUser: user._id });
	if (!luckyBoxes) {
		return next(new ErrorHander('No lucky boxes found', 404));
	}
	// check isOpen is true
	const luckyBoxesOpen = luckyBoxes.filter((luckyBox) => {
		return luckyBox.isOpen;
	});
	// not isOpen lucky boxes
	const luckyBoxesNotOpen = luckyBoxes.filter((luckyBox) => {
		return !luckyBox.isOpen;
	});

	res.status(200).json({
		success: true,
		message: 'User lucky boxes fetched',
		luckyBoxes: luckyBoxesNotOpen,
	});
});

// open lucky box
exports.openLuckyBox = catchAsyncErrors(async (req, res, next) => {
	const luckyBoxId = req.params.id;

	const luckyBox = await LuckyBox.findById(luckyBoxId);
	if (!luckyBox) {
		return next(new ErrorHander('No lucky box found', 404));
	}

	// check if lucky box is already opened
	if (luckyBox.isOpen === true) {
		return next(new ErrorHander('Lucky box already opened', 400));
	}

	const luckyUser = await User.findById(luckyBox.luckyUser);
	if (!luckyUser) {
		return next(new ErrorHander('No user found', 404));
	}
	luckyUser.incomeBalance += luckyBox.luckyAmount;
	luckyUser.lotteryBalance += luckyBox.luckyAmount;
	luckyUser.luckyBoxCount -= 1;
	await luckyUser.save();

	luckyBox.isOpen = true;
	luckyBox.status = 'open';
	await luckyBox.save();

	createTransaction(
		luckyUser._id,
		'cashIn',
		luckyBox.luckyAmount,
		`Win Lucky Box ${luckyBox.luckyAmount}`
	);
	res.status(200).json({
		success: true,
		message: 'Lucky box opened',
	});
});

// find tickets by draw date
exports.findTicketsByDrawDate = catchAsyncErrors(async (req, res, next) => {
	const { drawDate } = req.query;
	const tickets = await Ticket.find({ drawDate: { $gte: drawDate } });
	if (!tickets) {
		return next(new ErrorHander('No tickets found', 404));
	}

	// draw date
	const drawDateTime = new Date(drawDate);

	// previous draw date
	const previousDrawDate = new Date(
		drawDateTime.setDate(drawDateTime.getDate() - 1)
	);
	// length
	const length = tickets.length;

	// find winning tickets
	const winningTickets = tickets.filter((ticket) => {
		return ticket.status === 'winner';
	});

	res.status(200).json({
		success: true,
		message: 'Tickets fetched',
		length: length,
		winningTickets: winningTickets,
		tickets: tickets,
		drawDateTime,
		previousDrawDate,
	});
});

// =================================================================
// =================== get draw by date ============================
exports.getDrawByDate = catchAsyncErrors(async (req, res, next) => {
	const { date } = req.query;

	// convert date to date object
	const drawDate = new Date().toLocaleDateString();

	const draw = await Draw.findOne({ drawDate: { $gte: drawDate } });
	if (!draw) {
		return next(new ErrorHander('No draw found', 404));
	}
	// find tickets by draw date
	// const tickets = await Ticket.find({ drawDate: { $gte: date } });
	res.status(200).json({
		success: true,
		message: 'Draw fetched',
		draw: draw,
		// tickets: tickets,
	});
});

// get all draws
exports.getAllDraws = catchAsyncErrors(async (req, res, next) => {
	console.log('get all draws');
	res.status(200).json({
		success: true,
		message: 'Draws fetched',
	});
});

// get all isSold tickets;
exports.getAllSoldTickets = catchAsyncErrors(async (req, res, next) => {
	const tickets = await Ticket.find({ status: 'sold' });
	if (!tickets) {
		return next(new ErrorHander('No tickets found', 404));
	}
	res.status(200).json({
		success: true,
		message: 'Tickets fetched',
		tickets: tickets,
	});
});

//==============================================================
//===================== Winners Publish ========================

// publish winners
exports.publishWinners = catchAsyncErrors(async (req, res, next) => {
	const winners = req.body;

	// find all sold tickets and update
	const tickets = await Ticket.find({ status: 'sold' });
	if (!tickets) {
		return next(new ErrorHander('No tickets found', 404));
	}

	// total sell amount
	const totalSellAmount = tickets.reduce((acc, ticket) => {
		return acc + ticket.price;
	}, 0);
	// console.log('sell', totalSellAmount);
	// total prize
	const totalPrize = winners.reduce((acc, winner) => {
		return acc + winner.prize;
	}, 0);
	// console.log('profit', totalPrize);
	// profit
	const profit = totalSellAmount - totalPrize;
	// console.log('profit', profit);

	// if (profit < 0) {
	// 	return next(new ErrorHander('Profit is negative', 400));
	// }

	// update tickets
	tickets.forEach(async (ticket) => {
		const winner = winners.find((winner) => {
			return winner.ticketNumber === ticket.ticketNumber;
		});
		if (winner) {
			ticket.isWinner = true;
			ticket.position = winner.position;
			ticket.result = winner.result;
			ticket.prize = winner.prize;
			ticket.status = 'draw';
			ticket.drawDate = new Date();
			await ticket.save();

			// find usdx by ticket owner
			const usdx = await Usdx.findOne({ user_id: ticket.owner });
			if (!usdx) {
				return next(new ErrorHander('No usdx found', 404));
			}
			// update usdx
			usdx.usdx_balance += ticket.prize;
			createTransaction(
				usdx.user_id,
				'cashIn',
				ticket.prize,
				`Win Lottery ${ticket.prize}`
			);
			await usdx.save();
		} else {
			ticket.isWinner = false;
			ticket.position = 0;
			ticket.result = 'lose';
			ticket.status = 'draw';
			ticket.drawDate = new Date();
			await ticket.save();
		}
	});

	// create draw
	const draw = await Draw.create({
		drawDate: new Date(),
		winners: winners.map((winner) => {
			return {
				ticket_number: winner.ticketNumber,
				winner_name: winner.ownerName,
				position: winner.position,
				result: winner.result,
				prize: winner.prize,
			};
		}),
		total_tickets: tickets.length,
		total_winners: winners.length,
		losers: tickets.length - winners.length,
		total_prize: totalPrize,
		profit: profit,
	});

	// console.log('draw', draw);

	res.status(200).json({
		success: true,
		message: 'Winners published',
	});
});

// get all winners
exports.getAllWinners = catchAsyncErrors(async (req, res, next) => {
	const winners = await Ticket.find({ status: 'draw', isWinner: true });
	if (!winners) {
		return next(new ErrorHander('No winners found', 404));
	}
	res.status(200).json({
		success: true,
		message: 'Winners fetched',
		winners: winners,
	});
});
