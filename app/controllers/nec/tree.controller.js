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
            this.printer(finalTree, node)
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
          this.printer(finalTree, node)
      });
      res.send({ "output": this.treeOutput })      
    });    
  }

  printer(nodeInstance, node){
    //Function to find right node to print all the node id’s and their corresponding right node id. 
      if (nodeInstance.data==node){
          if(nodeInstance.nextRight==null){
              const msg= `Node ${node} - No right node`
              this.treeOutput.push(msg);
          }
          else if(nodeInstance.nextRight!=null){
              const msg= `Node ${node} - Right node is ${nodeInstance.nextRight.data}`
              this.treeOutput.push(msg);
          }
      }
      else if(nodeInstance.data!=node){
          if(nodeInstance.left!=null){
            this.printer(nodeInstance.left, node)
          }
          if(nodeInstance.middle!=null){
            this.printer(nodeInstance.middle, node)
          }
          if(nodeInstance.right!=null){
            this.printer(nodeInstance.right, node)
          }
      }
  }
}

module.exports = { TreeController }
