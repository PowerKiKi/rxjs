var RxOld = require("rx");
var RxNew = require("../../../../index");

module.exports = function (suite) {
    
    var source = Array.apply(null, { length:25 }).map(function(item, index){
	   return { key : index % 5 };
    });
    
    var oldGroupByWithImmediateScheduler = RxOld.Observable.fromArray(source, RxOld.Scheduler.immediate).groupBy(group);
    var newGroupByWithImmediateScheduler = RxNew.Observable.fromArray(source).groupBy(group);

    return suite
        .add('old groupBy with immediate scheduler', function () {
            oldGroupByWithImmediateScheduler.subscribe(_next, _error, _complete);
        })
        .add('new groupBy with immediate scheduler', function () {
            newGroupByWithImmediateScheduler.subscribe(_next, _error, _complete);
        });

    function group(x) {
        return x.key;
    }
    
    function _next(x) { }
    function _error(e){ }
    function _complete(){ }
};