import PropTypes from "prop-types";
import {Flex, Select, Text, Pagination, ActionIcon, rem, Modal, Menu, Button} from "@mantine/core";
import {DataGrid} from "mantine-data-grid";
import ToolBar from "./toolbar/ToolBar.jsx";
import classes from "./MantineGrid.module.scss";
import {IconPencil, IconTrash} from "@tabler/icons-react";

export default function MantineGrid ({state, forms, rowId}) {

	return (
		<Flex flex={1} direction='column'>
			<ToolBar state={state}/>
			{state.data.list.length
				?
				<DataGrid
					columns={[...state.columns, {
						header: 'Action',
						size: 80,
						cell: ({cell}) => {
							return (
								<Flex direction='row' gap={8}>
									<ActionIcon
										onClick={() => state.handleEditClient (cell.row.original)}
										size={36} variant="default" aria-label="Edit Action Button"
									>
										<IconPencil
											style={{width: rem (20)}}
											className={classes.editIcon}
										/>
									</ActionIcon>
									<Menu
										shadow="md"
										width={240}
										position='bottom-end'
										opened={state.confirmRowToDelete === cell.row.original[rowId]}
										onChange={() => {
											if(state.confirmRowToDelete)state.handleConfirm('')
										}}
										closeOnClickOutside
										closeOnEscape
									>
										<Menu.Target>
											<ActionIcon
												size={36}
												variant="default"
												aria-label="Delete Action Button"
												onClick={() => state.handleConfirm(cell.row.original[rowId])}
											>
												<IconTrash
													style={{width: rem (20)}}
													className={classes.deleteIcon}
													onClick={() => {}}
												/>
											</ActionIcon>
										</Menu.Target>
										<Menu.Dropdown>
											<Text p='.5rem'>Confirm to delete this record</Text>
											<Flex gap={8}>
												<Button
													fullWidth
													size="xs"
													color='teal.6'
													onClick={() => state.handleDeleteClient(cell.row.original[rowId])}
												>
													Ok
												</Button>

											</Flex>
										</Menu.Dropdown>
									</Menu>

								</Flex>
							)
						}
					}]}
					data={state.data.list}
					total={state.data.total}
					// onPageChange={state.fetchData}
					// onSearch={handleSearch}
					highlightOnHover
					// withColumnResizing
					// withColumnFilters
					withSorting
					withFixedHeader
					loading={state.loading}
					withPagination
					// pageSizes={["5", "25", "50", "100"]}
					paginationMode

					state={{...state.pagination}}
					// debug //see debug
					components={{
						pagination: ({table}) => {
							return (
								<Flex
									justify='flex-end'
									align='center'
									p='.5rem'
									gap={16}
									style={{
										borderTop: `1px solid var(--mantine-color-default-border)`
									}}
								>
									<Flex direction='row' align='center' gap={8}>
										<Text>Page Size</Text>
										<Select
											// size='md'
											value={state.pagination.pageSize.toString()}
											data={['10', '20', '50', '100']}
											className={classes.select}
											onChange={(pageSize) => state.handlePagination({
												pageSize: +pageSize,
												pageIndex: 0
											})}
										/>
									</Flex>
									<Pagination
										size="md"
										value={table.getState ().pageIndex + 1}
										page={table.getState ().pageIndex + 1}
										total={state.pagination.page || table.getPageCount()}
										onChange={(pageIndex) => state.handlePagination({
											...state.pagination,
											pageIndex: pageIndex - 1
										})}
										className={classes.pagination}
										// withControls={false}
									/>
								</Flex>
							)
						}
					}}
					styles={{
						wrapper: {
							flex: 1,
							gap: 0,
							justifyContent: 'space-between',
							border: `0.0625rem solid var(--mantine-color-default-border)`,
							borderBottomLeftRadius: '4px',
							borderBottomRightRadius: '4px',
						},
						scrollArea: {
							paddingBottom: 0
						},
						resizer: {
							borderRight: `0.0625rem solid var(--mantine-color-default-border)`,
						},
						thead: {
							backgroundColor: 'var(--mantine-color-body)',
							'&:after': {
								backgroundColor: 'var(--mantine-color-dark-light-hover)',
								height: '1px'
							}
						},
						tbody: {
							'tr:last-child': {
								td: {
									borderBottom: '0.0625rem solid var(--mantine-color-default-border)'
								}
							}
						},
						th: {
							div: {
								color: 'var(--mantine-color-text)',
							}
						},
						td: {
							alignItems: 'center',
							backgroundColor: 'var(--mantine-color-body)',
							borderTop: `0.0625rem solid var(--mantine-color-default-border) !important`,
							color: 'var(--mantine-color-text)',
						},
						tr: {
							'&:hover': {
								td: {
									backgroundColor: 'var(--mantine-color-default-hover)',
								}
							},
						},
					}}
				/>
				:
				<span>No data to Show</span>
			}

			{state.modal.open && <Modal
				opened={state.modal.open}
				onClose={state.closeModal}
				centered
				title={state.modal.title}
				closeOnClickOutside={false}
				{...(state.modal.who === 'editClient' && {
					fullScreen: true,
					classNames: {
						header: classes['modal-header'],
						body: classes['modal-body'],
						content: classes['modal-content']
					}
				})}

			>
				{forms[state.modal.who]}
			</Modal>}

		</Flex>
	);
}

MantineGrid.propTypes = {
	state: PropTypes.object.isRequired,
	forms: PropTypes.object,
	rowId: PropTypes.string.isRequired
}
