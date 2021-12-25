const { findUserByID, uploadUserImage } = require('../../repositories/users-repository');
const throwJsonError = require('../../errors/throw-json-error');
const createJsonError = require('../../errors/create-json-error');
const randomstring = require('randomstring');
const fs = require('fs');
const path = require('path');
const { HTTP_SERVER, PATH_USER_IMAGE } = process.env;

const validExtension = ['.jpeg', '.jpg', '.png'];

async function uploadImageProfile(req, res) {
  try {
    const { id } = req.auth;
    const { files } = req;
    if (!files || Object.keys(files).length === 0) {
      throwJsonError(400, 'No hay archivos seleccionados.');
    }
    const { profileImage } = files;
    const { name } = profileImage;
    const extension = path.extname(name);
    if (!validExtension.includes(extension)) {
      throwJsonError(400, 'Este formato de imagen no es válido.');
    }
    const user = await findUserByID(id);
    const { profile_image } = user;
    const pathProfileImage = `${__dirname}/../../../public/${PATH_USER_IMAGE}`;
    if (profile_image) {
      fs.unlink(`${pathProfileImage}/${profile_image}`, () => {
        console.log('Avatar anterior borrado correctamente.');
      });
    }
    const randomName = randomstring.generate(10);
    const imgName = `${id}-${randomName}${extension}`;
    const pathImage = `${pathProfileImage}/${imgName}`;
    profileImage.mv(pathImage, async function (err) {
      if (err) throwJsonError(500, err.message);
      await uploadUserImage(id, imgName);
      res.status(200).send({ url: `${HTTP_SERVER}/${PATH_USER_IMAGE}/${imgName}` });
    });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = uploadImageProfile;
