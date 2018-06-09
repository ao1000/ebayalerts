
export default class Http {
  base_url = "";
  constructor(){
      this.base_url = "http://localhost:8000/";
  }

   dofetch(method,endpoint,data={}){
        var options = {

        }
       return fetch(this.base_url+endpoint, {
          body: method == "GET" ? undefined : JSON.stringify(data), // fetch will fail if there's a body in a GET request
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'content-type': 'application/json'
          },
          method: method,
        }).then(response => {
          if(response.ok){
            return response.json();
          }else{
            throw(response);
          }
        }).then( responsedata => {
          return responsedata
        } ).catch( error => {
          console.log(error);
          return false
        })
  }


   addAlert(data){
    return this.dofetch("POST","alerts/",data);
  }

  myAlerts(user_id){
    return this.dofetch("GET","alerts/myalerts/"+user_id+"/");
  }




}
