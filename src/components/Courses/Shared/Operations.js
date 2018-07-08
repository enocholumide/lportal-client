
/**
 * Shared actions regarding uploading and downloading files
 * 
 * @author Olumide Igbiloba
 * 
 */

import firebase from 'firebase/app'
import 'firebase/storage'
import req from "../../../shared/axios/requests"
//import { message } from 'antd'


let MAX_FILE_SIZE = 1000000 // KB

export default class Operations {

    /**
     * Downloads a given file. The file must have a name and a url attribute
     * @param {File[]} file file to be downloaded
     * @callback progressCallback  the callback to call while downloading
     * @callback finishCallback  the callback function when download has been completed or interrupted. 0 for sucess and -1 for error
     */
    static downloadFile(file, progressCallback, finishCallback) {

        let link = document.createElement("a");
        link.download = file.name;
        link.href = file.url;
        window.open(link, '_blank');

        if (finishCallback) {
            finishCallback(0);
        }
    }

    /**
     * Uplaods a file to the server
     * Supports adding the first file for now
     * @param {File} e file to upload 
     * @param {String} API_URL the api url string
     * @param {String} STORAGE_PATH the api url string
     * @callback progressCallback the callback to call while downloading
     * @callback finishCallback the callback function when download has been completed or interrupted. 0 for sucess and -1 for error
     */
    static uploadCourseFileMedia(e, API_URL, STORAGE_PATH, progressCallback, finishCallback) {

        let STORAGE_REF = firebase.storage().ref();

        let file = e;

        if (file.size > MAX_FILE_SIZE) {

            finishCallback(-1, null, "File too large: " + MAX_FILE_SIZE / 1000000 + "mb Maximum");
        }

        else {
            // Upload file and metadata to the object 'images/mountains.jpg'
            let uploadTask = STORAGE_REF.child(STORAGE_PATH + file.name).put(file);
            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,

                (snapshot) => {
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if (progressCallback)
                        progressCallback(progress)

                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED:
                            break;
                        case firebase.storage.TaskState.RUNNING:
                            break;
                        default:
                            break;

                    }
                },

                (error) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;

                        case 'storage/canceled':
                            // User canceled the upload
                            break;

                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;

                        default:
                            break;
                    }
                },

                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {

                        let fp = { name: file.name, url: downloadURL, size: file.size, type: file.type }
                        // Upload to server
                        req.put(API_URL, fp)
                            .then((response) => {
                                if (response.status === 200) {
                                    if (finishCallback)
                                        finishCallback(1, response.data);
                                }
                                else {
                                    if (finishCallback)
                                        finishCallback(-1, response.data, "Error: " + response.status);
                                    STORAGE_REF.child(STORAGE_PATH + file.name).delete()
                                }

                            })
                            .catch((error) => {
                                console.log(error)
                                if (finishCallback)
                                    finishCallback(-1, error);
                                STORAGE_REF.child(STORAGE_PATH + file.name).delete()
                            })
                    });
                }
            )
        }
    }

    /**
     * Deletes a media file from the course
     * @param {File} handIn the file to delete
     * @param {String} API_URL the api url string 
     * @param {String} STORAGE_PATH the api url string
     * @callback progressCallback the callback to call while downloading
     * @callback finishCallback the callback function when download has been completed or interrupted. 0 for sucess and -1 for error
     */
    static deleteCourseFileMedia(handIn, API_URL, STORAGE_PATH, progressCallback, finishCallback) {

        let STORAGE_REF = firebase.storage().ref();

        req.delete(API_URL)
            .then((response) => {

                if (response.status === 200) {
                    STORAGE_REF.child(STORAGE_PATH + handIn.name).delete()
                    finishCallback(1, response.data, "Completed")

                } else
                    finishCallback(-1, response.data, "Error: " + response.status)

            })
            .catch((error) => {
                console.log(error)
                finishCallback(-1, error, error.response ? error.response.data : error.toString())
            })
    }
}