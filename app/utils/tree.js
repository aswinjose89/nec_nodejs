class Node
{
	constructor(item)
	{
		this.data = item;
		this.left = this.middle= this.right = this.nextRight = null;
	}
}
class Tree{
    constructor(inputData)
      {
          /*
          DESC: nodeBuilder used to build a tree format
          For Ex:
            this.root = new Node('A');
            this.root.left = new Node('Z');
            this.root.middle = new Node('Y');
            this.root.right = new Node('X');
            this.root.left.left = new Node('C');
            this.root.left.right = new Node('B');
            this.root.right.left = new Node('W');
          */
          this.arrFlat= null
          this.root= this.nodeBuilder(inputData)  
      }
      buildLeafHierarchy(inputData){
          //Generate layer level root node to manage hierrachy
          let input= inputData;
          let leafHierarchy={}
          let arrFlat=[...new Set(input.flat().flat())].filter(n=>n)
          this.arrFlat= arrFlat
          arrFlat.forEach(flat=>{
              input.forEach((val1, idx1)=>{
                  val1.forEach((val2, idx2)=>{
                      if(val2.includes(flat)){
                          if(leafHierarchy[val2[0]]==undefined) {
                              leafHierarchy[val2[0]]=[]
                              if(val2[1] && !leafHierarchy[val2[0]].includes(val2[1])){
                                  leafHierarchy[val2[0]].push(val2[1])
                              }
                          }
                          else{
                              if(!leafHierarchy[val2[0]].includes(val2[1])){
                                  leafHierarchy[val2[0]].push(val2[1])
                              }
                          }
                      }
                  })
              })
          })
          delete leafHierarchy.null
          return leafHierarchy
      }
      nodeBuilder(inputData){
          //Build Node tree based on hierrachy
          let leafHierarchy= this.buildLeafHierarchy(inputData)
          let finalNode=[], treeBuilder;
          for(var val in leafHierarchy){
              let leafNodes=leafHierarchy[val]
              let previousLayer;
              if(finalNode.length>0){
                  previousLayer= finalNode.shift()
                  for (var val1 in previousLayer){
                      if(["left","right", "middle"].includes(val1)){
                          let leafNode= previousLayer[val1]
                          if(leafNode && leafNode.data==val){
                              previousLayer[val1]= this.leafBinder(previousLayer[val1][val1], leafNodes, val)
                              treeBuilder=previousLayer
                          }
                      }
                  }
              }
              treeBuilder=this.leafBinder(treeBuilder, leafNodes, val)
              finalNode.push(treeBuilder)
              treeBuilder=null
          }
          return finalNode.shift()
      }
      leafBinder(element, leafNodes, val){
          if(element==null){
              element=new Node(val)
          }
          leafNodes.forEach((value)=>{
              if(element.left==null){
                  element.left=new Node(value)
              }
              else if(element.middle==null && leafNodes.length>2){
                  element.middle=new Node(value)
              }
              else if(element.right==null){
                  element.right=new Node(value)
              }
          })
          return element
      }
      connect(root)
      {
          //Function used to link each node with right siblings
          if (root == null)
              return;
          let tempArr = [];
          tempArr.push(root);
          let temp = null;
          while (tempArr.length!=0) {
              let n = tempArr.length;
              for (let i = 0; i < n; i++) {
                  let prev = temp;
                  temp = tempArr.shift();
                  if (i > 0)
                      prev.nextRight = temp;
  
                  if (temp.left != null)
                      tempArr.push(temp.left);
                  
                  if (temp.middle != null)
                      tempArr.push(temp.middle);
  
                  if (temp.right != null)
                      tempArr.push(temp.right);
              }
              temp.nextRight = null;
          }
          return root
      }	
  }

module.exports = { Tree }