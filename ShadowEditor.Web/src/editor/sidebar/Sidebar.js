﻿import UI from '../../ui/UI';
import PropertyPanel from './PropertyPanel';
import AnimationPanel from './AnimationPanel';
import SettingPanel from './SettingPanel';
import HistoryPanel from './HistoryPanel';

/**
 * 侧边栏
 * @author mrdoob / http://mrdoob.com/
 * @author tengge / https://github.com/tengge1
 */
function Sidebar(options) {
    UI.Control.call(this, options);
    this.app = options.app;
};

Sidebar.prototype = Object.create(UI.Control.prototype);
Sidebar.prototype.constructor = Sidebar;

Sidebar.prototype.render = function () {
    var data = {
        xtype: 'div',
        parent: this.parent,
        cls: 'sidebar',
        children: [{
            xtype: 'div',
            cls: 'tabs',
            style: {
                position: 'sticky',
                top: 0,
                zIndex: 10
            },
            children: [{
                xtype: 'text',
                id: 'propertyTab',
                scope: this.id,
                text: '属性',
                onClick: () => {
                    this.selectTab('property');
                }
            }, {
                xtype: 'text',
                id: 'animationTab',
                scope: this.id,
                text: '动画',
                onClick: () => {
                    this.selectTab('animation')
                }
            }, {
                xtype: 'text',
                id: 'settingTab',
                scope: this.id,
                text: '设置',
                onClick: () => {
                    this.selectTab('setting');
                }
            }, {
                xtype: 'text',
                id: 'historyTab',
                scope: this.id,
                text: '历史',
                onClick: () => {
                    this.selectTab('history');
                }
            }]
        }, {
            xtype: 'div',
            id: 'propertyPanel',
            scope: this.id,
            children: [
                new PropertyPanel({ app: this.app })
            ]
        }, {
            xtype: 'div',
            id: 'animationPanel',
            scope: this.id,
            children: [
                new AnimationPanel({ app: this.app })
            ]
        }, {
            xtype: 'div',
            id: 'settingPanel',
            scope: this.id,
            children: [
                new SettingPanel({ app: this.app })
            ]
        }, {
            xtype: 'div',
            id: 'historyPanel',
            scope: this.id,
            children: [
                new HistoryPanel({ app: this.app })
            ]
        }]
    };

    var control = UI.create(data);
    control.render();

    this.app.on(`appStarted.${this.id}`, () => {
        this.selectTab('property');
    });
};

Sidebar.prototype.selectTab = function (tabName) {
    var propertyTab = UI.get('propertyTab', this.id);
    var animationTab = UI.get('animationTab', this.id);
    var settingTab = UI.get('settingTab', this.id);
    var historyTab = UI.get('historyTab', this.id);

    var propertyPanel = UI.get('propertyPanel', this.id);
    var animationPanel = UI.get('animationPanel', this.id);
    var settingPanel = UI.get('settingPanel', this.id);
    var historyPanel = UI.get('historyPanel', this.id);

    propertyTab.dom.className = '';
    animationTab.dom.className = '';
    settingTab.dom.className = '';
    historyTab.dom.className = '';

    propertyPanel.dom.style.display = 'none';
    animationPanel.dom.style.display = 'none';
    settingPanel.dom.style.display = 'none';
    historyPanel.dom.style.display = 'none';

    switch (tabName) {
        case 'property':
            propertyTab.dom.className = 'selected';
            propertyPanel.dom.style.display = '';
            break;
        case 'animation':
            animationTab.dom.className = 'selected';
            animationPanel.dom.style.display = '';
            break;
        case 'setting':
            settingTab.dom.className = 'selected';
            settingPanel.dom.style.display = '';
            break;
        case 'history':
            historyTab.dom.className = 'selected';
            historyPanel.dom.style.display = '';
            break;
    }

    this.app.call('selectTab', this, tabName);
};

export default Sidebar;