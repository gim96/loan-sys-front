import React, { useState } from "react";
import PropTypes from "prop-types";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { addDays, subDays } from "date-fns";
import { Card } from "reactstrap";
import { Popover } from 'rsuite';

const Calendar = ({ onChange }) => {
  const [state, setState] = useState([
    {
      startDate: subDays(new Date(), 7),
      endDate: addDays(new Date(), 1),
      key: "selection"
    }
  ]);

  const handleOnChange = (ranges) => {
    const { selection } = ranges;
    onChange(selection);
    setState([selection]);
  };

  return (
    <DateRangePicker
        onChange={handleOnChange}
        scroll={
            {
                    enabled: true
            }
        }
        showMonthAndYearPickers={false}
        showMonthArrow={false}
        months={2}
        ranges={state}
        direction='vertical'
    />
  );
};

Calendar.propTypes = {
  onChange: PropTypes.func
};

export default Calendar;
