import PropTypes from 'prop-types';
import {Flex, Tabs} from "@mantine/core";
import {deepSignal} from "deepsignal/react";
import Notes from "./notes/Notes.jsx";
import Documents from "./documents/Documents.jsx";

const center = deepSignal({
    activeTab: '1',
    setTab(tab){
        center.activeTab = tab
    }
})

export default function Center({state}) {
    return (
        <Flex flex={1}>
            <Tabs
                value={center.activeTab}
                onChange={(val) => center.setTab(val)}
                w='100%'
                pos='relative'
                style={{overflowY: 'auto'}}
            >
                <Tabs.List
                    pos='sticky'
                    style={{top: 0, zIndex: 1000}}
                    bg='dark.7'
                >
                    <Tabs.Tab value='1' style={{borderRadius: 0}}>Notes</Tabs.Tab>
                    <Tabs.Tab value='2' style={{borderRadius: 0}}>Documents</Tabs.Tab>
                </Tabs.List>


                <Tabs.Panel value="1" p={16} id='panel'>
                    <Notes state={state}/>
                </Tabs.Panel>

                <Tabs.Panel value="2" p={16}>
                    <Documents/>
                </Tabs.Panel>
            </Tabs>
        </Flex>
    );
};

Center.propTypes = {
    state: PropTypes.object.isRequired
};
