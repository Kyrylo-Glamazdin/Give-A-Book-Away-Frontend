import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import '../Styles/PostButtons.css';


const conditionOptions = [
  {
    key: 'Old',
    text: 'Old',
    value: 'Old',
    
  },
  {
    key: 'Slightly Used',
    text: 'Slightly Used',
    value: 'Slightly Used',
    
  },
  {
    key: 'New',
    text: 'New',
    value: 'New',
    
  },
  
]

const DropdownExampleSelection = () => (
  <Dropdown 
  className='button'
    placeholder='Select Book Condition'
    fluid
    selection
    options={conditionOptions}
  />
)

export default DropdownExampleSelection