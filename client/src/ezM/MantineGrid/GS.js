import {deepSignal} from "deepsignal/react";

const getPages = (data, updatedPagination) => {
	let {pageSize} = updatedPagination,
		total = data.total,
		a = total%pageSize,
		page = total/pageSize;
	if(a !== 0) {
		page = Math.ceil(page)
	}
	return page
}

export const GS = deepSignal({
	pagination: {
		pageIndex: 0,
		pageSize: 10
	},
	searchValue: '',
	data: {list: [],total: 0},

	setPagination: (data, updatedPagination) => {
		GS.pagination = {
			...GS.pagination,
			...updatedPagination,
			page: getPages(data, updatedPagination)
		}
		// debugger
	}
})
