// 主的流程控制
module.exports = (action, ...args) => {
  //babel-env
  require(`./command/action/${action}.js`)(...args);
};
