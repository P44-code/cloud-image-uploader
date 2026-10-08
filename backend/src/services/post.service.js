// post.service.js
const ImageKit = require('imagekit');

// 1. Initialize ImageKit with your keys
const imagekit = new ImageKit({

    publicKey: process.env.public_key,
    privateKey: process.env.private_key,
    urlEndpoint: process.env.url_key

});


async function uploadImageToCDN(fileBuffer, originalName) {
    try {
        const fileName = `post-${Date.now()}-${originalName}`;

        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: fileName,
            useUniqueFileName: true
        });


        return response;
    } catch (error) {
        console.error("ImageKit Service Error:", error);
        throw new Error("Failed to upload image to CDN service");
    }
}

module.exports = { uploadImageToCDN };

