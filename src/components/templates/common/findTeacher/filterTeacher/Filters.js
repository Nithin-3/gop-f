import React from "react";
import { toast } from "react-toastify";


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
import { PRICE_CONFIG, DEFAULT_FILTERS } from "../../../../../utils/constants";

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
    } = props;

    let allFilters = JSON.parse(localStorage.getItem("allFilters"));

    // const filterStore = null;

    const [courseType, setCourseType] = React.useState(allFilters?.courseT || "Course");
    const [availability, setAvailability] = React.useState(allFilters?.availability || "Availability");
    const [minPrice, setMinPrice] = React.useState(allFilters?.minPrice || PRICE_CONFIG.MIN);
    const [maxPrice, setMaxPrice] = React.useState(allFilters?.maxPrice || PRICE_CONFIG.MAX);
    const [motherTongue, setMotherTongue] = React.useState(allFilters?.motherT || "Mother Tongue");
    const [from, setFrom] = React.useState(allFilters?.from || "Country");
    // const [courseType, setCourseType] = React.useState("Course");
    // const [availability, setAvailability] = React.useState('Availability');
    // const [minPrice, setMinPrice] = React.useState(0);
    // const [maxPrice, setMaxPrice] = React.useState(200);
    // const [motherTongue, setMotherTongue] = React.useState('Mother Tongue');
    // const [from, setFrom] = React.useState("Country");

    const [motherTongueOptions, setMotherTongueOptions] = React.useState([]);
    const [countryOptions, setCountryOptions] = React.useState([]);

    React.useEffect(() => {
        if (reset) {
            setLang("Language");
            setCourseType("Course");
            setAvailability("Availability");
            setMinPrice(PRICE_CONFIG.MIN);
            setMaxPrice(PRICE_CONFIG.MAX);
            setMotherTongue("Mother Tongue");
            setFrom("Country");
            setFlagSrc(Flag);
        }
    }, [reset, setLang, setCourseType, setAvailability, setMinPrice, setMaxPrice, setMotherTongue, setFrom, setFlagSrc]);

    const handlePriceChange = React.useCallback(({ min, max }) => {
        setMinPrice(min);
        setMaxPrice(max);
    }, []);

    React.useEffect(() => {
        const currFilters = {
            language: lang === "Language" ? "All" : lang,
            courseT: courseType === "Course" ? "All" : courseType,
            startPrice: minPrice,
            endPrice: maxPrice,
            country: from === "Country" ? "" : from,
            motherT: motherTongue === "Mother Tongue" ? "" : motherTongue,
            availability: availability === "Availability" ? "" : availability,
            page: 1,
            limit: 100,
        };

        const filtersToSave = {
            lang,
            courseT: courseType,
            availability,
            minPrice,
            maxPrice,
            motherT: motherTongue,
            from,
        };

        localStorage.setItem("allFilters", JSON.stringify(filtersToSave));

        const apiStr = `?language=${encodeURIComponent(currFilters.language)}&courseType=${encodeURIComponent(currFilters.courseT)}&startPrice=${currFilters.startPrice}&endPrice=${currFilters.endPrice}&motherTongue=${encodeURIComponent(currFilters.motherT)}&country=${encodeURIComponent(currFilters.country)}&availability=${encodeURIComponent(currFilters.availability)}&page=${currFilters.page}&limit=${currFilters.limit}`;




        async function getCourses() {
            try {
                if (document.getElementById("loader")) document.getElementById("loader").style.display = "flex";

                const result = await dispatch(filterCourse(apiStr));
                if (document.getElementById("loader")) document.getElementById("loader").style.display = "none";

                if (result) {
                    const courses = result.courses || result.data?.courses || [];
                    const motherTongues = result.motherTongues || result.data?.motherTongues || [];
                    const countries = result.countries || result.data?.countries || [];



                    setCoursesArr(courses);
                    setMotherTongueOptions(motherTongues);
                    setCountryOptions(countries);

                    if (courses.length === 0) {
                    }
                } else {
                    console.error("Empty response from filter course API");
                    setCoursesArr([]);
                }
            } catch (e) {
                console.error("Filter course async function failed:", e);
                if (document.getElementById("loader")) document.getElementById("loader").style.display = "none";
                toast.error("Failed to fetch courses");
                setCoursesArr([]);
            }
        }
        getCourses();
    }, [
        dispatch,
        lang,
        courseType,
        availability,
        minPrice,
        maxPrice,
        motherTongue,
        from,
        setCoursesArr
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
                    min={PRICE_CONFIG.MIN}
                    max={PRICE_CONFIG.MAX}
                    onChange={handlePriceChange}
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
