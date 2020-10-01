const { React } = require('powercord/webpack');
const { SwitchItem } = require('powercord/components/settings');

class Settings extends React.Component {
    render() {
        const { getSetting, toggleSetting } = this.props;

        return (
            <SwitchItem
                note="Whether the button should be at the start of the list of buttons"
                value={getSetting("buttonAtStart", false)}
                onChange={() => toggleSetting("buttonAtStart")}
            >
                Button at start of list
            </SwitchItem>
        )
    }
}

module.exports = Settings;