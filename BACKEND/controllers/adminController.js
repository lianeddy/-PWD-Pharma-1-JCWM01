const {db} = require('../database')
const { uploader } = require('../helpers/uploader')
const fs = require('fs')

module.exports = {

    uploadDataProduct : (req,res) => {
        console.log("berhasil")
        let path = '/images'
        const upload = uploader(path, 'IMG').fields([{name: 'file'}])

        upload(req, res, (error) => {
            if(error) {
                console.log(error)
                res.status(500).send(error)
            }

            // membuat nama file untuk image 
            const {file} = req.files
            const filePath = file ? path + "/" + file[0].filename : null 

            // mengambil data dari request body
            let { 
                namaObat,
                jumlahObat,
                satuan,
                deskripsi,
                manfaat,
                komposisi,
                dosis,
                golongan,
                hargaPokok,
                hargaJual
            } = JSON.parse(req.body.data)

            // query menyimpan data
            let insertQuery = `INSERT INTO obat VALUES (null,${db.escape(namaObat)},${db.escape(jumlahObat)},${db.escape(satuan)},${db.escape(deskripsi)},${db.escape(manfaat)},${db.escape(komposisi)},${db.escape(dosis)},${db.escape(golongan)},${db.escape(hargaPokok)},${db.escape(hargaJual)},${db.escape(filePath)});`
            
            // menjalankan insert query dan mengrimkan pesanke front-end
            db.query(insertQuery, (err, result) => {
                if(err) {
                    console.log(err)
                    console.log(err.message)
                    fs.unlinkSync('./public' + filePath)
                    return res.status(500).send(err)
                }
                res.status(200).send({message : "Data product berhasil ditambahkan", success: true})
            })
        })
    }   
}