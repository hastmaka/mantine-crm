import {loginSignal} from "../../signals/loginSignal.js";
import {Anchor, Button, Flex, PasswordInput, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";

export default function Create () {
	const form = useForm({
		initialValues: {
			name: '',
			last_name: '',
			email: '',
			password: '',
			confirm_password: ''
		},

		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
			password: (val) => (val.length <= 5 ? 'Password should include at least 6 characters' : null),
			confirm_password: (val, {password}) => (val === password ? null : 'Passwords do not match'),
		},
	});
	return (
		<form onSubmit={form.onSubmit(loginSignal.handleSubmit)}>
			<Flex direction='row' gap={16}>
				<TextInput
					placeholder="Name"
					size="lg" mt="md"
					required
					value={form.values.name}
					onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
				/>
				<TextInput
					placeholder="Last Name"
					size="lg" mt="md"
					required
					value={form.values.last_name}
					onChange={(event) => form.setFieldValue('last_name', event.currentTarget.value)}
				/>
			</Flex>
			<TextInput
				placeholder="Email"
				size="lg" mt="md"
				required
				value={form.values.email}
				onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
				error={form.errors.email}
			/>
			<PasswordInput
				placeholder="Password"
				mt="md" size="lg"
				required
				value={form.values.password}
				onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
				error={form.errors.password}
			/>
			<PasswordInput
				placeholder="Confirm Password"
				mt="md" size="lg"
				required
				value={form.values.confirm_password}
				onChange={(event) => form.setFieldValue('confirm_password', event.currentTarget.value)}
				error={form.errors.confirm_password}
			/>
			<Button
				fullWidth
				mt="xl" size="md" type='submit'
				loading={loginSignal.loadingBtn}
			>
				Create
			</Button>

			<Flex p='16px 0' justify='space-between'>
				<Anchor
					onClick={() => {
						form.reset()
						loginSignal.handleChangeLogin ('signIn')
					}}
				>Sign In</Anchor>
			</Flex>
		</form>
	);
}

Create.propTypes = {}
