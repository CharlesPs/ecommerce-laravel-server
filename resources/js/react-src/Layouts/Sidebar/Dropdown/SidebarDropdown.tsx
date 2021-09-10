
import React from 'react';
import Dropdown from 'react-bootstrap/esm/Dropdown';
import Toggle from './Toggle';
import Menu from './Menu'

const SidebarDropdown = (props: any) => {

    return (
        <Dropdown drop="up">
            <Dropdown.Toggle as={Toggle}>
                {props.toggle}
            </Dropdown.Toggle>
            <Dropdown.Menu as={Menu}>
                {props.menu}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default SidebarDropdown
