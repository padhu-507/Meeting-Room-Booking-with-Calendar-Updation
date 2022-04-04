var con = require("../connection");

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

module.exports = {
  getDisplayRooms,
  displayRooms,
  signinUser,
};
