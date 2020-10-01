const { Plugin } = require('powercord/entities');
const { findInReactTree } = require('powercord/util');
const { inject, uninject } = require('powercord/injector');
const { getModule, React } = require('powercord/webpack');
const Settings = require('./Settings');

const press = new KeyboardEvent("keydown", { key: 'Enter', code: 'Enter', which: 13, keyCode: 13, bubbles: true });
Object.defineProperties(press, { keyCode: { value: 13 }, which: { value: 13 } });

const Button = require('./components/Button');

class SendButtonPlugin extends Plugin {
    startPlugin() {
        this.registerSettings();
        this.addButton();
    }

    registerSettings() {
        powercord.api.settings.registerSettings('send-button-settings', {
            category: this.entityID,
            label: "Send Button",
            render: Settings,
        });
    }

    addButton() {
        const ChannelTextAreaContainer = getModule(
            m =>
                m.type &&
                m.type.render &&
                m.type.render.displayName === "ChannelTextAreaContainer",
            false
        );

        inject(
            "send-button",
            ChannelTextAreaContainer.type,
            "render",
            (args, res) => {
                const props = findInReactTree(
                    res,
                    r => r && r.className && r.className.indexOf("buttons-") === 0
                );

                const element = React.createElement(
                    "div",
                    {
                        className: ".send-button",
                        onClick: () => this.onClick(),
                    },
                    React.createElement(Button)
                );

                const buttonAtStart = this.settings.get('buttonAtStart', false);

                buttonAtStart ? props.children.unshift(element) : props.children.push(element);

                return res;
            }
        );

        ChannelTextAreaContainer.type.render.displayName = "ChannelTextAreaContainer";
    }

    async onClick() {
        const textAreaWrapper = document.querySelector('.textArea-12jD-V')
        if (!textAreaWrapper) return console.error('textAreaWrapper not found.');

        const textArea = textAreaWrapper.children && textAreaWrapper.children[0];
        if (!textArea) return console.error('textArea not found.');

        textArea.dispatchEvent(press);
    }

    pluginWillUnload() {
        uninject('send-button');
        powercord.api.settings.unregisterSettings('send-button-settings')

        const button = document.querySelector('.send-button');
        if (button) button.remove();
    }
}

module.exports = SendButtonPlugin;