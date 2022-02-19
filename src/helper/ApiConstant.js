const GET = 'get';
const POST = 'post';
const PUT = 'put';
const DELETE = 'delete';

const baseURL = 'https://jitsi.api.pip-idea.tk/';

const GOOGLE_API_KEY = 'AIzaSyDehsVAg19iJJ3e46QKi2h9fc0p0WzEirQ';

const api = {
    //Auth api constant
    signin: 'user/login',
    signup: 'user',
    forgotpassword: 'user/forgot_password',
    otp_verification: 'user/otp_verification',
    reset_password: 'user/reset_password',
    generate_token: 'user/channel/join',
    admin: 'admin/channel',
    question_set: 'admin/question_set'
};

export { baseURL, api, GET, POST, PUT, DELETE, GOOGLE_API_KEY };
