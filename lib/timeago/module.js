"use strict";

var Label = function () {
    function Label() {
        this.ago = 'ago';
        this.fromNow = 'from now';
        this.second = 'second';
        this.minute = 'minute';
        this.hour = 'hour';
        this.day = 'day';
        this.week = 'week';
        this.month = 'month';
        this.year = 'year';
    }
    return Label;
}();
exports.Label = Label;
var TimeagoModule;
(function (TimeagoModule) {
    var Props = function () {
        function Props() {
            // @desc 需要处理的时间,可以是一个date对象,UTC字符串或者是时间戳
            this.date = '';
            // @desc 是否跟随时间自动变化
            this.live = true;
            // @desc 外层dom标签
            this.component = 'span';
            // @desc 多久以后的时间会失效,失效指的是不再显示友好时间,直接显示 YYYY-MM-DD HH:mm:ss
            this.loseTime = Infinity;
            // @desc 失效时间的格式化类型
            this.loseFormat = 'YYYY-MM-DD HH:mm:ss';
            // @desc 组件在更新前等待的最少秒数
            this.minPeriod = 0;
            // @desc 每隔多久更新一次时间,默认无限大
            this.maxPeriod = Infinity;
            // @desc 启用中文支持
            this.useChinese = false;
            // @desc 定制各类提示语句
            this.label = new Label();
            // @desc 格式化
            this.formatter = function (value, unit, suffix, then) {
                if (value !== 1) {
                    unit += 's';
                }
                return value + ' ' + unit + ' ' + suffix;
            };
        }
        return Props;
    }();
    TimeagoModule.Props = Props;
})(TimeagoModule = exports.TimeagoModule || (exports.TimeagoModule = {}));