import React from 'react'

export default function CheckBox(props) {
    return (
        <div className="custom-checkbox">
            <div className={props.checked ? 'checked' : ''}></div>
        </div>
    )
}
