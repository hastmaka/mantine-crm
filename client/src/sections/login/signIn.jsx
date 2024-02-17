import {loginSignal} from "../../signals/loginSignal.js";
import {Anchor, Button, Flex, PasswordInput, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";

export default function SignIn () {
	const form = useForm({
		initialValues: {
			email: '', password: ''
		},
		
		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email')
		},
	});
	return (
		<form onSubmit={form.onSubmit(loginSignal.handleSubmit)}>
			<TextInput
				placeholder="Email"
				size="lg"
				required
				value={form.values.email}
				onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
				error={form.errors.email}
			/>
			<PasswordInput
				placeholder="Password"
				mt="md"
				size="lg"
				required
				value={form.values.password}
				onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
			/>
			<Button
				fullWidth
				mt="xl" size="md" type='submit'
				loading={loginSignal.loadingBtn}
			>
				Login
			</Button>
			
			<Flex p='16px 0' justify='space-between'>
				<Anchor
					onClick={() => {
						form.reset()
						loginSignal.handleChangeLogin ('forgot')
					}}
				>Forgot</Anchor>
				<Anchor
					onClick={() => {
						form.reset()
						loginSignal.handleChangeLogin ('create')
					}}
				>Create Account</Anchor>
			</Flex>
		</form>
	);
}

SignIn.propTypes = {}