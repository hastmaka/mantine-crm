import PropTypes from "prop-types";
import {ActionIcon, Card, Flex, rem, Stack, Text, Menu, Button, Group} from "@mantine/core";
import {IconDotsVertical} from "@tabler/icons-react";
import classes from "./Notes.module.scss";
import {deepSignal} from "deepsignal/react";
import {useEffect, useRef} from "react";

const noteCardSignal = deepSignal({
	isEditing: null,

	setIsEditing: (note_id) => {
		noteCardSignal.isEditing = note_id
	},
	cancelIsEditing: () => {
		noteCardSignal.isEditing = null
	}
})

export default function NoteCard ({item, handleCUD, newNote, setNewNote}) {
	const {note_severity, updated_at, created_at, note_who, note_content, note_id} = item;
	const {isEditing, setIsEditing, cancelIsEditing} = noteCardSignal

	const contentRef = useRef();

	useEffect(() => {
		if (contentRef.current && (newNote || isEditing)) {
			contentRef.current.focus();

			// Set caret position to the end of the focusNode
			const selection = window.getSelection();
			const focusNode = contentRef.current.firstChild; // Assuming the focusNode is the first child

			if (focusNode && isEditing === item.note_id) {
				const range = document.createRange();

				range.setStart(focusNode, focusNode.length || 0);
				range.collapse(true);

				selection.removeAllRanges();
				selection.addRange(range);
			}
		}
	}, [newNote, isEditing, item.note_id]);


	useEffect (() => {
		console.log (isEditing, note_id)
	}, [isEditing,note_id])

	return (
		<Card className={classes.card}>
			<Flex justify='space-between'>
				<Stack gap={0}>
					<Text>{note_who}</Text>
					{!newNote && <Group>
						<Text size='xs' c='dark.2'>{`Create: ${created_at}`}</Text>
						{updated_at &&
							<Text size='xs' c='dark.2'>{`Last Updated: ${updated_at}`}</Text>
						}
					</Group>}

				</Stack>

				{!newNote && <Menu shadow="md">
					<Menu.Target>
						<ActionIcon
							size={36}
							variant='transparent'
							aria-label="notes options"
						>
							<IconDotsVertical style={{width: rem (20)}}/>
						</ActionIcon>
					</Menu.Target>
					<Menu.Dropdown>
						<Menu.Item onClick={() => setIsEditing(note_id)}>
							Edit
						</Menu.Item>
						<Menu.Item onClick={() => handleCUD(note_id, null, 'delete')}>
							Delete
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>}
			</Flex>

			<Stack
				ref={contentRef}
				pt='16px'
				contentEditable={isEditing === note_id || newNote}
				suppressContentEditableWarning={true}
				style={{outline: 'none'}}
			>
				{note_content}
			</Stack>
			{(isEditing === note_id || newNote) && (
				<Flex gap={16} mt='md' w='220px'>
					<Button
						fullWidth
						size="md"
						color='teal.6'
						onClick={() => {
							if (isEditing) {
								cancelIsEditing()
								//check if note change
								let newContent = contentRef.current.innerText.trim().replace(/\s+/g, ' ')
								if(note_content !== newContent) {
									handleCUD(note_id, newContent, 'update')
								}
							} else {
								handleCUD(null, contentRef.current.innerText, 'create')
							}
						}}
					>
						Save
					</Button>
					<Button
						fullWidth
						size="md"
						onClick={() => {
							if(newNote) {
								setNewNote(false)
							} else {
								cancelIsEditing()
								contentRef.current.innerText = item.note_content
							}
						}}
						color='red.6'
					>
						Cancel
					</Button>
				</Flex>
			)}

		</Card>
	);
}

NoteCard.propTypes = {
	item: PropTypes.object.isRequired,
	// handleCUD,
	// newNote,
	// setNewNote
}
