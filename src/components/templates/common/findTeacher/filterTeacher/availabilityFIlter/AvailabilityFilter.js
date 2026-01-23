import React from 'react';

import styled from 'styled-components';

const SelectOption = styled.div`
    padding: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    &:hover {
        background-color: #e5e4e4;
    }
`

function AvailabilityFilter(props) {

    const { timeOptions, dayOptions, value, setValue, width } = props;

    const [time, setTime] = React.useState('');
    const [day, setDay] = React.useState('');

    const [show, setShow] = React.useState(false);
    const ref = React.useRef();

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setShow(false);
        }
    };

    React.useEffect(() => {
        if (time !== "" && day !== "") {
            setValue(time + " " + day);
        }
    }, [time, day, setValue]);

    React.useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return (
        <>
            {width >= 992 ?
                <div style={{ zIndex: '200', width: '12vw' }}>
                    <div onClick={() => { setShow(!show) }} style={{ cursor: 'pointer', padding: '10px 20px', display: 'flex', justifyContent: 'space-around', backgroundColor: '#fefeff', borderRadius: '10px', boxShadow: '0px 0px 10px 0px rgb(0 0 0 / 0.1)' }}>
                        {value}
                    </div>

                    {/* Up and Down Arrow keys */}
                    {/* <div style={{ width: '20px', height: '20px' }}>
                {show ?
                    <img src="./assets/icons/up-arrow.svg" style={{ cursor: 'pointer', zIndex: '101', width: '100%', height: '100%'}} onClick={() => setShow(false)} />
                    :
                    <img src="./assets/icons/down_arrow_icon.svg" style={{ cursor: 'pointer', zIndex: '101', width: '100%', height: '100%' }} onClick={() => setShow(true)} />
                }
            </div> */}

                    {show ?
                        <div ref={ref} style={{ borderRadius: '10px', maxHeight: '70vh', marginTop: '10px', backgroundColor: '#fefeff', position: 'absolute', display: 'flex', justifyContent: 'center' }}>
                            <div style={{ padding: '10px', width: '35vw' }}>
                                <div>Time of Day</div>
                                <div style={{ margin: '5px', display: 'flex', justifyContent: 'center' }}>
                                    {timeOptions.map((item, index) => (
                                        <SelectOption onClick={() => {
                                            setTime(item.label);
                                            if (day !== "") {
                                                setShow(false);
                                            }
                                        }}>
                                            <div style={{ padding: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                <img src={item.img} alt="time_img" style={{ width: '20px', height: '20px' }} />
                                                <div>{item.label}</div>
                                                <div>{item.time}</div>
                                            </div>
                                        </SelectOption>
                                    ))}
                                </div>
                                <div>
                                    Availability
                                    <div style={{ borderRadius: '10px', margin: '10px', outline: '1px solid #e5e4e4', display: 'flex', justifyContent: 'space-between' }}>
                                        {dayOptions.map((item, index) => (
                                            <SelectOption style={{ borderRadius: '10px' }} onClick={() => {
                                                setDay(item);
                                                if (time !== "") {
                                                    setShow(false)
                                                }
                                            }}>
                                                {item}
                                            </SelectOption>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <></>
                    }
                </div>
                :
                <div style={{ width: '50vw' }}>
                    <div onClick={() => { setShow(!show) }} style={{ cursor: 'pointer', padding: '10px 20px', display: 'flex', justifyContent: 'space-around', backgroundColor: '#fefeff', borderRadius: '10px', boxShadow: '0px 0px 10px 0px rgb(0 0 0 / 0.1)' }}>
                        {value}
                    </div>

                    {/* Up and Down Arrow keys */}
                    {/* <div style={{ width: '20px', height: '20px' }}>
                {show ?
                    <img src="./assets/icons/up-arrow.svg" style={{ cursor: 'pointer', zIndex: '101', width: '100%', height: '100%'}} onClick={() => setShow(false)} />
                    :
                    <img src="./assets/icons/down_arrow_icon.svg" style={{ cursor: 'pointer', zIndex: '101', width: '100%', height: '100%' }} onClick={() => setShow(true)} />
                }
            </div> */}

                    {show ?
                        <div ref={ref} style={{ borderRadius: '10px', maxHeight: '70vh', marginTop: '10px', backgroundColor: '#fefeff', position: 'relative', display: 'flex', justifyContent: 'center' }}>
                            <div style={{ padding: '10px', width: '90vw' }}>
                                <div>Time of Day</div>
                                <div style={{ margin: '2px', display: 'flex', justifyContent: 'center' }}>
                                    {timeOptions.map((item, index) => (
                                        <SelectOption onClick={() => {
                                            setTime(item.label);
                                            if (day !== "") {
                                                setShow(false);
                                            }
                                        }}>
                                            <div style={{ padding: '2px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                <img src={item.img} alt="time_img" style={{ width: '20px', height: '20px' }} />
                                                <div>{item.label}</div>
                                                <div>{item.time}</div>
                                            </div>
                                        </SelectOption>
                                    ))}
                                </div>
                                <div>
                                    Availability
                                    <div style={{ borderRadius: '10px', margin: '3px', outline: '1px solid #e5e4e4', display: 'flex', justifyContent: 'space-between' }}>
                                        {dayOptions.map((item, index) => (
                                            <SelectOption style={{ borderRadius: '10px' }} onClick={() => {
                                                setDay(item);
                                                if (time !== "") {
                                                    setShow(false)
                                                }
                                            }}>
                                                {item}
                                            </SelectOption>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <></>
                    }
                </div>
            }
        </>

    )
}

export default AvailabilityFilter;