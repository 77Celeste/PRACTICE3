const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Foods", { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
module.exports = mongoose;
