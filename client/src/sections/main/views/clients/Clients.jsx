import {stringFilterFn} from 'mantine-data-grid';
import MantineGrid from "../../../../ezM/MantineGrid/MantineGrid.jsx";
import {ClientModel, NoteModel, ServiceBuyModel, ServiceRentModel} from "../../../../api/models/index.js";
import EditView from "./EditView.jsx";
import AddClientForm from "./forms/AddClientForm.jsx";
import {ClientsGridState} from "./ClientsGridState.js";

const columns = [
	{
		accessorKey: 'client_name',
		header: 'Full Name',
		size: 200,
		filterFn: stringFilterFn,
		cell: ({cell}) => {
			let {client_name, client_last_name} = cell.row.original
			return <span>{`${client_name} ${client_last_name}`}</span>
		}
	},
	{
		accessorKey: 'client_phone',
		header: 'Phone',
		// filterFn: stringFilterFn,
		size: 300,
		// cell: cell => {debugger},
		filterFn: stringFilterFn,
	},
	{
		header: 'Email',
		accessorKey: 'client_email',
		filterFn: stringFilterFn,
	}
]

const params = {
	store: {
		type: 'remote',
		model: {
			main: ClientModel,
			ServiceBuyModel,
			ServiceRentModel,
			NoteModel
		},
		limit: 10,
		api: {
			read: 'client',
			create: 'client',
			update: 'client',
			delete: 'client'
		}
	},
	columns
}


export default function Clients () {
	const state = ClientsGridState(params)
	return (
		<MantineGrid
			rowId='client_id'
			state={state}
			forms={{
				addClient: <AddClientForm state={state}/>,
				editClient: <EditView state={state}/>,
			}}
		/>
	);
}

Clients.propTypes = {}
