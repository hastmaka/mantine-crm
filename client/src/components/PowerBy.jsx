import {Anchor, Flex, Text} from "@mantine/core";

export default function PowerBy () {
	return (
		<Flex direction='row' gap={4} c='blue.2'>
			<Text>
				Power by:
			</Text>
			<Anchor href='https://www.ryl.vegas'>
				RY&L
			</Anchor>
		</Flex>
	);
}

PowerBy.propTypes = {}