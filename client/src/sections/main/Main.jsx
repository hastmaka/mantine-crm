import {ActionIcon, AppShell, Burger, Center, Group, Text} from '@mantine/core';
import {generalSignal} from "../../signals/generalSignal.js";
import TabPanel from "./TabPanel.jsx";
import {IconBell, IconUserCircle} from "@tabler/icons-react";

export default function Main () {
	const {burger} = generalSignal

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{
				// width: burger.toggle ? 50 : 200,
				// breakpoint: 'sm',
				// collapsed: { mobile: !opened },
			}}
			// padding="md"
		>
			<AppShell.Header>
				<Group h='100%'>
					<Center
						style={{
							transition: 'all 200ms',
							width: burger.toggle ? '60px' : '160px'
						}}
					>
						<Text>{`RY&L`}</Text>
					</Center>
					<Group justify="space-between" flex={1} p='0 16px 0 0'>
						<Burger
							opened={burger.toggle}
							onClick={generalSignal.toggleBurger}
							size="sm"
						/>

						<Group gap={8}>
							<ActionIcon variant="default" radius="xl" size="lg" aria-label="notifications">
								<IconBell/>
							</ActionIcon>
							<ActionIcon variant="default" radius="xl" size="lg" aria-label="profile">
								<IconUserCircle/>
							</ActionIcon>
						</Group>
					</Group>

				</Group>
			</AppShell.Header>

			<AppShell.Main>
				<TabPanel/>
			</AppShell.Main>
		</AppShell>
	);
}
