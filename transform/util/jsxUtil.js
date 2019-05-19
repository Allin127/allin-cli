module.exports = {
    JSXIdentifier:{
        findName:function(node){
            return node.name;
        }
    }
}

/**
 // // console.log(targetPath.get("property").node.name);
 // // console.log(parentPath.node["children"].length);
 // parentPath.unshiftContainer("children",t.identifier("{"));
                    // parentPath.pushContainer("children",t.identifier("}"));

 */