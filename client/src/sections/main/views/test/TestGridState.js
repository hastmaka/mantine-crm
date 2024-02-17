import {useEffect, useReducer} from "react";
import {notifications} from "@mantine/notifications";
import {FetchApi} from "../../../../api/FetchApi.js";

let initialState = {
	loading: false,
	searchValue: '',
	selectedRow: {},
	modal: {
		open: false,
		who: '',
		title: ''
	},
	confirmRowToDelete: '', // to delete client
	
	data: {
		list: [],
		total: 0
	},
	pagination: {
		pageIndex: 0,
		pageSize: 10
	},
	
	secondModal: false, // addService | editService | editPersonalInfo
}

export function TestGridState(props) {
	const {store = {}, columns = []} = props;
	initialState = {...initialState, columns}
	if (store?.limit) initialState.pagination.pageSize = store.limit;
	// debugger
	const [state, setState] = useReducer ((state, value) => ({...state, ...value}), initialState, undefined);
	const {
		searchValue,
		data,
		pagination,
		selectedRow,
		service,
		serviceInitialDataStatic,
		serviceInitialData,
		isEditingService,
		activeService,
		serviceId,
		personalInfo
	} = state
	const {pageIndex, pageSize} = pagination
	
	//aux
	const getPages = (updatedPagination) => {
		let {pageSize} = updatedPagination,
			total = data.total,
			a = total%pageSize,
			page = total/pageSize;
		if(a !== 0) {
			page = Math.ceil(page)
		}
		return page
	}
	const updateGrid = (res) => {
		const transformedData = res.data.map((item) => {return new store.model.main(item)})
		setState({
			data: {list: transformedData, total: res.dataCount},
			pagination: {
				pageSize,
				pageIndex,
				page: getPages({pageSize, pageIndex})
			},
			loading: false,
			// ...(Object.entries(selectedRow).length )
		});
	}
	//-------------------------
	
	//fetch
	const fetchData = async (search) => {
		let query = {};
		query.offset = search ? 0 : pageIndex * pageSize
		query.limit = pageSize
		//when search or pagination with search
		if(searchValue) {
			query.filters = JSON.stringify([
				{columnField: 'test_author', value: searchValue},
			])
		}
		// debugger
		setState({loading: true});
		const res = await FetchApi(store.api.read,null,null,query)
		updateGrid(res)
	};
	useEffect (() => {
		fetchData().then()
	}, [pageSize, pageIndex])
	const handlePagination = (updatedPagination) => {
		setState({
			pagination: {
				...updatedPagination,
				page: getPages(updatedPagination)
			}
		})
	}
	
	//modal----------------------------------------------------
	const closeModal = () => setState({modal: {open: false, who: '', title: ''}})
	const openModal = ({who, title}) => setState({modal: {open: true, who, title}});
	const openSecondModal = () => setState({secondModal: true})
	const closeSecondModal = (from) => {
		let state = {
			secondModal: false,
			isEditingService: false
		}
		if(from === 'personalInfo') {
			let tempPersonalInfo = {...personalInfo}
			tempPersonalInfo.isEditing = false
			tempPersonalInfo.modal = false
			state.personalInfo = tempPersonalInfo
		}
		setState(state)
	}
	const handleConfirm = (id) => setState({confirmRowToDelete: id})
	
	return {
		...state,
		handleConfirm,
	}
}