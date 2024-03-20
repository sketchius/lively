import { format, addDays, addWeeks, addMonths, addYears } from "date-fns";

const demoTasks = [
  {
    title: "Buy groceries",
    category: "Errand",
    duration: 60,
    timeFrame: {
      interval: "Week",
      type: "Flexible",
      date: 0,
    },
    importanceModifier: 0,
  },
  {
    title: "Clean kitchen",
    category: "Household",
    duration: 30,
    timeFrame: {
      interval: "Day",
      type: "Flexible",
      date: 0,
    },
    importanceModifier: 0,
  },
  {
    title: "Buy Gift",
    category: "Errand",
    duration: 45,
    timeFrame: {
      interval: "Day",
      type: "Deadline",
      date: 13,
    },
    importanceModifier: 0,
  },
  {
    title: "Attend Meeting",
    category: "Work",
    duration: 30,
    timeFrame: {
      interval: "Day",
      type: "Scheduled",
      date: 1,
    },
    importanceModifier: 0,
  },
  {
    title: "Submit report",
    category: "Work",
    duration: 120,
    timeFrame: {
      interval: "Day",
      type: "Deadline",
      date: -1,
    },
    importanceModifier: 0,
  },
  {
    title: "Renew passport",
    category: "Life Management",
    duration: 120,
    details: "Exp in 6 mos",
    timeFrame: {
      interval: "Month",
      type: "Deadline",
      date: 4,
    },
    importanceModifier: 0,
  },
  {
    title: "Pay gas bill",
    category: "Life Management",
    duration: 15,
    timeFrame: {
      interval: "Month",
      type: "Deadline",
      date: 0,
    },
    importanceModifier: 0,
  },
  {
    title: "Plan trip",
    category: "Personal",
    duration: 60,
    timeFrame: {
      interval: "Month",
      type: "Flexible",
      date: 1,
    },
    importanceModifier: 0,
  },
  {
    title: "Fix leak",
    category: "Household",
    duration: 120,
    timeFrame: {
      interval: "Week",
      type: "Scheduled",
      date: 0,
    },
    importanceModifier: 0,
  },
  {
    title: "Update resume",
    category: "Work",
    duration: 90,
    timeFrame: {
      interval: "Month",
      type: "Flexible",
      date: 1,
    },
    importanceModifier: 0,
  },
  {
    title: "Dental checkup",
    category: "Wellness",
    duration: 60,
    details: "Routine cleaning",
    timeFrame: {
      interval: "Day",
      type: "Scheduled",
      date: 18,
    },
    importanceModifier: 0,
  },
  {
    title: "Oil change",
    category: "Life Management",
    duration: 45,
    timeFrame: {
      interval: "Month",
      type: "Flexible",
      date: 1,
    },
    importanceModifier: 0,
  },
  {
    title: "Find yoga class",
    category: "Wellness",
    duration: 60,
    timeFrame: {
      interval: "Week",
      type: "Deadline",
      date: -1,
    },
    importanceModifier: 0,
  },
  {
    title: "Backup files",
    category: "Work",
    duration: 30,
    timeFrame: {
      interval: "Week",
      type: "Flexible",
      date: 0,
    },
    importanceModifier: 0,
  },
  {
    title: "File Taxes",
    category: "Life Management",
    duration: 120,
    details: "Collect docs",
    timeFrame: {
      interval: "Month",
      type: "Deadline",
      date: 1,
    },
    importanceModifier: 2,
  },
  {
    title: "Paint bedroom",
    category: "Household",
    duration: 240,
    timeFrame: {
      interval: "Month",
      type: "Flexible",
      date: 1,
    },
    importanceModifier: 0,
  },
];

export const getDemoTasks = () => {
  return demoTasks.map((task) => {
    let typeDisplay = "";
    switch (task.timeFrame.type) {
      case "Flexible":
        typeDisplay = "Around";
        break;
      case "Deadline":
        typeDisplay = "By";
        break;
      case "Scheduled":
        switch (task.timeFrame.interval) {
          default:
          case "Day":
            typeDisplay = "On";
            break;
          case "Week":
          case "Month":
          case "Year":
            typeDisplay = "During";
            break;
        }
        break;
    }
    let date;
    switch (task.timeFrame.interval) {
      case "Day":
        date = format(addDays(new Date(), Number(task.timeFrame.date)), "M/d/yyyy");
        break;
      case "Week":
        date = format(addWeeks(new Date(), Number(task.timeFrame.date)), "M/d/yyyy");
        break;
      case "Month":
        date = format(addMonths(new Date(), Number(task.timeFrame.date)), "M/d/yyyy");
        break;
      case "Year":
        date = format(addYears(new Date(), Number(task.timeFrame.date)), "M/d/yyyy");
        break;
    }

    return { ...task, timeFrame: {...task.timeFrame, date, display: `${typeDisplay} ${date}`} };
  });
};
