import {loginSignal} from "../../signals/loginSignal.js";
import {Anchor, Button, Flex, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";

export default function Forgot () {
	const form = useForm({
		initialValues: {email: ''},
		
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
			<Button
				fullWidth
				mt="xl" size="md" type='submit'
				loading={loginSignal.loadingBtn}
			>
				Send
			</Button>
			
			<Flex p='16px 0' justify='flex-end' direction='row'>
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

Forgot.propTypes = {}