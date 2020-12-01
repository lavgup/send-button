const { React, i18n: { Messages } } = require('powercord/webpack');
const { SwitchItem } = require('powercord/components/settings');

class Settings extends React.Component {
    render() {
        const { getSetting, toggleSetting } = this.props;

        return (
            <SwitchItem
                note={Messages.BUTTON_AT_START}
                value={getSetting("buttonAtStart", false)}
                onChange={() => toggleSetting("buttonAtStart")}
            >
                {Messages.BUTTON_AT_START_LIST}
            </SwitchItem>
        )
    }
}

module.exports = Settings;