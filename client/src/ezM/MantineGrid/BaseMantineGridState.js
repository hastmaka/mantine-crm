// let initialState = {
// 	loading: false,
// 	searchValue: '',
// 	selectedRow: {},
// 	modal: {
// 		open: false,
// 		who: '',
// 		title: ''
// 	},
// 	confirmRowToDelete: '', // to delete client
//
// 	data: {
// 		list: [],
// 		total: 0
// 	},
// 	pagination: {
// 		pageIndex: 0,
// 		pageSize: 10
// 	},
//
// 	secondModal: false, // addService | editService | editPersonalInfo
// 	isEditingService: false,
// 	activeService: 'buy', //to handle buy | rent | sell form status
// 	activeServiceId: null, //to know which service is selected and bring notes and documents
// 	service: [],
// 	notes: [],
// 	documents: [],
// 	serviceId: null,
// 	serviceInitialDataStatic: {
// 		buy: {
// 			service_bath: 'Any',
// 			service_bed: 'Any',
// 			service_pre_approval: '',
// 			service_zip: [],
// 			service_type: 'buy'
// 		},
// 		rent: {
// 			service_bath: 'Any',
// 			service_bed: 'Any',
// 			service_price_from: '',
// 			service_price_to: '',
// 			service_pet: '',
// 			service_zip: [],
// 			service_type: 'rent'
// 		}
// 	},
//
// 	//personal info edit
// 	personalInfo: {
// 		isEditing: false,
// 		modal: false,
// 		initialDataStatic: {
// 			client_name: '',
// 			client_last_name: '',
// 			client_email: '',
// 			client_phone: '',
// 		}
// 	}
// }
// export function BaseMantineGridState(props) {
// 	const {store = {},columns = []} = props;
// 	initialState = {...initialState,columns}
// 	if (store?.limit) initialState.pagination.pageSize = store.limit;
// 	// debugger
// 	const [state, setState] = useReducer((state, value) => ({ ...state, ...value }), initialState, undefined);
// 	const {
// 		searchValue,
// 		data,
// 		pagination,
// 		selectedRow,
// 		service,
// 		serviceInitialDataStatic,
// 		serviceInitialData,
// 		isEditingService,
// 		activeService,
// 		serviceId,
// 		personalInfo
// 	} = state
// 	const {pageIndex, pageSize} = pagination
//
// 	// useEffect (() => {
// 	// 	console.log (state)
// 	// }, [state])
//
// 	//aux
// 	const getPages = (updatedPagination) => {
// 		let {pageSize} = updatedPagination,
// 			total = data.total,
// 			a = total%pageSize,
// 			page = total/pageSize;
// 		if(a !== 0) {
// 			page = Math.ceil(page)
// 		}
// 		return page
// 	}
// 	const updateGrid = (res) => {
// 		const transformedData = res.data.map((item) => {return new store.model.ClientModel(item)})
// 		setState({
// 			data: {list: transformedData, total: res.dataCount},
// 			pagination: {
// 				pageSize,
// 				pageIndex,
// 				page: getPages({pageSize, pageIndex})
// 			},
// 			loading: false,
// 			// ...(Object.entries(selectedRow).length )
// 		});
// 	}
// 	const updateService = (res) => {
// 		let sMap = {buy: 'ServiceBuyModel',rent: 'ServiceRentModel'};
// 		let tempService = [...service],
// 			indexToUpdate = service.findIndex(s => s.service_id === res.data.service_id);
// 		tempService[indexToUpdate] = new store.model[sMap[res.data.service_type]](res.data)
// 		setState({
// 			service: tempService,
// 			secondModal: false
// 		})
// 		notifications.show({
// 			title: 'Success',
// 			message: 'Service updated successfully',
// 			color: 'teal.6'
// 		})
// 	}
// 	//-------------------------
//
// 	const fetchData = async (search) => {
// 		let query = {};
// 		query.offset = search ? 0 : pageIndex * pageSize
// 		query.limit = pageSize
// 		//when search or pagination with search
// 		if(searchValue) {
// 			query.filters = JSON.stringify([
// 				{columnField: 'client_name', value: searchValue},
// 				{columnField: 'client_last_name', value: searchValue},
// 				{columnField: 'client_phone', value: searchValue},
// 			])
// 		}
// 		// debugger
// 		setState({loading: true});
// 		const res = await FetchApi(store.api.read,null,null,query)
// 		updateGrid(res)
// 	};
// 	useEffect (() => {
// 		fetchData().then()
// 	}, [pageSize, pageIndex])
// 	const handlePagination = (updatedPagination) => {
// 		setState({
// 			pagination: {
// 				...updatedPagination,
// 				page: getPages(updatedPagination)
// 			}
// 		})
// 	}
//
// 	//modal----------------------------------------------------
// 	const closeModal = () => setState({modal: {open: false, who: '', title: ''}})
// 	const openModal = ({who, title}) => setState({modal: {open: true, who, title}});
// 	const openSecondModal = () => setState({secondModal: true})
// 	const closeSecondModal = (from) => {
// 		let state = {
// 			secondModal: false,
// 			isEditingService: false
// 		}
// 		if(from === 'personalInfo') {
// 			let tempPersonalInfo = {...personalInfo}
// 			tempPersonalInfo.isEditing = false
// 			tempPersonalInfo.modal = false
// 			state.personalInfo = tempPersonalInfo
// 		}
// 		setState(state)
// 	}
// 	const handleConfirm = (id) => setState({confirmRowToDelete: id})
// 	//---------------------------------------------------------
//
// 	//CRUD
// 	//clients--------------------------------------------------
// 	const handleSubmitClient = (values) => {
// 		if(personalInfo.isEditing) {
// 			let dirtyFields = findDifferences(personalInfo.initialData,values),
// 				readyToDb = getDataReadyForDb(dirtyFields);
// 			if(Object.keys(dirtyFields).length){
// 				FetchApi(
// 					'client',
// 					'PUT',
// 					readyToDb,
// 					{id: selectedRow.client_id}
// 				).then(res => {
// 					let tempData = structuredClone(data.list),
// 						recordToUpdate = tempData.findIndex(i => i.client_id === selectedRow.client_id);
// 					tempData[recordToUpdate] = new store.model.ClientModel(res.data)
// 					// recordToUpdate.set(res.data)
// 					setState({
// 						selectedRow: res.data,
// 						data: {...data, list: tempData}
// 					})
// 					notifications.show({
// 						title: 'Success',
// 						message: 'Personal Info Updated successfully',
// 						color: 'teal.6'
// 					})
// 				})
// 			}
// 			closeSecondModal('personalInfo')
// 		} else {
// 			FetchApi('client', 'POST', getDataReadyForDb(values), {
// 				offset: pageIndex * pageSize,
// 				limit: pageSize
// 			}).then(res => {
// 				closeModal()
// 				updateGrid(res)
// 				notifications.show({
// 					title: 'Success',
// 					message: 'Record created successfully',
// 					color: 'teal.6'
// 				})
// 			})
// 		}
//
// 	}
// 	const handleDeleteClient = async (client_id) => {
// 		setState({loading: true});
// 		FetchApi(store.api.delete,'DELETE',{id: client_id}, {
// 			offset: pageIndex * pageSize,
// 			limit: pageSize
// 		}).then(res => {
// 			if(res.success){
// 				updateGrid(res)
// 				setState({loading: false, confirmRowToDelete: ''});
// 				notifications.show({
// 					title: 'Success',
// 					message: 'Record deleted successfully',
// 					color: 'teal.6'
// 				})
// 			}
// 		})
// 	}
// 	const handleEditClient = (row) => {
// 		FetchApi(`${store.api.read}/service`, null, null,{
// 			id: row.client_id
// 		}).then(res => {
// 			if(res.success) {
// 				let {services, ...rest} = res.data, filteredData, transformedData = [];
// 				if(services.length) {
// 					filteredData = services.map((item) => ({...filterUndefined(item)}))
// 					transformedData = filteredData.map((item) => {
// 						switch (item.service_type) {
// 							case 'buy':
// 								return new store.model.ServiceBuyModel(item)
// 							case 'rent':
// 								return new store.model.ServiceRentModel(item)
// 							default:
// 								return new Error('Model no found')
// 						}
// 					})
// 				}
// 				setState({
// 					modal: {open: true, who: 'editClient', title: 'Edit Client'},
// 					service: transformedData,
// 					selectedRow: rest
// 				});
// 			}
// 		})
// 	}
// 	const handleEditPersonalInfo = () => {
// 		FetchApi('getById',null,null,
// 			{id: selectedRow.client_id, target: 'client'}
// 		).then(res => {
// 			const transformData = new store.model.ClientModel(res.data)
// 			const editable = transformData.editableFields()
// 			setState({
// 				secondModal: true,
// 				personalInfo: {
// 					...personalInfo,
// 					isEditing: true,
// 					modal: true,
// 					initialData: {...editable}
// 				}
// 			})
// 		})
// 	}
// 	//---------------------------------------------------------
//
// 	//services-------------------------------------------------
// 	const handleSubmitService = async (values) => {
// 		let sMap = {buy: 'ServiceBuyModel',rent: 'ServiceRentModel'};
// 		if(isEditingService) {
// 			let dirtyFields = findDifferences(serviceInitialData[activeService],values),
// 				readyToDb = getDataReadyForDb(dirtyFields);
// 			if(Object.keys(dirtyFields).length){
// 				FetchApi(
// 					'service',
// 					'PUT',
// 					readyToDb,
// 					{id: serviceId}
// 				).then(res => {
// 					if(res.success) updateService(res)
// 				})
// 			}
// 			closeSecondModal()
// 		} else {
// 			let {service_zip, ...rest} = values,
// 				data = {...rest};
// 			data.client_client_id = selectedRow.client_id
// 			data.service_status = 'pending'
// 			data.service_note = JSON.stringify([])
// 			data.service_document = JSON.stringify([])
// 			data.service_zip = JSON.stringify(service_zip)
//
// 			if(values.service_type === 'rent') {
// 				data.service_pet =  data.service_pet === 'Yes' ? 1 : 0
// 			}
//
// 			const res = await FetchApi('service','POST',data, {
// 				offset: pageIndex * pageSize,
// 				limit: pageSize
// 			})
//
// 			if(res.success) {
// 				setState({
// 					service: [...service, new store.model[sMap[values.service_type]](res.data)],
// 					secondModal: false
// 				});
// 				notifications.show({
// 					title: 'Success',
// 					message: 'Record added successfully',
// 					color: 'teal.6'
// 				})
// 			}
// 		}
// 	}
// 	const handleUpdateStatus = (serviceId, value) => {
// 		FetchApi(
// 			'service',
// 			'PUT',
// 			{service_status: value},
// 			{id: serviceId}
// 		).then(res => {
// 			if(res.success) updateService(res)
// 		})
// 	}
// 	const handleEditService = (service) => {
// 		FetchApi('getById', null, null,
// 			{id: service.service_id, target: 'service'}
// 		).then(res => {
// 				if(res.success) {
// 					let sMap = {buy: 'ServiceBuyModel',rent: 'ServiceRentModel'};
// 					const transformData = new store.model[sMap[service.service_type]](res.data)
// 					const editable = transformData.editableFields()
// 					const tempServiceInitialData = structuredClone(serviceInitialDataStatic)
// 					// debugger
// 					setState({
// 						activeService: service.service_type,
// 						serviceInitialData: {
// 							...tempServiceInitialData,
// 							[service.service_type]: {...tempServiceInitialData[service.service_type], ...editable}
// 						},
// 						isEditingService: true,
// 						secondModal: true,
// 						serviceId: service.service_id
// 					})
// 				}
// 			})
// 	}
// 	const handleDeleteService = (service) => {
// 		let sMap = {buy: 'ServiceBuyModel',rent: 'ServiceRentModel'},
// 			id = service.service_id,
// 			type = service.service_type;
// 		FetchApi(
// 			'service',
// 			'DELETE',
// 			{id},
// 			{client_id: selectedRow.client_id}
// 		).then(res => {
// 			if(res.success){
// 				const transformedData = res.data.map((item) => {return new store.model[sMap[type]](item)})
// 				setState({service: transformedData})
// 				notifications.show({
// 					title: 'Success',
// 					message: 'Service deleted successfully',
// 					color: 'teal.6'
// 				})
// 			}
// 		})
// 	}
// 	const handleGetNotesAndDocuments = (serviceId) => {
// 		FetchApi('notes-and-documents', null, null, {
// 			id: serviceId
// 		}).then(res => {
// 			if(res.success) {
// 				setState({
// 					notes: res.data.notes,
// 					documents: res.data.documents,
// 				})
// 			}
// 		})
// 	}
//
// 	//search
// 	const handleSearch = (value) => {
// 		if(value) {
// 			FetchApi('client', null, null, {
// 				filters: JSON.stringify([
// 					{columnField: 'client_name', value},
// 					{columnField: 'client_last_name', value},
// 					{columnField: 'client_phone', value},
// 				]),
// 				offset: 0,
// 				limit: pagination.pageSize
// 			}).then(res => {
// 				setState({searchValue: value})
// 				updateGrid(res)
// 			})
// 		} else {
// 			fetchData(value).then()
// 		}
// 	}
//
//
// 	return {
// 		...state,
// 		fetchData,
// 		handleSubmitClient,
// 		handleSubmitService,
// 		handleEditClient,
// 		handleEditService,
// 		handleDeleteClient,
// 		openModal,
// 		closeModal,
// 		openSecondModal,
// 		closeSecondModal,
// 		handleConfirm,
// 		handlePagination,
// 		handleUpdateStatus,
// 		handleEditPersonalInfo,
// 		handleDeleteService,
// 		handleSearch,
// 		handleGetNotesAndDocuments
// 	}
// }
