import { http } from "./http";
import "./websocket/client";
/* 
  We need to use socket, and set the connections before the listen, to send
  the initial http socket response, so one good way to separate the files is 
  using this import.  
*/

//here this http listen the socket and the http
http.listen(process.env.PORT || 3333, () =>
  console.log(`Magic happens on port ${process.env.PORT || 3333}`)
);
