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
import NoticeList from './components/Admin/Notice/NoticeList';
import CreateNotice from './components/Admin/Notice/CreateNotice';
import BuyTrxc from './components/Wallet01/BuyTrxc';
import PrivetRoute from './route/PrivateRoute';
import CreateWithdraw from './components/Withdraw/CreateWithdraw';

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

				{/* Start Admin Route */}
				<Route element={<PrivetRoute isAdmin={true} />}>
					<Route path='/admin/users' element={<AdminUsers />} />

					<Route path='/admin/dashboard' element={<AdminDashboard />} />

					<Route path='/admin/withdraws' element={<AdminWithdrawList />} />
					<Route path='/admin/withdraw/edit/:id' element={<EditWithdraw />} />
					<Route path='/admin/withdraw' element={<AdminWithdraw />} />
					<Route path='/withdraw/crypto' element={<Crypto />} />
					<Route path='/withdraw/bank' element={<Bank />} />

					<Route path='/admin/deposits' element={<DepositList />} />
					<Route path='/admin/deposit/edit/:id' element={<EditDeposit />} />

					<Route path='admin/create-tickets' element={<CreateTickets />} />
					<Route path='/admin/lotteries' element={<AdminLotteries />} />
					<Route path='/admin/draw' element={<AdminDraw />} />
					<Route path='admin/sold-tickets' element={<SoldTickets />} />
					<Route path='admin/winners' element={<Winners />} />

					<Route path='/admin/minings' element={<AdminMining />} />

					<Route
						path='/admin/verification/edit/:id'
						element={<EditVerification />}
					/>

					<Route path='/admin/loans' element={<LoanList />} />
					<Route path='/admin/loan/edit/:id' element={<EditLoan />} />

					{/* Price */}
					<Route path='/admin/prices' element={<PriceList />} />
					<Route path='/create-price' element={<CreatePrice />} />
					{/* Notice */}
					<Route path='/admin/notice' element={<NoticeList />} />
					<Route path='/create-notice' element={<CreateNotice />} />

					<Route path='/admin/merchants' element={<MerchantList />} />
					<Route path='/admin/merchant/edit/:id' element={<EditMerchant />} />
				</Route>
				{/* End Admin Route */}

				{/* Start User Route */}
				<Route element={<PrivetRoute />}>
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/referral' element={<Referral />} />
					<Route path='/exchange' element={<Exchange />} />
					<Route path='/trade' element={<Trade />} />

					<Route path='buy-trxc' element={<BuyTrxc />} />
					<Route path='/convert-usdt-to-pxc' element={<ConvertUsdtToPxc />} />

					<Route path='/mining' element={<Mining />} />
					<Route path='/mining/investment' element={<Investment />} />

					<Route path='/pxc_usdx_chart' element={<PxcUsdxView />} />
					<Route path='/bdc_usdx_chart' element={<BdcUsdxView />} />
					<Route path='/usdt_usdx_chart' element={<BdcUsdxView />} />

					<Route path='/withdraw/proof' element={<WithdrawProof />} />
					<Route path='/user/withdraws' element={<MyWithdraws />} />
					<Route path='/withdraw/view/:id' element={<WithdrawView />} />
					<Route path='/create-withdraw' element={<CreateWithdraw />} />

					<Route path='/lottery' element={<Lottery />} />
					<Route path='/my-lotteries' element={<MyLotteries />} />
					<Route path='/user/winners' element={<UserWinners />} />

					<Route path='/profile' element={<Profile />} />
					<Route path='/security' element={<Security />} />
					<Route path='/settings' element={<Settings />} />

					<Route path='/app-link' element={<AppLink />} />

					<Route path='/orders' element={<Orders />} />
					<Route path='/verification' element={<Verification />} />
					<Route path='/verification/document-1' element={<Document1 />} />
					<Route path='/verification/document-2' element={<Document2 />} />
					<Route path='/verification/profile-photo' element={<ProfilePic />} />
					<Route path='/verification/submit' element={<Submit />} />

					<Route path='/view-image/' element={<ViewImg />} />
					<Route path='/verify/message' element={<VerifyMessage />} />
					<Route path='/history' element={<History />} />
					<Route path='/all-history' element={<AllHistory />} />

					<Route path='/wallets' element={<Wallets />} />
					<Route path='/buy-history' element={<BuyHistory />} />
					<Route path='/loan' element={<Loan />} />
					<Route path='/loan/address-2' element={<Address2 />} />
					<Route path='/loan/address-1' element={<Address1 />} />
					<Route path='/loan/submission' element={<LoanSubmit />} />
					<Route path='/loan/message' element={<LoanMessage />} />

					<Route path='/support' element={<Support />} />
					<Route path='/p2p' element={<P2P />} />
					<Route path='/send' element={<SendPxc />} />
					<Route path='/receive' element={<Receive />} />
					<Route path='/convert' element={<Convert />} />

					<Route path='/usdx-withdraw' element={<WithdrawUsdx />} />
					<Route path='/send-usdx' element={<SendUsdx />} />
					<Route path='/receive-usdx' element={<ReceiveUsdx />} />

					<Route path='/merchant' element={<Merchant />} />
				</Route>
				{/* End User Route */}

				<Route path='*' element={<NotFound />}></Route>
			</Routes>
			<ToastContainer />
		</ThemeProvider>
	);
};

export default App;
