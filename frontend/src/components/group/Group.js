
import React from 'react';
import Field from '../field/Field';


const Group = ({formField,group,handleChange}) => {
    return (
        <div>
            <legend style={{ 'color': '#4d627b', 'text-align': 'left' }}>{group.Nome}</legend>
            <div className='row'>
                {formField.filter((p) => {
                    if (p.IdPropriedadeGrupo === group.Id)
                        return p;
                }).map((field) => (
                    <Field field={field} handleChange={handleChange} />
                ))}
            </div>
        </div>
    );
};

export default Group;
