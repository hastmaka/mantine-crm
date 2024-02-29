import {
	Paper,
	Title,
	Center, Text, ActionIcon, Box, Flex, Loader, Button,
} from '@mantine/core';
import {IconMoonStars, IconSun} from "@tabler/icons-react";
import {themeSignal} from "../../signals/themeSignal.js";
import {loginSignal} from "../../signals/loginSignal.js";
import PowerBy from "../../components/PowerBy.jsx";
import {lazy, Suspense} from "react";
import {FetchApi} from "../../api/FetchApi.js";
//dynamic
const SignIn = lazy(() => import('./signIn'))
const Forgot = lazy(() => import('./forgot'))
const Create = lazy(() => import('./create'))

const title = {
	signIn: 'Sign In',
	forgot: 'Forgot',
	create: 'Sign Up'
}

const color = {
	error: 'red.5',
	warning: 'orange.5',
	success: 'green.5'
}

const loginForms = {
	signIn: <SignIn/>,
	forgot: <Forgot/>,
	create: <Create/>,
}

export default function Login() {
	const {active, loginMessage} = loginSignal
	
	return (
		<Center h='100vh' pos='relative'>
			<Box pos='absolute' top={10} right={10}>
				<ActionIcon
					variant="default"
					radius="xl"
					size="lg"
					aria-label="profile"
					onClick={themeSignal.toggleTheme}
				>
					{themeSignal.theme === 'dark' ? <IconSun /> : <IconMoonStars />}
				</ActionIcon>
			</Box>
			<Box pos='absolute' bottom={10} right={10}>
				<PowerBy/>
			</Box>
			
			<Flex direction='column'>
				<Title order={3}  ta="center" p={20}>
					Ez-Realtop
				</Title>
				
				<Paper withBorder radius={4} p={16} w='350px' shadow='xl'>
					<Text ta="center" pb={20} c={color[loginMessage.type]}>
						{loginMessage.msg || title[active]}
					</Text>
					<Suspense fallback={<Center><Loader/></Center>}>
						{loginForms[active]}
					</Suspense>
				</Paper>
				
				{/*<Button*/}
				{/*	onClick={() => {*/}
				{/*		FetchApi(*/}
				{/*			'test',*/}
				{/*			null,*/}
				{/*			null,*/}
				{/*		).then(res => {*/}
				{/*			if(res.status === 200) {*/}
				{/*				console.log ('server working')*/}
				{/*			}*/}
				{/*		})*/}
				{/*	}}*/}
				{/*>test cors</Button>*/}
			</Flex>
		</Center>
	);
}