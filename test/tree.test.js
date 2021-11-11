var fs = require('fs')
var path = require('path');
var treeNodes = require('../app/utils/tree');


test('Finding Right Node in A Tree of Each node',()=>{
    let fileName= path.join(__dirname, '../app/media/nic_tree_input.txt')// Reading textfile to extract input
    fs.readFile(fileName, 'utf8', (err, data) =>{              
        if (err) throw err;
        let inputData= []
        data.split(/\r?\n/).forEach(line=>{
            inputData.push(JSON.parse(line))
        })
        var tree = new treeNodes.Tree(inputData); //Build tree
        let finalTree= tree.connect(tree.root);//Function used to link each node with right siblings
        let treeOutput=[]
        tree.arrFlat.forEach(node=>{
            tree.printer(finalTree, node,treeOutput)
        });
        expect(treeOutput).toEqual([
            "Node A - No right node",
            "Node Z - Right node is Y",
            "Node Y - Right node is X",
            "Node X - No right node",
            "Node C - Right node is B",
            "Node B - Right node is W",
            "Node W - No right node"
        ])
    });
})