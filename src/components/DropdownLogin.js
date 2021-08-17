import React from 'react'
import { Dropdown } from 'semantic-ui-react'

// TODO: This is missing functionality for sub-menu here from SUI core examples.
// The "Publish To Web" item should contain a sub-menu.

const dropdownText = (
    <p className='custom_margin_null main_header_items flex-direction-column'>
        <span>admin@test</span>
        <br/>
        <span>99.9 <sup>₼</sup></span>
    </p>
)

const DropdownLogin = () => (
    <Dropdown  className='flex-direction-column-center' text={dropdownText}>
        <Dropdown.Menu>
            <Dropdown.Item text='Profil' />
            <Dropdown.Item text='Yoxlama' />
            <Dropdown.Item text='Ayarlar'  />
            <Dropdown.Item text='Balans artır' />
            <Dropdown.Divider />
            <Dropdown.Item text='Çıxış' />
        </Dropdown.Menu>
    </Dropdown>
)

export default DropdownLogin