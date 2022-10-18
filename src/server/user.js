import Parse from 'parse'
export default{
    async getPointer(id) {
        const UserClass = Parse.Object.extend("_User");
        const UserQuery = new Parse.Query(UserClass);
        var a = await UserQuery.get(id)
          .then((object) => {
            return object;
          })
          .catch((error) => {
            console.log("error", error);
          });
    
        return a;
      },
}