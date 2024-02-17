import PropTypes from "prop-types";
import {ActionIcon, Flex, Text, TextInput, Tooltip, rem} from "@mantine/core";
import classes from './Toolbar.module.scss'
import {IconPlus, IconSearch} from "@tabler/icons-react";
import {useRef, useState} from "react";
import {useClickOutside} from "@mantine/hooks";
import {useEnterKeySubmit} from "../../../util/hooks/index.js";

export default function ToolBar ({state}) {
	const inputRef = useRef(null);
	// const ref = useClickOutside(() => inputRef.current.placeholder = 'Search...');
	const [search, setSearch] = useState({
		value: '', error: ''
	})

	const handleSearch = (e, ref) => {
		const value = e.key === 'Enter' ? ref.current.value : inputRef.current.value;
		const tempRef = e.key === 'Enter' ? ref : inputRef
		//empty input
		if (!value) {
			tempRef.current.placeholder = 'Enter some value first'
		} else {
			if(!(/^[a-zA-Z0-9]+$/.test(value))) {
				tempRef.current.value = ''
				return tempRef.current.placeholder = 'Only letters and numbers allow'
			}
			if(value.trim().length <= 3) {
				tempRef.current.value = ''
				return tempRef.current.placeholder = 'Min 3 characters to start a search'
			}
			state.handleSearch(value)
		}
	}

	const handleInputChange = (e) => {
		if(!e.target.value) {
			inputRef.current.placeholder = 'Search...'
			state.handleSearch()
		}
	}

	useEnterKeySubmit(inputRef, handleSearch);

	return (

		<Flex
			justify='space-between'
			align='center'
			p='0 .5rem'
			direction='row'
			h={50}
			className={classes.toolbar}
		>
			<ActionIcon
				onClick={() => state.openModal({who: 'addClient', title: 'Create Client'})}
				size={36} variant="default" aria-label="Edit Action Button"
			>
				<IconPlus
					style={{width: rem (20)}}
					// className={classes.editIcon}
				/>
			</ActionIcon>

			<Tooltip
				multiline
				w={300}
				label={<Text>
					<Text component='span' size='xs'><Text component='span' c='blue.5' size='xs'>Min Char: </Text>More than 3 characters</Text>
					<br/>
					<Text component='span' size='xs'><Text component='span' c='blue.5' size='xs'>Reset Grid: </Text>Leave in blank</Text>
				</Text>}
				color='dark.6'
				position='bottom'
			>
				<TextInput
					ref={inputRef}
					w='300px'
					leftSectionPointerEvents="none"
					leftSection={<IconSearch/>}
					placeholder={search.error || 'Search ...'}
					// value={search.value}
					error={search.error}
					onChange={handleInputChange}

				/>
			</Tooltip>
		</Flex>

	);
}

ToolBar.propTypes = {
	state: PropTypes.object.isRequired
}
