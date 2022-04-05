var con = require("../connection");

var signinEmail;

const signinPerson = function (email) {
  signinEmail = email;
};

let calendarEvents = [];

const getCalendar = function (req, res, next) {
  res.render("calendar", {
    title: "Calendar",
    success: "",
    error: "",
    calendarEvents: calendarEvents,
    signinEmail: signinEmail,
  });
};

let roomData = function (attendeesData) {
  var sql =
    "select roomname,title,startdate,enddate,starttime,endtime from meetingSchedule where loginEmail='" +
    attendeesData +
    "' OR attendees LIKE '%" +
    attendeesData +
    "%' ";

  con.query(sql, function (err, resources, res) {
    while (calendarEvents.length > 0) {
      calendarEvents.pop();
    }
    if (err) throw err;
    for (let i = 0; i < resources.length; i++) {
      let params = {
        resourceId:
          resources[i].roomname === "Cave"
            ? (resources[i].resourceId = "a")
            : resources[i].roomname === "Mansion"
            ? (resources[i].resourceId = "c")
            : resources[i].roomname === "Tower"
            ? (resources[i].resourceId = "b")
            : [],
        title: resources[i].title,
        start:
          resources[i].startdate.toString().split(" ")[3] +
          "-" +
          resources[i].startdate.toString().split(" ")[1].replace("Apr", "04") +
          "-" +
          resources[i].startdate.toString().split(" ")[2] +
          "T" +
          resources[i].starttime,
        end:
          resources[i].enddate.toString().split(" ")[3] +
          "-" +
          resources[i].enddate.toString().split(" ")[1].replace("Apr", "04") +
          "-" +
          resources[i].enddate.toString().split(" ")[2] +
          "T" +
          resources[i].endtime,
      };
      calendarEvents.push(params);
    }
  });
};

module.exports = {
  getCalendar,
  roomData: roomData,
  calendarEvents: calendarEvents,
  signinPerson,
};
