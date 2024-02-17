import PropTypes from "prop-types";
import {Center, Loader, SegmentedControl, Stack} from "@mantine/core";
import {lazy, Suspense, useMemo, useState} from "react";
//dynamic
const BuyFields = lazy(() => import('./BuyFields.jsx'))
const RentFields = lazy(() => import('./RentFields.jsx'))
const SellFields = lazy(() => import('./SellFields.jsx'))



export default function ServiceForm ({state}) {
	const [activeService, setActiveService] = useState(state.activeService)
	const serviceForms = useMemo(() => {
		return {
			buy: <Suspense fallback={<Center><Loader/></Center>}><BuyFields state={state}/></Suspense>,
			rent: <Suspense fallback={<Center><Loader/></Center>}><RentFields state={state}/></Suspense>,
			sell: <Suspense fallback={<Center><Loader/></Center>}><SellFields state={state}/></Suspense>,
		}
	}, [])
	return (
		<Stack>
			{!state.isEditingService && <SegmentedControl
				color="teal"
				defaultValue={activeService}
				data={['buy', 'rent', 'sell']}
				onChange={(s) => setActiveService(s)}
			/>}
			{serviceForms[activeService]}
		</Stack>
	);
}

ServiceForm.propTypes = {
	state: PropTypes.object.isRequired
}
