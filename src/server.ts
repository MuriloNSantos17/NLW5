import {http} from "./http";
import "./websocket/client";
import "./websocket/admin";

http.listen(3333, ()=> console.log("Server is runing on port 3333"))


/*
//GET
app.use(express.json());

app.use(routes);

app.listen(3333, ()=> console.log("Server is runing on port 3333"))

*/