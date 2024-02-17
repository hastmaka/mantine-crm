import PropTypes from "prop-types";
import {
	Button,
	Flex, MultiSelect,
	NumberInput,
	Select,
	Stack,
	Text
} from "@mantine/core";
import {useForm} from "@mantine/form";
import {LasVegasZipCodes} from "../../../../../../static/LasVegasZipCodes.js";

export default function BuyFields ({state}) {
	const initData = state.isEditingService ? state.serviceInitialData.buy : state.serviceInitialDataStatic.buy
	const form = useForm({
		initialValues: {...initData},

		validate: {
			service_bed: (value) => !value.length ? `Can't be Empty` : null,
			service_bath: (value) => !value.length ? `Can't be Empty` : null,
			service_pre_approval: (value) => value < 10000 ? `Value more than 10,000` : null,
			service_zip: (value) => value.length === 0 ? `Can't be Empty` : null
		},
		validateInputOnChange: true
	});

	return (
		<Stack component='form' onSubmit={form.onSubmit(state.handleSubmitService)}>
			<Flex align='center' gap={16}>
				<Text w='100px'>Bed</Text>
				<Select
					flex={1}
					placeholder="Please Choose"
					data={['Any', '1+', '2+', '3+', '4+', '5+', '6+']}
					value={form.values.service_bed}
					error={form.errors.service_bed}
					onChange={(v) => form.setFieldValue('service_bed', v)}
				/>
			</Flex>

			<Flex align='center' gap={16}>
				<Text w='100px'>Bath</Text>
				<Select
					flex={1}
					placeholder="Please Choose"
					data={['Any', '1+', '2+', '3+', '4+', '5+', '6+']}
					value={form.values.service_bath}
					error={form.errors.service_bath}
					onChange={(v) => form.setFieldValue('service_bath', v)}
				/>
			</Flex>

			<Flex align='center' gap={16}>
				<Text w='100px'>Pre Approval</Text>
				<NumberInput
					flex={1}
					prefix="$"
					placeholder="How Much"
					thousandSeparator=","
					value={form.values.service_pre_approval}
					error={form.errors.service_pre_approval}
					onChange={(v) => form.setFieldValue('service_pre_approval', v)}
				/>
			</Flex>

			<Flex align='center' gap={16}>
				<Text w='100px'>Zip Code</Text>
				<MultiSelect
					flex={1}
					placeholder="Add as much as needed"
					data={LasVegasZipCodes}
					searchable
					clearable
					value={form.values.service_zip}
					error={form.errors.service_zip}
					onChange={(v) => form.setFieldValue('service_zip', v)}
				/>
			</Flex>



			<Flex gap={16}>
				<Button
					fullWidth
					size="md"
					type='submit'
					color='teal.6'
				>
					Create
				</Button>
				<Button
					fullWidth
					size="md"
					onClick={state.closeSecondModal}
					color='red.6'
				>
					Cancel
				</Button>
			</Flex>
		</Stack>
	);
}

BuyFields.propTypes = {
	state: PropTypes.object.isRequired
}
