import PropTypes from "prop-types";
import {Flex, Skeleton} from "@mantine/core";

export default function Dashboard () {
	return (
		<Flex direction='row' flex={1} justify='space-between' gap={8}>
			<Flex flex={1} direction='column' gap={8}>
				<Flex flex={1} direction='row' gap={8}>
					<Flex flex={1}><Skeleton animate={false}/></Flex>
					<Flex flex={1}><Skeleton animate={false}/></Flex>
				</Flex>
				<Flex flex={1} direction='row' gap={8}>
					<Flex flex={1}><Skeleton animate={false}/></Flex>
					<Flex flex={1}><Skeleton animate={false}/></Flex>
				</Flex>
			</Flex>
			
			<Flex w='250px' b={1}>
				<Skeleton animate={false}/>
			</Flex>
		</Flex>
	);
}

Dashboard.propTypes = {}