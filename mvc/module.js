/**MVC的基础是观察者模式，这是实现model和view同步的关键
**/

// Model 对外提供 set 方法, 
function Model(value) {
  this._value = typeof value === 'undefined' ? '' : value;
  this._listeners = []; //回调函数队列
}

Model.prototype.watch = function (listener) {
  // 注册监听的回调函数
  this._listeners.push(listener);
};

Model.prototype.set = function (value) {
  var self = this;
  self._value = value;
  // model中的值改变时，应通知注册过的回调函数
  // 按照Javascript事件处理的一般机制，我们异步地调用回调函数
  // 如果觉得setTimeout影响性能，也可以采用requestAnimationFrame
  setTimeout(function () {
    self._listeners.forEach(function (listener) {
      listener.call(self, value);
      console.log('listener:::',listener);
    });
  });
};

Model.prototype.bind = function (node) {
    // 将watch的逻辑和通用的回调函数放到这里
    this.watch(function (value) {
        node.innerHTML = value;
    });
};

//controller中只负责更新model的逻辑，和view完全解耦
function eleController(callback) { 
    var models = {};
    // 找到所有有bind属性的元素
    var views = document.querySelectorAll('[ele-model]');
    // 将views处理为普通数组
    views = Array.prototype.slice.call(views, 0);
    views.forEach(function (view) {
        var modelName = view.getAttribute('ele-model');
        // 取出或新建该元素所绑定的model
        models[modelName] = models[modelName] || new Model();
        // 完成该元素和指定model的绑定
        models[modelName].bind(view);
    });
    // 调用controller的具体逻辑，将models传入，方便业务处理
    callback.call(this, models);
}