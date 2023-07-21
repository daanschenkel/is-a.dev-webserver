const fs = require('fs');
const FtpSrv = require('ftp-srv');
const port=21;
const ftpServer = new FtpSrv({
    url: "ftp://0.0.0.0:" + port,
    anonymous: false,
});

ftpServer.on('login', ({ connection, username, password }, resolve, reject) => { 
    try{
    if(!fs.existsSync(`${__dirname}/../content/${username}`)) return reject('User does not exist');
    if(!fs.existsSync(`${__dirname}/../content/${username}/config.json`)) return reject('Config does not exist');
    let config = fs.readFileSync(`${__dirname}/../content/${username}/config.json`);
    config = JSON.parse(config);

    if(!config.ftp) return reject('FTP is disabled for this user');
    if(config.ftp_password && password != config.ftp_password) return reject('Invalid password');

    if(username.includes('..') || username.includes('/') || username.includes('\\') || username.includes(' '))
        return reject('Invalid username');


    return resolve({ root: `${__dirname}/../content/${username}` });
    }catch(err){
        console.log(err);
        return reject('Internal server error');
    }
    
});

ftpServer.listen().then(() => { 
    console.log('FTP Server listening on port ' + port);
});