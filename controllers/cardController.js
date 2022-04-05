var con = require("../connection");
const { roomData } = require("./calendarController");

var loginUser;

const signinUser = function (email) {
  loginUser = email;
};

const getDisplayRooms = function (req, res, next) {
  res.render("displayRooms", { success: "", loginUser: loginUser });
};

const displayRooms = function (req, res, user) {
  var sql =
    "SELECT * FROM meetingSchedule where loginEmail='" +
    (typeof loginUser != "undefined"
      ? loginUser.replace("@gmail.com", "")
      : "") +
    "'OR attendees LIKE '%" +
    (typeof loginUser != "undefined"
      ? loginUser.replace("@gmail.com", "")
      : "") +
    "%'  ";

  con.query(sql, function (err, data, fields) {
    if (err) throw err;

    res.render("displayRooms", {
      title: "User List",
      userData: data,
      loginUser: loginUser,
    });
  });
};

const deleteId = function (req, res) {
  const userId = req.params.id;
  let sql = `delete from meetingSchedule where id=${userId}`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.redirect("/displayRooms");
    attendeesData =
      typeof attendeesData != "undefined"
        ? attendeesData.replace("@gmail.com", "")
        : "";
    roomData(attendeesData);
  });
};

module.exports = {
  getDisplayRooms,
  displayRooms,
  signinUser,
  deleteId,
};
