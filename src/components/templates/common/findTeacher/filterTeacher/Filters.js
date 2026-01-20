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

    const [courseType, setCourseType] = React.useState(allFilters?.courseT || "Course");
    const [availability, setAvailability] = React.useState(allFilters?.availability || "Availability");
    const [minPrice, setMinPrice] = React.useState(allFilters?.minPrice || 0);
    const [maxPrice, setMaxPrice] = React.useState(allFilters?.maxPrice || 200);
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
        setLang("Language");
        setCourseType("Course");
        setAvailability("Availability");
        setMinPrice(0);
        setMaxPrice(2000);
        setMotherTongue("Mother Tongue");
        setFrom("Country");
        setFlagSrc(Flag);
    }, [reset]);

    React.useEffect(() => {
        console.log("Filters.js useEffect triggered", { lang, courseType, availability, minPrice, maxPrice, motherTongue, from });
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

        const apiStr = `?language=${encodeURIComponent(currFilters.language)}&courseType=${encodeURIComponent(currFilters.courseT)}&startPrice=${currFilters.startPrice}&endPrice=${currFilters.endPrice}&motherTongue=${encodeURIComponent(currFilters.motherT)}&country=${encodeURIComponent(currFilters.country)}&page=${currFilters.page}&limit=${currFilters.limit}`;

        console.log("Fetching courses with filters:", currFilters);
        console.log("API Query String:", apiStr);

        async function getCourses() {
            try {
                console.log("getCourses function calling dispatch...");
                if (document.getElementById("loader")) document.getElementById("loader").style.display = "flex";
                const result = await dispatch(filterCourse(apiStr));
                console.log("filterCourse dispatch result:", result);
                if (document.getElementById("loader")) document.getElementById("loader").style.display = "none";

                if (result) {
                    const courses = result.courses || result.data?.courses || [];
                    const motherTongues = result.motherTongues || result.data?.motherTongues || [];
                    const countries = result.countries || result.data?.countries || [];

                    console.log(`Setting courses with length: ${courses.length}`);
                    setCoursesArr(courses);
                    setMotherTongueOptions(motherTongues);
                    setCountryOptions(countries);

                    if (courses.length === 0) {
                        console.log("No courses found for these filters.");
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
