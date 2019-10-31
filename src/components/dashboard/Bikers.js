import React from 'react'

import { TEXT_SELECT_BIKER } from 'constants/AppLanguage'

const Bikers = props => {
  return (
    <>
      <div className="select">
        <select required={true} onChange={props.onChange}>
          <option>{TEXT_SELECT_BIKER}</option>
          {props.bikers.map(biker => (
            <option key={biker.id} value={biker.id}>
              {biker.name} - {biker.email}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

export default Bikers
