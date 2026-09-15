const {ImageKit} =require('@imagekit/nodejs');

const ImagekitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile(file) {
    const fileData = file.buffer.toString('base64');
    const result = await ImagekitClient.files.upload({
        file: fileData,
        fileName: file.orignalname + Date.now(),
        folder: "job_portal_backend/"
    });

    return result;
}

module.exports = {
    uploadFile
};