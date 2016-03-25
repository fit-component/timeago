import React from 'react'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import Timeago from 'fit-timeago'

describe('fit-timeago', ()=> {
    it('时间为现在,应当显示 0 seconds ago', ()=> {
        const node = mount(<Timeago date={new Date()}/>)
        expect(node.text()).to.contain('0 seconds ago')
    })

    it('时间为5秒前,应当显示 5 seconds ago', ()=> {
        const time = new Date()
        time.setSeconds(time.getSeconds() - 5)
        const node = mount(<Timeago date={time}/>)
        expect(node.text()).to.contain('5 seconds ago')
    })

    it('时间为1分钟前,应当显示 1 minute ago', ()=> {
        const time = new Date()
        time.setSeconds(time.getSeconds() - 60)
        const node = mount(<Timeago date={time}/>)
        expect(node.text()).to.contain('1 minute ago')
    })

    it('时间为2分钟前,应当显示 2 minutes ago', ()=> {
        const time = new Date()
        time.setSeconds(time.getSeconds() - 120)
        const node = mount(<Timeago date={time}/>)
        expect(node.text()).to.contain('2 minutes ago')
    })

    it('时间为1小时前,应当显示 1 hour ago', ()=> {
        const time = new Date()
        time.setSeconds(time.getSeconds() - 60 * 60)
        const node = mount(<Timeago date={time}/>)
        expect(node.text()).to.contain('1 hour ago')
    })

    it('时间为1天前,应当显示 1 day ago', ()=> {
        const time = new Date()
        time.setSeconds(time.getSeconds() - 60 * 60 * 24)
        const node = mount(<Timeago date={time}/>)
        expect(node.text()).to.contain('1 day ago')
    })

    it('时间为1周前,应当显示 1 week ago', ()=> {
        const time = new Date()
        time.setSeconds(time.getSeconds() - 60 * 60 * 24 * 7)
        const node = mount(<Timeago date={time}/>)
        expect(node.text()).to.contain('1 week ago')
    })

    it('时间为1月前,应当显示 1 month ago', ()=> {
        const time = new Date()
        time.setSeconds(time.getSeconds() - 60 * 60 * 24 * 30)
        const node = mount(<Timeago date={time}/>)
        expect(node.text()).to.contain('1 month ago')
    })

    it('时间为1年前,应当显示 1 year ago', ()=> {
        const time = new Date()
        time.setSeconds(time.getSeconds() - 60 * 60 * 24 * 365)
        const node = mount(<Timeago date={time}/>)
        expect(node.text()).to.contain('1 year ago')
    })

    it('失效时间', ()=> {
        const time = new Date()
        time.setSeconds(time.getSeconds() - 5)
        const node = mount(
            <Timeago date={time}
                     loseTime={1000*5}/>
        )
        expect(node.text()).to.not.contain('5 seconds ago')
    })

    it('销毁测试', ()=> {
        const node = mount(
            <Timeago/>
        )
        node.unmount()
        expect(true).to.equal(true)
    })
})
