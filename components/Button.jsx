const {
    React,
    getModuleByDisplayName,
    getModule,
    i18n: {
        Messages
    }
} = require('powercord/webpack');

const Tooltip = getModuleByDisplayName('Tooltip', false);
const { Button } = require('powercord/components');
const buttonClasses = getModule(['button'], false);
const buttonWrapperClasses = getModule(['buttonWrapper', 'pulseButton'], false);
const buttonTextAreaClasses = getModule(['button', 'textArea'], false);

module.exports = () => (
    <Tooltip color='black' postion='top' text={Messages.SEND_MESSAGE}>
        {({ onMouseLeave, onMouseEnter }) => (
            <Button
                look={Button.Looks.BLANK}
                size={Button.Sizes.ICON}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <div
                    className={`${buttonClasses.contents} ${buttonWrapperClasses.button} ${buttonTextAreaClasses.button}`}
                >
                    <svg
                        aria-hidden={false}
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        className={
                            buttonWrapperClasses.icon
                        }
                    >
                        <path fill='currentColor' d='M2.01 21L23 12 2.01 3 2 10l15 2-15 2z'/>
                        <path d='M0 0h24v24H0z' fill='none'/>
                    </svg>
                </div>
            </Button>
        )}
    </Tooltip>
);