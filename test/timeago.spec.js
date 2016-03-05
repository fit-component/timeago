//import React from 'react'
//import {render,unmountComponentAtNode} from 'react-dom'
//import ReactTestUtils from 'react-addons-test-utils'
//import Timeago from 'fit-timeago'
//
//describe('Common Timeago : ', function () {
//    it('Basic', function () {
//        var state = 1;
//        function handleChange(page) {
//            this.setState({
//                page: page
//            })
//        }
//        var container = document.createElement('div');
//        render(
//            <div>
//                <Pagination onChange={this.handleChange}
//                            next={true}/>
//                {this.state}
//            </div>, container);
//        var x = container.getElementsByTagName("span");
//        var classname = x[0].getAttribute("class");
//        expect(classname).toEqual("before disabled");
//
//        var before = container.innerHTML.toString().indexOf("上一页");
//        var next = container.innerHTML.toString().indexOf("下一页");
//        expect(before).not.toBe(-1);
//        expect(next).not.toBe(-1);
//    })
//})