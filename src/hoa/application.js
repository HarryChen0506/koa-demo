

// (function(module,exports){
//     module.exports = 123;   //可以修改module对象下的exports属性
// 　　　　 exports = 123;　　　　　　//修改的是当前函数环境里的exports变量,而非module.exports
// 　　　　 exports.foo = 123       //可以修改module.exports下的foo属性

// })(module,module.exports);

var a = {name: '123'};
(function(foo){
    // foo = 456
    foo.b = '123'
})(a)
console.log('a', a)