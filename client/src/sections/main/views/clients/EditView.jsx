import PropTypes from "prop-types";
import {ActionIcon, Divider, Flex, Modal, rem, Skeleton, Stack, Text, Tooltip} from "@mantine/core";
import {IconPencil, IconPlus} from "@tabler/icons-react";
import classes from "../../../../ezM/MantineGrid/MantineGrid.module.scss";
import ServiceForm from "./forms/serviceForm/ServiceForm.jsx";
import Service from "./service/Service.jsx";
import AddClientForm from "./forms/AddClientForm.jsx";
import {lastUpdate} from "../../../../util/index.js";
import {formatPhoneNumber} from "../../../../util/formatPhoneNumber.js";
import Center from "./center/Center.jsx";

export default function EditView ({state}) {
	const {client_name, client_last_name, client_email, client_phone, updated_at} = state.selectedRow

	return (
		<>
			<Flex h='calc(100vh - 61px)'>
				<Stack w='300px' style={{overflowY: 'auto'}} p='16px 16px 0 16px'>
					<Stack gap={0}>
						<Flex justify='space-between' align='center' mb='1rem'>
							<Text>Personal Information</Text>
							<Tooltip label="Edit Info" color='dark.6' withArrow position='top-start'>
								<ActionIcon
									size={36}
									variant="default"
									aria-label="Edit Action Button"
									onClick={state.handleEditPersonalInfo}
								>
									<IconPencil
										style={{width: rem (20)}}
										className={classes.editIcon}
									/>
								</ActionIcon>
							</Tooltip>
						</Flex>


						<Text>Name: {client_name} {client_last_name}</Text>
						<Text size='xs' mb='.5rem'>Last Update {lastUpdate(updated_at)} days ago</Text>
						<Text>Phone: {formatPhoneNumber(client_phone)}</Text>
						<Text>Email: {client_email}</Text>

					</Stack>

					<Divider my="md" />

					<Flex justify='space-between' align='center' mb='1rem'>
						<Text>Services</Text>
						<Tooltip label="Add Service" color='dark.6' withArrow position='top-start'>
							<ActionIcon
								size={36}
								variant="default"
								aria-label="Edit Action Button"
								onClick={state.openSecondModal}
							>
								<IconPlus
									style={{width: rem (20)}}
									className={classes.editIcon}
								/>
							</ActionIcon>
						</Tooltip>
					</Flex>

					<Service state={state}/>
				</Stack>

				<Divider orientation="vertical"/>

				{state.serviceId && <Center state={state}/>}

			</Flex>

			{state.secondModal && <Modal
				opened={state.secondModal}
				centered
				title={state.personalInfo.modal ? 'Edit Info' : state.isEditingService ? 'Edit Service' : 'Add Service'}
				closeOnClickOutside={false}
				onClose={state.closeSecondModal}
			>
				{state.personalInfo.modal
					?
					<AddClientForm state={state} isEditing/>
					:
					<ServiceForm state={state}/>
				}
			</Modal>}
		</>
	);
}

EditView.propTypes = {
	state: PropTypes.object.isRequired
}
