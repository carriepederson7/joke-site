export class Jokes {
  getJokes(){
    return new Promise(function(resolve,reject){
      let request = new XMLHttpRequest();
      const url = `https://official-joke-api.appspot.com/jokes/programming/ten`;
      request.onload = function(){
        if (this.status === 200) {
          resolve(request.response);
        }else{
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }
}
