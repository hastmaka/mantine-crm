import {TestModel} from "../../../../api/models/index.js";
import {stringFilterFn} from "mantine-data-grid";
import MantineGrid from "../../../../ezM/MantineGrid/MantineGrid.jsx";
import {TestGridState} from "./TestGridState.js";

const columns = [
	{
		accessorKey: 'test_author',
		header: 'Full Name',
		size: 200,
		filterFn: stringFilterFn,
	},
	{
		header: 'Email',
		accessorKey: 'test_email',
		filterFn: stringFilterFn,
	}
]

const params = {
	store: {
		type: 'remote',
		model: {
			main: TestModel,
		},
		limit: 10,
		api: {
			read: 'test',
			create: 'test',
			update: 'test',
			delete: 'test'
		}
	},
	columns,
}

export default function Test () {
	const state = TestGridState(params)
	// debugger
	return (
		<MantineGrid
			state={state}
			rowId='test_id'
			forms={{
				// addClient: <AddClientForm state={state}/>,
				// editClient: <EditView state={state}/>,
			}}
		/>
	);
}

Test.propTypes = {}

