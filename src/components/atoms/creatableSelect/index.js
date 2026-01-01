import React from "react";
import CreatableSelect from "react-select/creatable";
import './styles.css'
//To be Customised further...

const CreatableSelectOption = (props) => {
  const { className,classNamePrefix, defaultValue,isMultipleValue, isDisabled, isClearable, isSearchable, name, options, onChange, ...custom} = props
  return (
    <CreatableSelect
          className={className}
          classNamePrefix={classNamePrefix}
          isDisabled={isDisabled}   ///to disable
          isClearable={isClearable} ///having clear option x
          name={name}
          options={options}
          onChange={onChange}
          isMulti={isMultipleValue}///multiple option select
          {...custom}
          menuPortalTarget={document.body} 
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            menu: (provided) => ({ ...provided, zIndex: 9999 }),
          }}
        />

  )
};


CreatableSelect.defaultProps = {
  className:'',
 isDisabled:false,
 isClearable:false,
 name:'creatableSelect',
 isMultipleValue:false,
  options:[], ///{ value: '', label: '' } example option value label pair
};

export default CreatableSelectOption;
