
export default class Http(){
  base_url = "";
  constructor(){
      this.base_url = "http://localhost:8000";
  }

  dofetch(method,endpoint,data={}){
    return fetch(url, {
          body: JSON.stringify(data),
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'content-type': 'application/json'
          },
          method: method,
          mode: 'cors', // no-cors, cors, *same-origin
          redirect: 'follow', // manual, *follow, error
          referrer: 'no-referrer', // *client, no-referrer
        })
      .then(response => {
        if(response.ok){
          return response.json();
        }else{
          throw(response);
        }
      })
      .then(responsedata => responsedata)
      .catch( error => error.json() )
      .then( errordata => console.log(errordata.error));
  }


  addAlert(data){
    return this.dofetch("POST","alerts/",data);
  }

  myAlerts(user_id){
    return this.dofetch("GET","alerts/myalerts/"+user_id);
  }




}
