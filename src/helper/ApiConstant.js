import io from "socket.io-client";

const GET = 'get';
const POST = 'post';
const PUT = 'put';
const DELETE = 'delete';

const baseURL = 'https://jitsi.api.pip-idea.tk/user';
const bucketURL = 'https://jistidevelopment.s3.amazonaws.com/'

const GOOGLE_API_KEY = 'AIzaSyDehsVAg19iJJ3e46QKi2h9fc0p0WzEirQ';
let socket = io('https://jitsi.api.pip-idea.tk/', {
    transports: ['websocket'],
}
);
const api = {
    //Auth api constant
    signin: '/login',
    signup: '/',
    forgotpassword: '/forgot_password',
    otp_verification: '/otp_verification',
    reset_password: '/reset_password',
    generate_token: '/channel/join',
    admin: '/channel',
    question_set: '/question_set',
    answer: '/answer',
    profile: '/',
    uploadImage: '/upload/compress_image/profile'
};

export { baseURL, api, GET, POST, PUT, DELETE, GOOGLE_API_KEY, socket, bucketURL };
