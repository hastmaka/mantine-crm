import PropTypes from 'prop-types';
import {loginSignal} from "../../../../../../signals/loginSignal.js";
import {useEffect} from "react";
import {ActionIcon, Flex, rem, Stack, Text, Tooltip} from "@mantine/core";
import {IconPlus} from "@tabler/icons-react";
import classes from "../../../../../../ezM/MantineGrid/MantineGrid.module.scss";
import NoteCard from "./NoteCard.jsx";
import {deepSignal} from "deepsignal/react";
import DOMPurify from 'dompurify';
import {capitalizeFirstLetter} from "../../../../../../util/index.js";

const noteSignal = deepSignal({
    noteData: [],
    initialData: {
        note_severity: 'normal',
        note_content: '',
        note_who: `${loginSignal.user?.user_name} ${loginSignal.user?.user_last_name}`
    },
    newNote: false,
    setNoteData: (notes) => {
        noteSignal.noteData = notes
    },
    setNewNote: (val) => {
        noteSignal.newNote = val
    }
})

export default function Notes({state}) {
    const {client_id} = state.selectedRow;
    const {notes} = state;
    const {noteData, newNote, initialData, setNoteData, setNewNote} = noteSignal

    //fix to update note when change
    useEffect(() => {
        setNoteData(notes)
    }, [notes])

    const handleCUD = (id, content, action) => {
        const crud = {
            create: () => {
                const contentChecked = DOMPurify.sanitize(content.trim().replace(/\s+/g, ' '), { USE_PROFILES: { html: true } })
                if (contentChecked) {
                    state.handleCreateNote({
                        ...initialData,
                        note_content: contentChecked
                    })
                }
                setNewNote(false)
            },
            update: () => {
                const contentChecked = DOMPurify.sanitize(content, { USE_PROFILES: { html: true } })
                if (contentChecked) {
                    let note = {
                        note_who: `${loginSignal.user?.user_name} ${loginSignal.user?.user_last_name}`,
                        note_content: contentChecked
                    }
                    state.handleUpdateNote(id, note)
                }
                setNewNote(false)
            },
            delete: () => {
                state.handleDeleteNote(id)
            },
        }

        crud[action]()
    }
    // debugger
    return (
        <Stack>
            <Flex justify={'space-between'} align='center'>
                {!noteData.length
                    ? <Text>{`Don't have Notes on this client yet`}</Text>
                    : <Text>{`Service ${capitalizeFirstLetter(state.activeService)}: ${state.service.find(s=>s.service_id===state.serviceId).created_at}`}</Text>
                }
                <Tooltip label="Add Note" color='dark.6' withArrow position='top-end'>
                    <ActionIcon
                        size={36}
                        variant="default"
                        aria-label="Edit Action Button"
                        onClick={() => setNewNote(true)}
                    >
                        <IconPlus
                            style={{width: rem (20)}}
                            className={classes.editIcon}
                        />
                    </ActionIcon>
                </Tooltip>
            </Flex>

            {newNote &&
                <NoteCard
                    item={initialData}
                    handleCUD={handleCUD}
                    newNote={newNote}
                    setNewNote={setNewNote}
                />
            }

            {noteData.length > 0 &&
                noteData.map(item => {
                    return <NoteCard
                        key={item.note_id}
                        item={item}
                        handleCUD={handleCUD}
                        // setNewNote={setNewNote}
                    />
                })
            }

        </Stack>
    );
};

Notes.propTypes = {
    state: PropTypes.object.isRequired
};
