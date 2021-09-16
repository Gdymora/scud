const app = require("./app");
const port = process.env.PORT;
const host = process.env.HOST;
app.get("/", function (req, res) {
    try {
        res.send("Got a TEST request");
    }
    catch (error) {
        console.log(error);
    }
});
app.listen(port, host, () => {
    console.log(`Example - app listening at ${host}:${port}`);
});
//# sourceMappingURL=index.js.map