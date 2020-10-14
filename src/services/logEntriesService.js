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
    filterActivitiesFromLogEntries(logEntries, filteredActivitiesIds) {
        if (!filteredActivitiesIds.length) {
            return logEntries;
        }
        return logEntries.map((entry) => {
            return {
                ...entry,
                activities: entry.activities.filter(id => filteredActivitiesIds.includes(id))
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

        console.log('CALENDAR LOG', stateArray)
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
    },
    getActivitiesTimePeriodStatistics(logEntries, activities) {
        let usedYears = [];
        let usedMonths = [];

        const yearlyStatistics = {};
        const monthlyStatistics = {};

        const defaultActivitiesStats = {};
        activities.forEach(activity => defaultActivitiesStats[activity.id] = {count: 0});
        console.log('all activities', activities)
        logEntries.forEach((entry) => {
            const year = UtilityService.getTimestampYear(entry.timestamp);
            const month = UtilityService.getTimestampMonth(entry.timestamp);
            const monthPeriod = year + '-' + (month < 10 ? `0${month}` : month);

            if (!usedYears.includes(year)) {
                usedYears.push(year);
                usedMonths = [];
                yearlyStatistics[year] = {
                    period: year,
                    type: 'year',
                    activities: UtilityService.deepCopy(defaultActivitiesStats)
                };
            }
            if (!usedMonths.includes(month)) {
                usedMonths.push(month);
                monthlyStatistics[monthPeriod] = {
                    period: monthPeriod,
                    type: 'month',
                    activities: UtilityService.deepCopy(defaultActivitiesStats)
                };
            }
            entry.activities.forEach((activityId) => {
                console.log('++++', year, monthPeriod, activityId, yearlyStatistics, monthlyStatistics)
                if (defaultActivitiesStats[activityId]) {
                    yearlyStatistics[year].activities[activityId].count++;
                    monthlyStatistics[monthPeriod].activities[activityId].count++;
                }
            });
        });

        const statistics = [];
        Object.keys(yearlyStatistics).forEach((yearKey) => {
            statistics.push(yearlyStatistics[yearKey]);
            Object.keys(monthlyStatistics).filter(key => key.includes(yearKey)).forEach((monthKey) => {
               statistics.push(monthlyStatistics[monthKey]);
            });
        });
        return statistics;
    }
};

export default LogEntriesService;
