const { db } = require("../database");
const { userUploader } = require("../helper/userUploader");
const fs = require("fs");
// const { userUploaderController } = require(".");

module.exports = {
  userUpload: (req, res) => {
    try {
      let path = "/images";
      const upload = userUploader(path, "IMG").fields([{ name: "file" }]);

      upload(req, res, (error) => {
        if (error) {
          console.log(error);
          res.status(500).send(error);
        }

        const { file } = req.files;
        const filepath = file ? path + "/" + file[0].filename : null;

        let sqlInsert = `UPDATE user set foto_profil = ${db.escape(
          filepath
        )} where id_user = ${req.params.id};`;
        console.log(sqlInsert);
        db.query(sqlInsert, (err, results) => {
          if (err) {
            console.log(err);
            fs.unlinkSync("./public" + filepath);
            res.status(500).send(err);
          }
          res.status(200).send({ message: "Foto Profil Anda diperbarui" });
        });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  getProfileImage : (req, res)=>{
    let sqlGet = `select foto_profil from user where id_user = ${db.escape(req.params.id)};`
    db.query(sqlGet,(err, results)=>{
        if(err){
            res.status(500).send(err)
        }
        res.status(200).send(results)
    })
},


// uploadImg : (req, res)=>{
//   try{
//       let path = `/images`
//       const upload = userUploader(path, 'IMG').fields([{name : 'file'}])
//       upload(req, res, (error)=>{
//           if(error){
//               console.log(error);
//               res.status(500).send(error)
//           }
//           const { file} = req.files 
//           const filepath = file ? path +'/'+ file[0].filename : null

          
//           req.body.foto_profil = filepath

//           let sqlUpdate = `update user set foto_profil = ${db.escape(filepath)} where id_user = ${req.params.id};`
//           db.query(sqlUpdate,(err, results)=>{
//               if(err){

//                   console.log(err);
//                   fs.unlinkSync(`./public`+filepath)
//                   res.status(500).send(err)
//               }
//               console.log(sqlUpdate);
//               res.status(200)
//           })

//       })

//   }catch(error){
//       console.log(error);
//       res.status(500).send(error)

//   }
// }
};
