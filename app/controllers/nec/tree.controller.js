const { Model } = require('cores/Model');
var fs = require('fs')
var path = require('path');
var treeNodes = require('utils/tree');

class TreeController extends Model {
  constructor() {
    super()
    this.fileName= path.join(__dirname, '../../media/nic_tree_input.txt')// Reading textfile to extract input
    this.treeOutput= []
  }

  async controller(req, res, next) {
    //Async function to view in EJS
    return new Promise((resolve, reject) => {
      fs.readFile(this.fileName, 'utf8', (err, data) =>{              
        if (err) throw err;
        let inputData= []
        data.split(/\r?\n/).forEach(line=>{
            inputData.push(JSON.parse(line))
        })
        var tree = new treeNodes.Tree(inputData);
        let finalTree= tree.connect(tree.root);
        tree.arrFlat.forEach(node=>{
          tree.printer(finalTree, node, this.treeOutput)
        });
        resolve(this.treeOutput);
      });      
    })
  }

  async controllerApi(req, res, next) {
    //API to return JSON
    fs.readFile(this.fileName, 'utf8', (err, data) =>{              
      if (err) throw err;
      let inputData= []
      data.split(/\r?\n/).forEach(line=>{
          inputData.push(JSON.parse(line))
      })
      var tree = new treeNodes.Tree(inputData); //Build tree
      let finalTree= tree.connect(tree.root);//Function used to link each node with right siblings
      tree.arrFlat.forEach(node=>{
        tree.printer(finalTree, node, this.treeOutput)
      });
      res.send({ "output": this.treeOutput })      
    });    
  }
}

module.exports = { TreeController }
