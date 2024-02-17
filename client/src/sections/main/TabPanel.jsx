import {Flex, Tabs} from "@mantine/core";
import { IconUsers, IconLayoutDashboard, IconLogin } from '@tabler/icons-react';
import {generalSignal} from "../../signals/generalSignal.js";
import {useState} from "react";
import Dashboard from "./views/dashboard/Dashboard.jsx";
import Clients from "./views/clients/Clients.jsx";
import Test from "./views/test/Test.jsx";

const ITEMS = [
	{
		title: 'Dashboard',
		value: 'dashboard',
		icon: <IconLayoutDashboard width='18px'/>
	},
	{
		title: 'Clients',
		value: 'clients',
		icon: <IconUsers width='18px'/>
	},
	// {
	// 	title: 'Test',
	// 	value: 'test',
	// 	icon: <IconUsers width='18px'/>
	// },
]

const panels = {
	dashboard: <Dashboard/>,
	clients: <Clients/>,
	test: <Test/>
}

export default function TabPanel () {
	const {burger, activeView, setView} = generalSignal
	return (
		<Tabs
			defaultValue={activeView}
			orientation="vertical"
			h='calc(100vh - 60px)'
			keepMounted={false}
		>
			<Tabs.List
				w={burger.toggle ? 60 : 160}
				style={{
					transition: 'all .2s ease',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between'
				}}
			>
				<Flex direction='column'>
					{ITEMS.map(({title, value, icon}, index) =>
						<Tabs.Tab
							key={index}
							value={value}
							leftSection={icon}
							onClick={() => setView(value)}
							style={{
								transition: 'all .2s ease',
								padding: burger.toggle ? '.5rem 0' : '.5rem 0 .5rem 1rem',
								justifyContent: burger.toggle ? 'center' : ''
							}}
						>{!burger.toggle && title}</Tabs.Tab>
					)}
				</Flex>

				<Tabs.Tab
					value='logout'
					leftSection={<IconLogin width='18px'/>}
					style={{
						transition: 'all .2s ease',
						padding: burger.toggle ? '.5rem 0' : '.5rem 0 .5rem 1rem',
						justifyContent: burger.toggle ? 'center' : ''
					}}
					onClick={() => {
						setView('login')
						window.localStorage.clear()
					}}
				>
					{!burger.toggle && 'LogOut'}
				</Tabs.Tab>
			</Tabs.List>

			<Tabs.Panel value={activeView} p={8} style={{display: 'flex'}}>
				{panels[activeView]}
			</Tabs.Panel>
		</Tabs>
	);
}

TabPanel.propTypes = {}

