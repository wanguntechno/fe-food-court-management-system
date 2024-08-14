import fetchHelper from '../fetchHelper';

const getuserInfo = async () => fetchHelper('/get-user-session-information');

export default getuserInfo;
