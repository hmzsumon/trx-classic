import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import 'react-alice-carousel/lib/alice-carousel.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Exchange from './components/Dashboard/Exchange';

import History from './components/Dashboard/History';
import Wallets from './components/Dashboard/Wallets';
import SimpleAccordion from './global/SimpleAccordion';

import { useLoadUserQuery } from './features/auth/authApi';
import SignUpWithReferr from './components/HomeScreen/Home/SignUpWithReferr';

import Referral from './components/Dashboard/User/Referral';
import BuyPxc from './components/Wallet01/BuyPxc';
import SendPxc from './components/Wallet01/SendPxc';
import Receive from './components/Wallet01/Receive';
import WithdrawUsdx from './components/Wallet02/WithdrawUsdx';
import SendUsdx from './components/Wallet02/SendUsdx';
import ReceiveUsdx from './components/Wallet02/ReceiveUsdx';
import Loan from './components/Loan/Loan';
import Support from './components/Support/Support';
import P2P from './components/P2P/P2p';
import Convert from './components/Convert/Convert';

import Trade from './components/Trade/Trade';
import Mining from './components/Mining/Mining';
import BuyHistory from './components/Wallet01/BuyHistory';
import Investment from './components/Mining/Investment';
import AllHistory from './components/History/AllHistory';
import Orders from './components/Orders/Orders';
import Profile from './components/Profile/Profile';
import Security from './components/Security/Security';
import Settings from './components/Settings/Settings';
import AppLink from './components/AppLink/AppLink';
import Verification from './components/Verification/Verification';
import Lottery from './components/Lottery/Lottery';
import About from './components/HomeScreen/Home/About';
import Privacy from './components/HomeScreen/Home/Privacy';
import Trams from './components/HomeScreen/Home/Trams';
import Exchange2 from './components/HomeScreen/Home/Exchange2';
import Developers from './components/HomeScreen/Home/Developers';
import MerRegister from './components/HomeScreen/Home/MerRegister';
import PrivateRoute from './route/PrivateRoute';
import MyLotteries from './components/Lottery/MyLotteries';
import UserWinners from './components/Lottery/Winners';

import AdminDashboard from './components/Admin/Dashboard/Dashboard';
import AdminWithdraw from './components/Admin/Withdraw/Withdraw';
import AdminUsers from './components/Admin/Users/Users';
import AdminLotteries from './components/Admin/Lottery/AdminLotteries';
import AdminMining from './components/Admin/Mining/AdminMining';
import AdminDraw from './components/Admin/Lottery/AdminDraw';
import AdminWithdrawList from './components/Admin/Withdraw/Withdraws';
import SoldTickets from './components/Admin/Lottery/SoldTickets';
import Winners from './components/Admin/Lottery/Winners';
import CreateTickets from './components/Admin/Lottery/CreateTickets';
import ConvertUsdtToPxc from './components/Convert/ConvertUsdtToPxc';
import Crypto from './components/Wallet02/Crypto';
import Bank from './components/Wallet02/Bank';
import SignIn from './components/HomeScreen/Home/SignIn';
import EmailVerification from './components/Verification/EmailVerification';
import ForgotPassword from './components/ResetPass/ForgotPassword';
import PasswordReset from './components/ResetPass/PasswordReset';
import MyWithdraws from './components/Wallet02/MyWithdraws';
import PxcUsdxView from './components/Wallet01/PxcUsdxView';
import BdcUsdxView from './components/Wallet02/BdcUsdxView';
import EditWithdraw from './components/Admin/Withdraw/EditWithdraw';
import WithdrawProof from './components/Wallet02/WithdrawProof';
import WithdrawView from './components/Wallet02/WithdrawView';

import ProfilePic from './components/Verification/ProfilePic';
import Submit from './components/Verification/Submit';
import ResizeUpload from './components/Verification/ResizeUpload';
import ViewImg from './components/Verification/ViewImg';
import VerifyMessage from './components/Verification/VerifyMessage';
import Document1 from './components/Verification/Document1';
import Document2 from './components/Verification/Document2';
import Verifications from './components/Admin/Verification/Verifications';
import EditVerification from './components/Admin/Verification/EditVerification';
import Test from './components/Test/Test';
import Address1 from './components/Loan/Address1';
import Address2 from './components/Loan/Address2';
import LoanSubmit from './components/Loan/LoanSubmit';
import LoanMessage from './components/Loan/LoanMessage';
import LoanList from './components/Admin/Loan/LoanList';
import EditLoan from './components/Admin/Loan/EditLoan';
import DepositList from './components/Admin/Deposit/DepositList';
import EditDeposit from './components/Admin/Deposit/EditDeposit';
import Merchant from './components/Merchant/Merchant';
import MerchantList from './components/Admin/Merchant/MerchantList';
import EditMerchant from './components/Admin/Merchant/EditMerchant';
import PriceList from './components/Admin/Price/PriceList';
import CreatePrice from './components/Admin/Price/CreatePrice';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const App = () => {
	useLoadUserQuery();
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />

			<Routes>
				{/* Resize Upload */}
				<Route path='/upload-resize' element={<ResizeUpload />} />
				<Route path='/test' element={<Test />} />
				<Route path='/' element={<Home />} />
				<Route path='/about' element={<About />} />
				<Route path='/privacy' element={<Privacy />} />
				<Route path='/trams' element={<Trams />} />
				<Route path='/home/exchange' element={<Exchange2 />} />
				<Route path='/mer-register' element={<MerRegister />} />
				<Route path='/developers' element={<Developers />} />

				<Route path='/login' element={<SignIn />} />
				<Route path='/register' element={<SignUpWithReferr />} />
				<Route path='/faq' element={<SimpleAccordion />} />

				<Route path='/email-verify' element={<EmailVerification />} />
				<Route path='/forgot-pass' element={<ForgotPassword />} />
				<Route path='/password/reset/:token' element={<PasswordReset />} />

				<Route
					path='/referral'
					element={
						<PrivateRoute>
							<Referral />
						</PrivateRoute>
					}
				/>
				<Route
					path='/exchange'
					element={
						<PrivateRoute>
							<Exchange />
						</PrivateRoute>
					}
				/>

				<Route
					path='/trade'
					element={
						<PrivateRoute>
							<Trade />
						</PrivateRoute>
					}
				/>
				<Route
					path='/dashboard'
					element={
						<PrivateRoute>
							<Dashboard />
						</PrivateRoute>
					}
				/>
				<Route
					path='buy-pxc'
					element={
						<PrivateRoute>
							<BuyPxc />
						</PrivateRoute>
					}
				/>
				<Route
					path='/convert-usdt-to-pxc'
					element={
						<PrivateRoute>
							<ConvertUsdtToPxc />
						</PrivateRoute>
					}
				/>
				<Route
					path='/mining'
					element={
						<PrivateRoute>
							<Mining />
						</PrivateRoute>
					}
				/>
				{/* chart */}
				<Route
					path='/pxc_usdx_chart'
					element={
						<PrivateRoute>
							<PxcUsdxView />
						</PrivateRoute>
					}
				/>
				<Route
					path='/bdc_usdx_chart'
					element={
						<PrivateRoute>
							<BdcUsdxView />
						</PrivateRoute>
					}
				/>
				<Route
					path='/usdt_usdx_chart'
					element={
						<PrivateRoute>
							<BdcUsdxView />
						</PrivateRoute>
					}
				/>
				{/*Admin Route*/}
				<Route
					path='/admin/dashboard'
					element={
						<PrivateRoute>
							<AdminDashboard />
						</PrivateRoute>
					}
				/>
				{/* Admin Withdraw List */}
				<Route
					path='/admin/withdraws'
					element={
						<PrivateRoute>
							<AdminWithdrawList />
						</PrivateRoute>
					}
				/>
				{/* Admin Withdraw Edit */}
				<Route
					path='/admin/withdraw/edit/:id'
					element={
						<PrivateRoute>
							<EditWithdraw />
						</PrivateRoute>
					}
				/>

				{/*  Withdraw Proof */}
				<Route
					path='/withdraw/proof'
					element={
						<PrivateRoute>
							<WithdrawProof />
						</PrivateRoute>
					}
				/>

				{/* Withdraw View */}
				<Route
					path='/withdraw/view/:id'
					element={
						<PrivateRoute>
							<WithdrawView />
						</PrivateRoute>
					}
				/>

				<Route
					path='/my-lotteries'
					element={
						<PrivateRoute>
							<MyLotteries />
						</PrivateRoute>
					}
				/>
				<Route
					path='/user/winners'
					element={
						<PrivateRoute>
							<UserWinners />
						</PrivateRoute>
					}
				/>
				<Route
					path='/user/withdraws'
					element={
						<PrivateRoute>
							<MyWithdraws />
						</PrivateRoute>
					}
				/>
				{/* Admin Deposit */}

				<Route
					path='/admin/deposits'
					element={
						<PrivateRoute>
							<DepositList />
						</PrivateRoute>
					}
				/>
				<Route
					path='/admin/deposit/edit/:id'
					element={
						<PrivateRoute>
							<EditDeposit />
						</PrivateRoute>
					}
				/>
				<Route
					path='admin/withdraw'
					element={
						<PrivateRoute>
							<AdminWithdraw />
						</PrivateRoute>
					}
				/>
				<Route
					path='admin/users'
					element={
						<PrivateRoute>
							<AdminUsers />
						</PrivateRoute>
					}
				/>
				<Route
					path='admin/lotteries'
					element={
						<PrivateRoute>
							<AdminLotteries />
						</PrivateRoute>
					}
				/>
				<Route
					path='admin/minings'
					element={
						<PrivateRoute>
							<AdminMining />
						</PrivateRoute>
					}
				/>
				<Route
					path='admin/draw'
					element={
						<PrivateRoute>
							<AdminDraw />
						</PrivateRoute>
					}
				/>
				<Route
					path='admin/sold-tickets'
					element={
						<PrivateRoute>
							<SoldTickets />
						</PrivateRoute>
					}
				/>
				<Route
					path='admin/winners'
					element={
						<PrivateRoute>
							<Winners />
						</PrivateRoute>
					}
				/>
				<Route
					path='admin/create-tickets'
					element={
						<PrivateRoute>
							<CreateTickets />
						</PrivateRoute>
					}
				/>
				<Route
					path='/withdraw/crypto'
					element={
						<PrivateRoute>
							<Crypto />
						</PrivateRoute>
					}
				/>
				<Route
					path='/withdraw/bank'
					element={
						<PrivateRoute>
							<Bank />
						</PrivateRoute>
					}
				/>

				<Route
					path='/mining/investment'
					element={
						<PrivateRoute>
							<Investment />
						</PrivateRoute>
					}
				/>

				{/* Side Nav Items */}
				<Route
					path='/orders'
					element={
						<PrivateRoute>
							<Orders />
						</PrivateRoute>
					}
				/>
				<Route
					path='/profile'
					element={
						<PrivateRoute>
							<Profile />
						</PrivateRoute>
					}
				/>
				<Route
					path='/security'
					element={
						<PrivateRoute>
							<Security />
						</PrivateRoute>
					}
				/>
				<Route
					path='/settings'
					element={
						<PrivateRoute>
							<Settings />
						</PrivateRoute>
					}
				/>
				<Route
					path='/app-link'
					element={
						<PrivateRoute>
							<AppLink />
						</PrivateRoute>
					}
				/>
				{/* Verification */}
				<Route
					path='/verification'
					element={
						<PrivateRoute>
							<Verification />
						</PrivateRoute>
					}
				/>

				<Route
					path='/verification/document-1'
					element={
						<PrivateRoute>
							<Document1 />
						</PrivateRoute>
					}
				/>
				<Route
					path='/verification/document-2'
					element={
						<PrivateRoute>
							<Document2 />
						</PrivateRoute>
					}
				/>
				<Route
					path='/verification/profile-photo'
					element={
						<PrivateRoute>
							<ProfilePic />
						</PrivateRoute>
					}
				/>
				<Route
					path='/verification/submit'
					element={
						<PrivateRoute>
							<Submit />
						</PrivateRoute>
					}
				/>

				{/* Admin Verification */}
				<Route
					path='/admin/verifications'
					element={
						<PrivateRoute>
							<Verifications />
						</PrivateRoute>
					}
				/>
				<Route
					path='/admin/verification/edit/:id'
					element={
						<PrivateRoute>
							<EditVerification />
						</PrivateRoute>
					}
				/>
				{/* View image */}
				<Route
					path='/view-image/'
					element={
						<PrivateRoute>
							<ViewImg />
						</PrivateRoute>
					}
				/>
				<Route
					path='/verify/message'
					element={
						<PrivateRoute>
							<VerifyMessage />
						</PrivateRoute>
					}
				/>

				<Route
					path='/history'
					element={
						<PrivateRoute>
							<History />
						</PrivateRoute>
					}
				/>
				<Route
					path='/all-history'
					element={
						<PrivateRoute>
							<AllHistory />
						</PrivateRoute>
					}
				/>
				<Route
					path='/wallets'
					element={
						<PrivateRoute>
							<Wallets />
						</PrivateRoute>
					}
				/>

				<Route
					path='/buy-history'
					element={
						<PrivateRoute>
							<BuyHistory />
						</PrivateRoute>
					}
				/>
				{/* Loan Route */}
				<Route
					path='/loan'
					element={
						<PrivateRoute>
							<Loan />
						</PrivateRoute>
					}
				/>
				<Route
					path='/loan/address-1'
					element={
						<PrivateRoute>
							<Address1 />
						</PrivateRoute>
					}
				/>
				<Route
					path='/loan/address-2'
					element={
						<PrivateRoute>
							<Address2 />
						</PrivateRoute>
					}
				/>
				<Route
					path='/loan/submission'
					element={
						<PrivateRoute>
							<LoanSubmit />
						</PrivateRoute>
					}
				/>
				<Route
					path='/loan/message'
					element={
						<PrivateRoute>
							<LoanMessage />
						</PrivateRoute>
					}
				/>
				{/* Admin Loan */}
				<Route
					path='/admin/loans'
					element={
						<PrivateRoute>
							<LoanList />
						</PrivateRoute>
					}
				/>
				<Route
					path='/admin/loan/edit/:id'
					element={
						<PrivateRoute>
							<EditLoan />
						</PrivateRoute>
					}
				/>
				<Route
					path='/support'
					element={
						<PrivateRoute>
							<Support />
						</PrivateRoute>
					}
				/>
				<Route
					path='/p2p'
					element={
						<PrivateRoute>
							<P2P />
						</PrivateRoute>
					}
				/>
				<Route
					path='/convert'
					element={
						<PrivateRoute>
							<Convert />
						</PrivateRoute>
					}
				/>
				<Route
					path='/lottery'
					element={
						<PrivateRoute>
							<Lottery />
						</PrivateRoute>
					}
				/>
				<Route
					path='/send'
					element={
						<PrivateRoute>
							<SendPxc />
						</PrivateRoute>
					}
				/>
				<Route
					path='/receive'
					element={
						<PrivateRoute>
							<Receive />
						</PrivateRoute>
					}
				/>
				{/* WithdrawUsdx */}
				<Route
					path='/usdx-withdraw'
					element={
						<PrivateRoute>
							<WithdrawUsdx />
						</PrivateRoute>
					}
				/>
				<Route
					path='/send-usdx'
					element={
						<PrivateRoute>
							<SendUsdx />
						</PrivateRoute>
					}
				/>
				<Route
					path='/receive-usdx'
					element={
						<PrivateRoute>
							<ReceiveUsdx />
						</PrivateRoute>
					}
				/>
				{/* Merchant */}
				<Route
					path='/merchant'
					element={
						<PrivateRoute>
							<Merchant />
						</PrivateRoute>
					}
				/>

				{/* Admin Merchant */}
				<Route
					path='/admin/merchants'
					element={
						<PrivateRoute>
							<MerchantList />
						</PrivateRoute>
					}
				/>
				<Route
					path='/admin/merchant/edit/:id'
					element={
						<PrivateRoute>
							<EditMerchant />
						</PrivateRoute>
					}
				/>

				{/* Price */}
				<Route
					path='/admin/prices'
					element={
						<PrivateRoute>
							<PriceList />
						</PrivateRoute>
					}
				/>
				<Route
					path='/create-price'
					element={
						<PrivateRoute>
							<CreatePrice />
						</PrivateRoute>
					}
				/>
				<Route path='*' element={<NotFound />}></Route>
			</Routes>
			<ToastContainer />
		</ThemeProvider>
	);
};

export default App;
