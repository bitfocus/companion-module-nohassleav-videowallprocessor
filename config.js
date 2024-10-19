import { Regex } from '@companion-module/base'

export const ConfigFields = [
	{
		type: 'textinput',
		id: 'host',
		label: 'IP Address',
		tooltip: 'Enter the IP adress of the HDMI matrix and make sure it is reachable from your network.',
		width: 8,
		regex: Regex.IP,
	},
	{
		type: 'number',
		id: 'port',
		label: 'Telnet Port',
		default: 23,
		width: 4,
		tooltip:
			"The default port is 23 - if you don't have any complex network setups, you don't need to change this port. ",
		regex: Regex.PORT,
	},
	{
		type: 'checkbox',
		id: 'autoReconnect',
		label: 'Auto Reconnect',
		default: true,
	},
]
