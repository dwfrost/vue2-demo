// 给列表加上 _id 和 _pid
export function listAddId(list, props = {}) {
  let uuuid = 1;
  let defaultProps = {
    child: "children"
  };
  props = { ...defaultProps, ...props };

  const { child } = props;
  return (function() {
    const dfs = arr => {
      for (let item of arr) {
        item._id = uuuid++;
        item._pid = arr._pid ? arr._pid : null;
        item.checked = false;
        if (item[child]) {
          item[child]._pid = item._id;
          dfs(item[child]);
        }
      }
      return arr;
    };
    return dfs(list);
  })();
}

// 选中和取消选中 当前节点下的所有节点
export function checkAll(chidlren, isChecked, props = {}) {
  let defaultProps = {
    child: "children",
    checked: "checked"
  };
  props = { ...defaultProps, ...props };

  const { checked, child } = props;
  if (chidlren && chidlren.length) {
    chidlren.forEach(item => {
      item[checked] = isChecked;
      checkAll(item[child], isChecked);
    });
  }
}

/**
 * 当最后一个check时，通知父级同步checked
 * @param {Array} treeData 树形结构
 * @param {Number|String} currentId 当前节点id
 * @param {Number|String} currentPId 当前节点pid
 * @param {Object} props 适配外部属性
 * @param {String} props.child 子列表字段
 * @param {String} props.id id字段
 * @param {String} props.pid pid字段
 * @param {String} props.checked 是否已选择字段
 * @returns {Boolean} shoudCheckAll 为true时表示切换全选类型的checkbox需要同步（因为第一级的parent为null，无法直接修改）
 */
export function checkParent(
  treeData,
  isChecked,
  currentId,
  currentPId,
  props = {}
) {
  let defaultProps = {
    child: "children",
    id: "id",
    pid: "_pid",
    checked: "checked"
  };
  props = { ...defaultProps, ...props };

  let result = false;
  const dfs = (currentId, currentPId) => {
    const { child, id, pid, checked } = props;
    // 1.判断当前层级除了该id，其他兄弟都checked
    // 2.切换父级checkbox
    // 3.递归，直到顶层
    const parent = findNode(treeData, currentPId, props);
    console.log("parent", parent);

    const tempList = parent === null ? treeData : parent[child];
    const isLastOneModified = checkBrother(tempList, currentId, props);
    // console.log("isLastOneModified", isLastOneModified);
    if (!isLastOneModified) return;

    if (parent === null) {
      result = true;
    } else {
      parent[checked] = isChecked;
      //   console.log("parent1", parent, checked, isChecked);

      dfs(parent[id], parent[pid]);
    }
  };

  dfs(currentId, currentPId);
  return result;
}

export function findNode(treeData, nodeId, props) {
  //   console.log("treeData", treeData, nodeId, props);
  const { child = "children", id = "id" } = props;
  const dfs = (treeData, nodeId) => {
    for (let item of treeData) {
      if (item[id] === nodeId) {
        return item;
      }
      if (item[child] && item[child]) {
        dfs(item[child]);
      }
    }
    return null;
  };
  return dfs(treeData, nodeId);
}

// 检查兄弟的check状态，如果兄弟都是checked，需要通知父级
function checkBrother(list, currentId, props) {
  const { id = "id", checked = "checked" } = props;
  if (!list) return false;
  for (let item of list) {
    if (item[id] === currentId) continue;
    if (!item[checked]) return false;
  }
  return true;
}
