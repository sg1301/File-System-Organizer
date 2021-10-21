let fs=require("fs");
let path=require("path");
function organizefn(dirPath){
    // 1. Input directory path given

    let destPath;

    if(dirPath==undefined){
        destPath = process.cwd();
        return;
    }else{
        let doesExist = fs.existsSync(dirPath);

        if(doesExist){
            //2. Create -> organised_files -> directory

            destPath=path.join(dirPath,"organized_files");
            if(fs.existsSync(destPath)==false){
            fs.mkdirSync(destPath);
            }
        }else{
            console.log("KIndly enter the Correct Path");
            return;
        }
    }

    organizeHelper(dirPath,destPath);

    // 3. Identify categories of all the files present in that input directory
    // 4. copy / cut files to that organized directory inside of any category folder
}


function organizeHelper(src,dest){
        // 3. Identify categories of all the files present in that input directory

        let childNames = fs.readdirSync(src);
        console.log(childNames);

        for(let i=0;i<childNames.length;i++)
        {
            let childAddress = path.join(src,childNames[i]);
            let isFile = fs.lstatSync(childAddress).isFile();
            if(isFile){
                // console.log(childNames[i]);

                let category = getCategory(childNames[i]);
                console.log(childNames[i],"belongs to --> ",category);


                sendFiles(childAddress,dest,category);
            }
        }
}


function sendFiles(srcFilePath,dest,category)
{
    let categorypath = path.join(dest,category);
    if(fs.existsSync(categorypath)==false){
        fs.mkdirSync(categorypath);
    }
    let filename = path.basename(srcFilePath);
    let destFilePath = path.join(categorypath, filename);
    fs.copyFileSync(srcFilePath,destFilePath);
    fs.unlinkSync(srcFilePath);
    console.log(filename,"copied to ",category);
}

function getCategory(name){
    let ext = path.extname(name);
    ext = ext.slice(1);
    for(let type in types){
        let cTypeArray = types[type];
        for(let i=0;i<cTypeArray.length;i++)
        {
            if(ext==cTypeArray[i]){
                return type;
            }
        }
    }

    return "others";
}
module.exports={
    organizeKey: organizefn
}