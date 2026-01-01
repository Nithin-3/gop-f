import React from "react";

import Select from "./select/Select";
import PriceFilter from "./priceFilter/PriceFilter";
import AvailabilityFilter from "./availabilityFIlter/AvailabilityFilter";

// import ReactFlagsSelect from 'react-flags-select';

import {
    langOptions,
    courseOptions,
    timeOptions,
    dayOptions,
} from "./filterUtils";

import { useDispatch } from "react-redux";
import { filterCourse } from "../../../../../store/actions/student/index";
// import Flag from '../../../../../../assets/icons/flag_icon.svg';
import Flag from "../../../../../assets/icons/flag_icon.svg";

function Filters(props) {
    const dispatch = useDispatch();

    const [flagSrc, setFlagSrc] = React.useState(Flag);

    var {
        focus,
        setFocus,
        width,
        setCoursesArr,
        lang,
        setLang,
        reset,
        resetRef,
    } = props;

    let allFilters = JSON.parse(localStorage.getItem("allFilters"));
    console.log("ttt", allFilters);
    // const filterStore = null;

    const [courseType, setCourseType] = React.useState(allFilters?.courseT);
    const [availability, setAvailability] = React.useState(allFilters?.availability);
    const [minPrice, setMinPrice] = React.useState(allFilters?.minPrice);
    const [maxPrice, setMaxPrice] = React.useState(allFilters?.maxPrice);
    const [motherTongue, setMotherTongue] = React.useState(allFilters?.motherT);
    const [from, setFrom] = React.useState(allFilters?.from);
    // const [courseType, setCourseType] = React.useState("Course");
    // const [availability, setAvailability] = React.useState('Availability');
    // const [minPrice, setMinPrice] = React.useState(0);
    // const [maxPrice, setMaxPrice] = React.useState(200);
    // const [motherTongue, setMotherTongue] = React.useState('Mother Tongue');
    // const [from, setFrom] = React.useState("Country");

    const [motherTongueOptions, setMotherTongueOptions] = React.useState();
    const [countryOptions, setCountryOptions] = React.useState();

    React.useEffect(() => {
        setLang("Language");
        setCourseType("Course");
        setAvailability("Availability");
        setMinPrice(0);
        setMaxPrice(200);
        setMotherTongue("Mother Tongue");
        setFrom("Country");
        setFlagSrc(Flag);
    }, [reset]);

    React.useEffect(() => {
        const currFilters = {
            language: lang === "Language" ? "All" : lang,
            courseT: courseType === "Course" ? "All" : courseType,
            startPrice: minPrice,
            endPrice: maxPrice,
            country: from === "Country" ? "" : from,
            motherT: motherTongue === "Mother Tongue" ? "" : motherTongue,
            page: 1,
            limit: 100,
        };
        // const language = lang === 'Language' ? 'All' : lang;
        // const courseT = courseType === 'Course' ? 'All' : courseType;
        // const startPrice = minPrice;
        // const endPrice = maxPrice;
        // const country = from === 'Country' ? '' : from;
        // const motherT = motherTongue === 'Mother Tongue' ? '' : motherTongue;
        // const page = 1;
        // const limit = 10;

        localStorage.setItem("allFilters", JSON.stringify(currFilters));

        // console.log("sss", currFilters);
        // const apiStr = `?language=${language}&courseType=${courseT.replace(" ", "%20")}&startPrice=${startPrice}&endPrice=${endPrice}&motherTongue=${motherT}&country=${country}&page=${page}&limit=${limit}`;
        const apiStr = `?language=${currFilters.language
            }&courseType=${currFilters.courseT.replace(" ", "%20")}&startPrice=${currFilters.startPrice
            }&endPrice=${currFilters.endPrice}&motherTongue=${currFilters.motherT
            }&country=${currFilters.country}&page=${currFilters.page}&limit=${currFilters.limit
            }`;
        console.log("qqq", apiStr);

        // const apiStr = null;
        async function getCourses() {
            try {
                // Show Loader
                document.getElementById("loader").style.display = "flex";
                const result = await dispatch(filterCourse(apiStr));
                // Hide Loader
                document.getElementById("loader").style.display = "none";

                setCoursesArr(result?.data.courses);
                setMotherTongueOptions(result?.data.motherTongues);
                setCountryOptions(result?.data.countries);
            } catch (e) {
                console.log(e);
            }
        }
        getCourses();

        // console.log("filters: ", lang, courseType, availability, minPrice, maxPrice, motherTongue, from)
    }, [
        dispatch,
        lang,
        courseType,
        availability,
        minPrice,
        maxPrice,
        motherTongue,
        from,
    ]);

    return (
        <>
            {/* Select Language */}
            {width >= 992 ? (
                <Select
                    name="lang"
                    options={langOptions}
                    value={lang}
                    setValue={setLang}
                    focus={focus}
                    setFocus={setFocus}
                    width={width}
                    flagSrc={flagSrc}
                    setFlagSrc={setFlagSrc}
                />
            ) : (
                <></>
            )}

            {/* Select Course Type */}
            <Select
                name="courseType"
                options={courseOptions}
                value={courseType}
                setValue={setCourseType}
                setFocus={setFocus}
                width={width}
                flagSrc={flagSrc}
                setFlagSrc={setFlagSrc}
            />

            {/* Select Availability */}
            <AvailabilityFilter
                timeOptions={timeOptions}
                dayOptions={dayOptions}
                value={availability}
                setValue={setAvailability}
                focus={focus}
                setFocus={setFocus}
                width={width}
            />

            {/* Select Price */}
            <div style={{ marginTop: width >= 992 ? "25px" : "0" }}>
                <PriceFilter
                    min={0}
                    max={200}
                    onChange={({ min, max }) => {
                        setMinPrice(min);
                        setMaxPrice(max);
                    }}
                    width={width}
                />
            </div>

            {/* Select From (Country) */}
            {/* <ReactFlagsSelect
                selected={from}
                onSelect={item => setFrom(item)}
                searchable
                searchPlaceholder="Search countries"
                style={{ backgroundColor: 'pink', padding: '10px' }}
                className='abc'
                selectButtonClassName='abcd'
            /> */}
            <Select
                name="from"
                options={countryOptions}
                value={from}
                setValue={setFrom}
                setFocus={setFocus}
                width={width}
                flagSrc={flagSrc}
                setFlagSrc={setFlagSrc}
            />

            {/* Select Mother Tongue */}
            <Select
                name="motherTongue"
                options={motherTongueOptions}
                value={motherTongue}
                setValue={setMotherTongue}
                setFocus={setFocus}
                width={width}
                flagSrc={flagSrc}
                setFlagSrc={setFlagSrc}
            />
        </>
    );
}

export default Filters;
