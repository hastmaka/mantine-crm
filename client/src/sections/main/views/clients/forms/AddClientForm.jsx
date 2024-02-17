import PropTypes from "prop-types";
import {Button, Flex, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {formatPhoneNumber} from "../../../../../util/formatPhoneNumber.js";

export default function AddClientForm ({state, isEditing}) {
	const initData = state.personalInfo.isEditing
		? state.personalInfo.initialData
		: state.personalInfo.initialDataStatic
	const form = useForm({
		initialValues: {...initData},

		validate: {
			client_name: (value) => !value.length ? `Can't be Empty` : null,
			client_last_name: (value) => !value.length ? `Can't be Empty` : null,
			client_email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
			client_phone: (value) => !value.length ? `Can't be Empty` : null,
		},
		validateInputOnChange: true
	});

	return (
		<form onSubmit={form.onSubmit(state.handleSubmitClient)}>
			<TextInput
				placeholder="Name"
				mt="md"
				value={form.values.client_name}
				error={form.errors.client_name}
				onChange={(event) => form.setFieldValue('client_name', event.currentTarget.value)}
			/>
			<TextInput
				placeholder="Last Name"
				mt="md"
				value={form.values.client_last_name}
				error={form.errors.client_last_name}
				onChange={(event) => form.setFieldValue('client_last_name', event.currentTarget.value)}
			/>
			<TextInput
				placeholder="Email"
				mt="md"
				value={form.values.client_email}
				error={form.errors.client_email}
				onChange={(event) => form.setFieldValue('client_email', event.currentTarget.value)}
			/>
			<TextInput
				placeholder="Phone"
				mt="md"
				value={formatPhoneNumber(form.values.client_phone)}
				error={form.errors.client_phone}
				onChange={(event) => form.setFieldValue('client_phone', event.currentTarget.value)}
			/>

			<Flex gap={16} mt='md'>
				<Button
					fullWidth
					size="md"
					type='submit'
					color='teal.6'
				>
					{isEditing ? 'Save' : 'Create'}
				</Button>
				<Button
					fullWidth
					size="md"
					onClick={() => {
						return state.personalInfo.isEditing
							? state.closeSecondModal('personalInfo')
							: state.closeModal()
					}}
					color='red.6'
				>
					Cancel
				</Button>
			</Flex>
		</form>
	);
}

AddClientForm.propTypes = {
	state: PropTypes.object.isRequired
}
