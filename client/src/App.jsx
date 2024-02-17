import {generalSignal} from "./signals/generalSignal.js";
import {useHash} from "./util/hooks/index.js";
import {lazy, Suspense, useEffect} from "react";
import {Center, Loader, useMantineTheme} from "@mantine/core";

const Login = lazy(() => import('./sections/login/Login.jsx'))
const Dashboard = lazy(() => import('./sections/main/Main.jsx'))

export default function App() {
	const {activeView} = generalSignal
	useHash({activeView})

	const theme = useMantineTheme()
	useEffect (() => {console.log (theme)}, [])


	const renderPage = () => {
		//check location and determine where to redirect
		if (activeView === 'login') {
			return (
				<Suspense fallback={<Center h='100vh'><Loader /></Center>}>
					<Login/>
				</Suspense>
			);
		}
		if (activeView === 'error') {
			return <span>error</span>;
		}
		return (
			<Suspense fallback={<Center h='100vh'><Loader /></Center>}>
				<Dashboard/>
			</Suspense>
		);
	};

	return (
		<>
			{/*<EzConfirm/>*/}
			{renderPage ()}
		</>
	);
}
