/** @type {import('next').NextConfig} */

module.exports = {
    env: {
        baseURL: 'https://betapddadm.deco2.green',
        config: {
            headers: {
                'Access-Control-Allow-Origin': `*`,
                'Authorization': `Tpk8lK1otI4KYOQLuXFLnObNPx607ldc`,
                'Content-Type': 'application/x-www-form-urlencoded, multipart/form-data'
            }
        },
        fileFormatProjectRegister: '.pdf, .doc, .docx',
        storageName: 'deco2'
    },
    // basePath: '/deco2',
    basePath: '',
    images: {
        unoptimized: true,
        domains: [
            'betapdd.deco2.green',
            'betapddadm.deco2.green',
            'deco2.green',
            'deco2',
            '13.250.152.126'
        ],
        // loader: 'imgix',
        // path: 'http://betapddadm.deco2.green'
    },
    trailingSlash: true,
}