const {v4:uuidv4}=require('uuid')
const sessionIdToUserMap=new Map();
function setUser(sessionId,User){
    sessionIdToUserMap.set(sessionId,User)
}
function getUser(sessionId){
    const user=sessionIdToUserMap.get(sessionId);
    return user;
}
function createSession(user){
    const sessionId=uuidv4();
    setUser(sessionId,user)
    return sessionId
}
function deleteSession(sesId){
    sessionIdToUserMap.delete(sesId)
}
module.exports={setUser,getUser,createSession,deleteSession}