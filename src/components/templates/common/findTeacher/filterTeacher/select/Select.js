import React from 'react';

import styled from 'styled-components';
import Flag from '../../../../../../assets/icons/flag_icon.svg'

const SelectOption = styled.div`
    padding: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    &:hover {
        background-color: #e5e4e4;
    }
`

function Select(props) {

    const { name, options, value, setValue, width, flagSrc, setFlagSrc } = props;

    const [show, setShow] = React.useState(false);
    const ref = React.useRef();

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setShow(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [value]);

    // specific to language
    // const [flagSrc, setFlagSrc] = React.useState(Flag);

    return (
        <div style={{ width: width >= 992 ? '12vw' : '50vw' }}>
            <div onClick={() => { setShow(!show) }} style={{ cursor: 'pointer', padding: '10px 20px', display: 'flex', justifyContent: 'space-around', backgroundColor: '#fefeff', borderRadius: '10px', boxShadow: '0px 0px 10px 0px rgb(0 0 0 / 0.1)' }}>
                {name === 'lang' && <img src={flagSrc} alt="flag_icon" style={{ marginRight: '10px', marginTop: '2px', width: '20px', height: '20px' }} />}
                {value}
            </div>

            {show ?
                <div ref={ref} style={{ borderRadius: '10px', maxHeight: '70vh', overflowY: name === "lang" ? 'scroll' : "none", marginTop: '10px', backgroundColor: '#fefeff', position: width >= 992 ? 'absolute' : 'relative' }}>
                    {options.map((item, index) => (
                        <SelectOption key={index}
                            onClick={() => {
                                name === 'lang' && setFlagSrc(item.flag);
                                name === 'lang' ? setValue(item.value) : setValue(item);
                                setShow(false)
                            }}
                        >
                            {name === 'lang' && <img src={item.flag} alt="flag_img" style={{ marginRight: '10px', width: '20px', height: '20px' }} />}
                            {name === 'lang' ? item.value : item}
                        </SelectOption>
                    ))}
                </div>
                :
                <></>
            }
        </div>
    )
}

export default Select;