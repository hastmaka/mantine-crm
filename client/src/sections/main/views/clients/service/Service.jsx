import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {Accordion, Button, Flex, Menu, rem, Text, Tooltip} from "@mantine/core";
import classes from './Service.module.scss'
import {formatMoney} from "../../../../../util/index.js";
import {IconPencil, IconStatusChange, IconTrash} from "@tabler/icons-react";

const ServiceItem = ({service}) => {
    //sort keys inside the object to always have the same structure
    const sortedObj = Object.keys (service).sort ().reduce ((sorted, key) => ({...sorted, [key]: service[key]}), {})
    const filteredObj = Object.entries(sortedObj).filter(s => !([null, '', undefined].includes(s[1])))
    const formatField = {
        service_bath: 'Bath',
        service_bed: 'Bed',
        service_zip: 'Zip',
        service_status: 'Status',
        service_pet: 'Pet',
        service_price_from: 'Price From',
        service_price_to: 'Price To',
        service_pre_approval: 'Pre Approval',
    }
    return filteredObj.map(([field, value]) => {
        if(!([
            'client_client_id',
            'service_note',
            'service_document',
            'service_type',
            'service_id',
            'created_at',
            'updated_at'
        ].includes(field))) {
            const t = (v) => {
                switch (field) {
                    case 'service_price_from':
                    case 'service_price_to':
                    case 'service_pre_approval':
                        return formatMoney(v)
                    default:
                        return v
                }
            }
            return <Text key={field}>
                {`${formatField[field]}: ${t(value)}`}
            </Text>
        }
    })
}

export default function Service({state}) {
    const {service, handleEditService, handleUpdateStatus} = state
    const [upService, setUpService] = useState({});
    const [menuOpen, setMenuOpen] = useState(null);

    useEffect(() => {
        // Run this code every time 'service' changes
        const updatedService = service
            .slice() // Create a shallow copy to avoid modifying the original array
            .sort((a, b) => {
                const order = ['buy', 'sell', 'rent']; // Define your desired order
                return order.indexOf(a.service_type) - order.indexOf(b.service_type);
            })
            .reduce((result, service) => {
                const { service_type, ...rest } = service;
                if (!result[service_type]) result[service_type] = [];
                result[service_type].push({ ...service });
                return result;
            }, {});

        setUpService(updatedService);
    }, [service]);


    const renderItem = (service) => {
        if (service.length) {
            return service.map((s, index) => {
                return <Accordion.Item
                    value={`${s.service_type}-${index.toString()}-${s.created_at}`}
                    key={index}
                    className={classes.item}
                >
                    <Accordion.Control onClick={() => state.handleGetNotesAndDocuments(s.service_id)}>
                        <Flex justify='space-between'>
                            {s.created_at}
                            <Flex pr='.5rem' gap='.5rem'>
                                <Menu
                                    opened={s.service_id === menuOpen}
                                    onChange={() => {
                                        if(menuOpen !== null)setMenuOpen(null)
                                    }}
                                >
                                    <Menu.Target>
                                        <IconTrash
                                            style={{width: rem (20)}}
                                            className={classes.deleteIcon}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setMenuOpen(s.service_id)
                                            }}
                                        />
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        <Text p='.5rem'>Confirm to delete this service</Text>
                                        <Flex gap={8}>
                                            <Button
                                                fullWidth
                                                size="xs"
                                                color='teal.6'
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    setMenuOpen(null)
                                                    state.handleDeleteService(s)
                                                }}
                                            >
                                                Ok
                                            </Button>

                                        </Flex>
                                    </Menu.Dropdown>
                                </Menu>
                                <Menu trigger='hover'>
                                    <Menu.Target>
                                        <IconStatusChange
                                            style={{width: rem (20)}}
                                            className={classes[s.service_status]}
                                            onClick={(e) => {e.stopPropagation()}}
                                        />
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        <Menu.Label>Status</Menu.Label>
                                        <Menu.Item
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleUpdateStatus(s.service_id, 'pending')
                                            }}
                                            leftSection={
                                                <IconStatusChange
                                                    className={classes.pending}
                                                    style={{width: rem (20)}}
                                                />
                                            }
                                        >
                                            Pending
                                        </Menu.Item>
                                        <Menu.Item
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleUpdateStatus(s.service_id, 'on-progress')
                                            }}
                                            leftSection={
                                                <IconStatusChange
                                                    className={classes['on-progress']}
                                                    style={{width: rem (20)}}
                                                />
                                            }
                                        >
                                            On Progress
                                        </Menu.Item>
                                        <Menu.Item
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleUpdateStatus(s.service_id, 'done')
                                            }}
                                            leftSection={
                                                <IconStatusChange
                                                    className={classes.done}
                                                    style={{width: rem (20)}}
                                                />
                                            }
                                        >
                                            Done
                                        </Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                                <Tooltip label="Edit Service" color='dark.6' withArrow position='top-start'>
                                    <IconPencil
                                        style={{width: rem (20)}}
                                        className={classes.editIcon}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleEditService(s)
                                        }}
                                    />
                                </Tooltip>
                            </Flex>
                        </Flex>
                    </Accordion.Control>
                    <Accordion.Panel>{renderItem(s)}</Accordion.Panel>
                </Accordion.Item>
            })
        } else {
            return <ServiceItem service={service} />
        }
    }

    const [value, setValue] = useState([]);
    return (
        <Accordion
            multiple
            value={value}
            onChange={setValue}
            variant='contained'
            className={classes.accordion}
        >
            {Object.keys(upService).map((ser_type, index) => {
                return <Accordion.Item key={index} value={ser_type} className={classes.item}>
                    <Accordion.Control><Text>{`${ser_type} (${upService[ser_type].length})`}</Text></Accordion.Control>
                    <Accordion.Panel className={classes.panel}>
                        {renderItem(upService[ser_type])}
                    </Accordion.Panel>
                </Accordion.Item>
            })}
        </Accordion>
    );
}

Service.propTypes = {
    state: PropTypes.object.isRequired
}
