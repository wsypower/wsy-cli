// TODO alias 不能和指令重复
module.exports = {
  init: {
    action: "init [projectName]",
    alias: "i",
    description: "generate a new project from a template",
    usages: ["wsy init templateName projectName"],
  },
  config: {
    action: "config",
    alias: "cfg",
    description: "config .eosrc",
    usages: [
      "wsy config set <k> <v>",
      "wsy config get <k>",
      "wsy config remove <k>",
    ],
  },
};
