const DEV = "http://localhost:8080/api/"
const PROD = "https://lportal.herokuapp.com/api/"

export const prefix = DEV

export const apis = {
    prefix: prefix,
    users: prefix + "users/",
    news: prefix + "news/",
    schools: prefix + "schools/",
    departments: prefix + "departments/",
    teachers: prefix + "teachers/",
    courseStudentsRegID: prefix + "students/regid/",
    courses: prefix + "courses/",
    student_grades: prefix + "grades/student/", 
    grade_statistics: prefix + "grades/stat/", 
    course_media_upload: prefix + "courses/media/upload/" ///api/courses/media/upload/
}

export const colors = {
    primary: '#212121',
    accent: '#00B8D4',
    mute: '#F5F5F5',
    active: '#0abde3',
    side: "#FAFAFA",
    header: "#FAFAFA"
}

export const storageConfig = {
    apiKey: "AIzaSyAGrz3qhgcuClQo0LYAeUNKEA3dvAePWKU",
    authDomain: "lportal-d564d.firebaseapp.com",
    databaseURL: "https://lportal-d564d.firebaseio.com",
    projectId: "lportal-d564d",
    storageBucket: "lportal-d564d.appspot.com",
    messagingSenderId: "606908402859"
};

export const current_student_id = 1