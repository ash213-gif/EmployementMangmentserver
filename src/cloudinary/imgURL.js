const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({ 
    cloud_name: process.env.Cloud_name, 
    api_key: process.env.API_key, 
    api_secret: process.env.API_secret
});


exports.userURLImg = async(img)=>{
    const uploadResult = await cloudinary.uploader.upload(img)
    .catch((error) => {
        console.log(error);
    });
 
    return (uploadResult.secure_url)
}