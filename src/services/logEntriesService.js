import UtilityService from "./utilityService";
import moment from "moment";

const LogEntriesService = {
    populateLogEntriesWithActivities(logEntries, activities) {
        return logEntries.map((entry) => {
            return {
                ...entry,
                activities: activities.filter((activity) => entry.activities.includes(activity.id))
            };
        });
    },
    getCalendarLog(logEntries) {
        const stateArray = [];
        let years = [];
        let months = [];
        let previousYear;

        logEntries.filter(entry => entry.activities.length).forEach((entry) => {

            const year = UtilityService.getTimestampYear(entry.timestamp);
            const month = UtilityService.getTimestampMonth(entry.timestamp);

            if (previousYear !== year) {
                previousYear = year
                months = []
            }

            const yearIndex = years.indexOf(year) < 0;
            const monthIndex = months.indexOf(month) < 0;

            if (yearIndex) {
                years.unshift(year);
                stateArray.unshift({
                    year: year,
                    data: []
                });
            }

            if (monthIndex) {
                months.unshift(month);
                stateArray[years.indexOf(year)].data.unshift({
                    month: month,
                    data: []
                });
            }

            if (stateArray[years.indexOf(year)].data[months.indexOf(month)].data.length === 0) {
                const daysInMonth = moment((year + '-' + month), 'YYYY-MM').daysInMonth();

                for (let day = 1; day <= daysInMonth; day++) {
                    const timestamp = moment(`${year}-${month}-${day}`, 'YYYY-M-D').format('YYYY-MM-DD');
                    const monthData = stateArray[years.indexOf(year)].data[months.indexOf(month)].data;
                    monthData.unshift({
                        timestamp,
                        activities: []
                    });
                }
            }

            const dayLog = stateArray[years.indexOf(year)].data[months.indexOf(month)].data.find(dayLog => dayLog.timestamp === entry.timestamp);
            if (dayLog) {
                dayLog.activities = dayLog.activities.concat(entry.activities);
            }
        });

        return stateArray;
    },
    getActivitiesOverallStatistics(logEntries, activities) {
        const activitiesStats = {};
        activities.forEach((activity) => {
            activitiesStats[activity.id] = {
                count: 0,
                firstTimestamp: '',
                lastTimestamp: ''
            };

            logEntries.forEach((entry) => {
                if (entry.activities.includes(activity.id)) {
                    activitiesStats[activity.id].count++;
                    activitiesStats[activity.id].lastTimestamp = entry.timestamp;

                    if (!activitiesStats[activity.id].firstTimestamp) {
                        activitiesStats[activity.id].firstTimestamp = entry.timestamp;
                    }
                }
            });
        });
        return activitiesStats
    }
};

export default LogEntriesService;
