export function initRes(res) {
    const a = res.slice(res.indexOf("rows"), -1); //从开始截取到倒数第二个字符串
    const str = res.substring(res.indexOf("results"), res.indexOf(",rows")); //从某个开始 截取到 某个下标的字符串
    const total = str.substr(str.indexOf(":") + 1); //从某个开始截取到结尾的字符串
    const list = eval(a);

    return { list, total };
  }
 export function invalidProperty(obj) {
    let b = {};
    for (let key in obj) {
      if (obj[key]) {
        b[key] = obj[key];
      }
    }
    return b;
  }
  export function getInfo(res){
    const str = res.slice(res.indexOf("data"), -1);
    const str2 = str.substr(str.indexOf(":") + 1);
    const str3 = str2.slice(1, -1).split(",");
    let arr = str3.map(item => {
      return item.split(":");
    });
    let obj = {};
    arr.map(item => {
      if (item[0] == "KSSJ" || item[0] == "JSSJ") {
        item[1] = `${item[1]}:${item[2]}:${item[3]}`;
      }
      item[1] = item[1].replace(/"/g, "");
      Object.defineProperty(obj, item[0], {
        value: item[1],
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj;
    });
    return obj;
  }
