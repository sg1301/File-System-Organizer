let fs=require("fs");
let path=require("path");
function treefn(dirPath) {
    // let destPath;

    if(dirPath==undefined){
        console.log("KIndly enter the Path");
        return;
    }else{
        let doesExist = fs.existsSync(dirPath);

        if(doesExist){
            treeHelper(dirPath,"");
        }else{
            console.log("KIndly enter the Correct Path");
            return;
        }
    }
}


function treeHelper(dirPath,indent)
{
    let isFile = fs.lstatSync(dirPath).isFile();
    if(isFile == true){
        let filename = path.basename(dirPath);
        console.log(indent + "├──"+ filename);
    }else{
        let dirName = path.basename(dirPath);
        console.log(indent + "└──"+ dirName);
        let childrens = fs.readdirSync(dirPath);
        for(let i=0;i<childrens.length;i++)
        {
            let childPath = path.join(dirPath,childrens[i]);
            treeHelper(childPath,indent + "\t");
        }
    }
}
module.exports={
    treeKey: treefn
}